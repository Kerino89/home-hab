import { Body, Controller, Ip, Post, Res, Req, HttpCode, HttpStatus } from "@nestjs/common";
import { Cookies } from "@server/decorators/cookies.decorator";
import { AuthenticationService } from "./services/authentication.service";
import { TokenService } from "./services/token.service";
import { RegistrationUserDto } from "./dto/registration-user.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthModel } from "./models/authentication.model";

import { Cookie } from "./authentication.const";

import type { Response, Request } from "express";

@Controller("api/auth")
export class AuthenticationController {
  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _tokenService: TokenService,
  ) {}

  @Post("registration")
  @HttpCode(HttpStatus.CREATED)
  public async registration(
    @Body() userDto: RegistrationUserDto,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
    @Ip() ip: string,
  ): Promise<Pick<AuthModel, "accessToken">> {
    const userAgent = request.get("User-Agent") || "";
    const dataRegistration = { ...userDto, ip, userAgent };
    const { accessToken, session } = await this._authService.registration(dataRegistration);

    response.cookie(Cookie.Refresh, session.token, {
      secure: true,
      httpOnly: true,
      expires: session.expiresIn,
    });

    return { accessToken };
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  public async authenticate(
    @Body() userDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
    @Ip() ip: string,
  ): Promise<Pick<AuthModel, "accessToken">> {
    const userAgent = request.get("User-Agent") || "";
    const dataAuthenticate = { ...userDto, ip, userAgent };
    const { accessToken, session } = await this._authService.authenticate(dataAuthenticate);

    response.cookie(Cookie.Refresh, session.token, {
      secure: true,
      httpOnly: true,
      expires: session.expiresIn,
    });

    return { accessToken };
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  public async logout(@Cookies(Cookie.Refresh) refreshToken: string) {
    this._tokenService.removeSession(refreshToken);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  public async refresh(
    @Body() refreshDto: RefreshTokenDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Cookies(Cookie.Refresh) refreshToken: string,
    @Ip() ip: string,
  ): Promise<Pick<AuthModel, "accessToken">> {
    const userAgent = request.get("User-Agent") || "";
    const dataRefresh = { ...refreshDto, refreshToken, userAgent, ip };

    const { accessToken, session } = await this._authService.refresh(dataRefresh);

    response.cookie(Cookie.Refresh, session.token, {
      secure: true,
      httpOnly: true,
      expires: session.expiresIn,
    });

    return { accessToken };
  }
}
