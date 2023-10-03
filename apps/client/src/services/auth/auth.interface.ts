export interface AuthState {
  isForbidden: boolean;
  isAuthorized: boolean;
}

export type AuthContextValue = AuthState;

export interface AuthProviderProps extends React.PropsWithChildren {
  defaultAuthorized?: boolean;
}
