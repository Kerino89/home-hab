"use client";

import * as React from "react";
import { useEffectOnce } from "react-use";
import { DEFAULT_STATE } from "./auth.const";
import { AuthContext } from "./auth.context";
import { authControl, AuthControl } from "./auth.control";

import type { AuthProviderProps } from "./auth.interface";

export const AuthProvider = ({ children, defaultAuthorized = false }: AuthProviderProps) => {
  const [state, setState] = React.useState({ ...DEFAULT_STATE, isAuthorized: defaultAuthorized });

  const setAuth = React.useCallback((isAuthorized: boolean) => {
    setState((oldState) => ({ ...oldState, isAuthorized }));
  }, []);

  const setForbidden = React.useCallback((isForbidden: boolean) => {
    setState((oldState) => ({ ...oldState, isForbidden }));
  }, []);

  React.useEffect(() => {
    authControl.on(AuthControl.EVENT_TYPE_UPDATE_AUTH, setAuth);
    authControl.on(AuthControl.EVENT_TYPE_UPDATE_FORBIDDEN, setForbidden);

    return () => {
      authControl.off(AuthControl.EVENT_TYPE_UPDATE_AUTH, setAuth);
      authControl.off(AuthControl.EVENT_TYPE_UPDATE_FORBIDDEN, setForbidden);
    };
  }, [setAuth, setForbidden]);

  useEffectOnce(() => {
    authControl.setAuth(defaultAuthorized);
  });

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
