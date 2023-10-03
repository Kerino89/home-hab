import type { AuthState } from "./auth.interface";

export const DEFAULT_STATE = Object.freeze<AuthState>({
  isAuthorized: false,
  isForbidden: false,
});
