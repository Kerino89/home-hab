import * as bcrypt from "bcryptjs";
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService, User } from "@server/modules/users";
import { TokenService } from "./token.service";
import { LoginUserDto } from "../dto/login-user.dto";
import { RegistrationUserDto } from "../dto/registration-user.dto";
import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { AuthModel } from "../models/authentication.model";
import { SessionModel } from "../models/session.model";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _tokenService: TokenService,
  ) {}

  public async authenticate({
    ip,
    userAgent,
    ...restUserDto
  }: LoginUserDto & Pick<SessionModel, "ip" | "userAgent">): Promise<AuthModel> {
    const user = await this.validateUser(restUserDto);

    return this.createTokens({ ...user, ip, userAgent, fingerprint: restUserDto.fingerprint });
  }

  public async registration({
    ip,
    userAgent,
    ...restUserDto
  }: RegistrationUserDto & Pick<SessionModel, "ip" | "userAgent">): Promise<AuthModel> {
    if (await this._usersService.findOneByEmail(restUserDto.email)) {
      throw new HttpException("A user with this email exists", HttpStatus.CONFLICT);
    }

    const hashPassword = await bcrypt.hash(restUserDto.password, 10);
    const user = await this._usersService.create({ ...restUserDto, password: hashPassword });

    return this.createTokens({ ...user, ip, userAgent, fingerprint: restUserDto.fingerprint });
  }

  public async refresh({
    ip,
    userAgent,
    fingerprint,
    refreshToken,
  }: RefreshTokenDto &
    Pick<SessionModel, "ip" | "userAgent"> & { refreshToken: string }): Promise<AuthModel> {
    const oldSession = await this.validateRefreshToken({ fingerprint, token: refreshToken });
    const user = await this._usersService.findOne(oldSession.userId);

    if (user && oldSession && (await this._tokenService.removeSession(oldSession.token))) {
      return this.createTokens({ ...user, ip, userAgent, fingerprint });
    }

    throw new UnauthorizedException();
  }

  private async validateUser(userDto: LoginUserDto): Promise<User> {
    const user = await this._usersService.findOneByEmail(userDto.email);

    if (user && (await bcrypt.compare(userDto.password, user.password))) {
      return user;
    }

    throw new UnauthorizedException();
  }

  public async validateRefreshToken({
    token,
    fingerprint = "",
  }: Pick<SessionModel, "token" | "fingerprint">): Promise<SessionModel> {
    const session = await this._tokenService.getSessionByToken(token);

    if (session?.fingerprint === fingerprint) {
      return session;
    }

    throw new UnauthorizedException();
  }

  private async createTokens({
    ip,
    userAgent,
    fingerprint,
    ...restUser
  }: User & Pick<SessionModel, "ip" | "fingerprint" | "userAgent">): Promise<AuthModel> {
    const [session, accessToken] = await Promise.all([
      this._tokenService.createSessionToken(restUser, { fingerprint, ip, userAgent }),
      this._tokenService.generateAccessToken(restUser),
    ]);

    return new AuthModel({ accessToken, session });
  }
}
