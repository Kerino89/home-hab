import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "@server/modules/users";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "@server/constants/metadata-key";
import type { CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _jwtService: JwtService,
    private readonly _usersService: UsersService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this._jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      request["user"] = await this._usersService.findOne(payload.id);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = new Headers(request.headers).get("authorization")?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }
}
