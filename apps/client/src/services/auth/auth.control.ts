import jwtDecode from "jwt-decode";
import { isNull } from "lodash";
import { EventEmitter } from "@client/libs/event-emitter";
import type { AuthJWT } from "./auth.interface";

export class AuthControl {
  public static readonly EVENT_TYPE_UPDATE_AUTH = "update::auth";
  public static readonly EVENT_TYPE_UPDATE_FORBIDDEN = "update::forbidden";

  private _eventEmitter = new EventEmitter();
  private _auth: AuthJWT | null = null;
  private _forbidden: boolean = false;

  public setAuth(auth: AuthJWT | null): void {
    this._auth = auth && { tokenType: "Bearer", ...auth };
    this._forbidden = false;

    this._eventEmitter.emit(AuthControl.EVENT_TYPE_UPDATE_AUTH, this.isAuth);
  }

  public setForbidden(forbidden: boolean): void {
    if (this.isAuth) this._forbidden = forbidden;
    else this._forbidden = false;

    this._eventEmitter.emit(AuthControl.EVENT_TYPE_UPDATE_FORBIDDEN, this._forbidden);
  }

  public getAuthCookie(): string {
    if (!this._auth) return "";

    return `${this._auth.tokenType} ${this._auth.accessToken}`;
  }

  public get isAuth(): boolean {
    return !isNull(this._auth);
  }

  public get auth(): AuthJWT | null {
    return this._auth;
  }

  public get isValidAccessToken(): boolean {
    if (!this._auth?.accessToken) return false;

    try {
      const { exp } = jwtDecode<{ exp: number }>(this._auth.accessToken);

      return Date.now() >= exp * 1000;
    } catch (error) {
      return false;
    }
  }

  public on(
    event: typeof AuthControl.EVENT_TYPE_UPDATE_AUTH | typeof AuthControl.EVENT_TYPE_UPDATE_FORBIDDEN,
    handler: (value: boolean) => void,
  ) {
    this._eventEmitter.on(event, handler);
  }

  public off(
    event: typeof AuthControl.EVENT_TYPE_UPDATE_AUTH | typeof AuthControl.EVENT_TYPE_UPDATE_FORBIDDEN,
    handler: (value: boolean) => void,
  ) {
    this._eventEmitter.on(event, handler);
  }
}

export const authControl = new AuthControl();
