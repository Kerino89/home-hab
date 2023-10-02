import ms from "ms";
import { isNull } from "lodash";
import { JwtService } from "@nestjs/jwt";
import { InjectRedis } from "@liaoliaots/nestjs-redis";
import { Injectable } from "@nestjs/common";
import { User } from "@server/modules/users";
import { SessionModel } from "../models/session.model";

import type { Redis } from "ioredis";

const { JWT_REFRESH_TOKEN_LIFETIME = "30d" } = process.env;

@Injectable()
export class TokenService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly _jwtService: JwtService,
  ) {}

  public async generateAccessToken(user: User): Promise<string> {
    const { email, id, roles = [] } = user;
    const payload = { email, id, roles: roles.map(({ value }) => value) };

    return this._jwtService.sign(payload);
  }

  public async createSessionToken(
    user: User,
    props: Pick<SessionModel, "userAgent" | "ip" | "fingerprint">,
  ): Promise<SessionModel> {
    const { JWT_MAX_SESSIONS = "5" } = process.env;

    const session = new SessionModel({
      userId: user.id,
      createdAt: new Date(),
      ...props,
    });

    session.expiresIn = new Date(session.createdAt.getTime() + ms(JWT_REFRESH_TOKEN_LIFETIME));

    const userSessions = await this.getUserSessionAll(user.id);

    if (userSessions.length >= parseInt(JWT_MAX_SESSIONS, 10)) {
      const [session] = userSessions.sort((a, b) => a.expiresIn.getTime() - b.expiresIn.getTime());

      this.redis.del(this.generateKey(user.id, session.token));
    }

    this.setSession(user.id, session);

    return session;
  }

  public async getSessionByToken(token: string): Promise<SessionModel | null> {
    const key = await this.getSessionKeyByToken(token);

    if (!key) return null;

    const { createdAt, expiresIn, ...restSession } = await this.redis.hgetall(key);

    const session = new SessionModel({
      ...restSession,
      createdAt: new Date(createdAt),
      expiresIn: new Date(expiresIn),
    });

    return session;
  }

  public async validateRefreshToken({
    token,
    fingerprint,
  }: Pick<SessionModel, "token" | "fingerprint">): Promise<boolean> {
    const session = await this.getSessionByToken(token);

    return session?.fingerprint === fingerprint;
  }

  public async removeSession(token: string): Promise<boolean> {
    const key = await this.getSessionKeyByToken(token);

    return !isNull(key) && Boolean(await this.redis.del(key));
  }

  private async getUserSessionAll(userId: string): Promise<Array<SessionModel>> {
    const keys = await this.getSessionKeysByUser(userId);
    const sessions = [];

    for await (const session of keys.map((key) => this.redis.hgetall(key))) {
      const { createdAt, expiresIn, ...restSession } = session;

      sessions.push(
        new SessionModel({
          ...restSession,
          createdAt: new Date(createdAt),
          expiresIn: new Date(expiresIn),
        }),
      );
    }

    return sessions;
  }

  private async setSession(userId: string, session: SessionModel) {
    const key = this.generateKey(userId, session.token);

    this.redis
      .multi()
      .hset(key, new Map(Object.entries(session)))
      .pexpire(key, ms(JWT_REFRESH_TOKEN_LIFETIME))
      .exec();
  }

  private async getSessionKeyByToken(token: string): Promise<string | null> {
    const [, keys] = await this.redis.scan(0, "MATCH", this.generateKey("*", token));

    return keys[0] || null;
  }

  private async getSessionKeysByUser(userId: string): Promise<Array<string>> {
    const [, keys] = await this.redis.scan(0, "MATCH", this.generateKey(userId, "*"));

    return keys;
  }

  private generateKey(userId: string, token: string): string {
    return `session:${userId}:${token}`;
  }
}
