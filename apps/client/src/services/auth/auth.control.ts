import { EventEmitter } from "@client/libs/event-emitter";

export class AuthControl {
  public static readonly EVENT_TYPE_UPDATE_AUTH = "update::auth";
  public static readonly EVENT_TYPE_UPDATE_FORBIDDEN = "update::forbidden";

  private _eventEmitter = new EventEmitter();
  private _auth: boolean = true;
  private _forbidden: boolean = false;

  public setAuth(auth: boolean): void {
    this._auth = auth;
    this._forbidden = false;

    this._eventEmitter.emit(AuthControl.EVENT_TYPE_UPDATE_AUTH, this.isAuth);
  }

  public setForbidden(forbidden: boolean): void {
    if (this.isAuth) this._forbidden = forbidden;
    else this._forbidden = false;

    this._eventEmitter.emit(AuthControl.EVENT_TYPE_UPDATE_FORBIDDEN, this._forbidden);
  }

  public get isForbidden(): boolean {
    return this._forbidden;
  }

  public get isAuth(): boolean {
    return this._auth;
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
