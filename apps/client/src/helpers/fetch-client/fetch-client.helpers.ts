import ky from "ky";
import { AuthControl, refresh as refreshQuery } from "@client/services/auth";
import type { Options } from "ky";

export class RefreshSubscribers {
  private _isRefreshing = false;
  private readonly _queryHandlers = new Map<Request, Function>();

  constructor(private readonly _authControl: AuthControl) {}

  public get isRefreshing() {
    return this._isRefreshing;
  }

  public add(request: Request, options: Options) {
    this._queryHandlers.forEach((_, { url }) => {
      if (url !== request.url) {
        this._queryHandlers.set(request, () => {
          Promise.resolve(ky(request, options));
        });
      }
    });
  }

  public async refresh() {
    if (!this._isRefreshing) {
      this._isRefreshing = true;

      try {
        const auth = await refreshQuery();

        this._isRefreshing = false;
        this._authControl.setAuth(auth);
        this._queryHandlers.forEach((handler) => handler());
        this._queryHandlers.clear();
      } catch (_) {
        this._queryHandlers.clear();
        this._authControl.setAuth(null);
      }
    }
  }
}
