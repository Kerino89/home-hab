export interface AuthState {
  isForbidden: boolean;
  isAuthorized: boolean;
}

export interface AuthJWT {
  accessToken: string;
  tokenType?: string;
}

export interface AuthContextValue extends AuthState {
  getAuth: HandlerGetAuth;
}

export type HandlerGetAuth = () => AuthJWT | null;

export interface AuthProviderProps extends React.PropsWithChildren {
  defaultAuth?: AuthJWT | null;
}
