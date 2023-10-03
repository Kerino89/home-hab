"use client";

import * as React from "react";
import { isNull } from "lodash";
import { useEffectOnce } from "react-use";
import { DEFAULT_STATE } from "./auth.const";
import { AuthContext } from "./auth.context";
import { authControl, AuthControl } from "./auth.control";

import type { AuthProviderProps, HandlerGetAuth } from "./auth.interface";

export const AuthProvider = ({ children, defaultAuth = null }: AuthProviderProps) => {
  const [state, setState] = React.useState({ ...DEFAULT_STATE, isAuthorized: !isNull(defaultAuth) });

  const setAuth = React.useCallback((isAuthorized: boolean) => {
    setState((oldState) => ({ ...oldState, isAuthorized }));
  }, []);

  const setForbidden = React.useCallback((isForbidden: boolean) => {
    setState((oldState) => ({ ...oldState, isForbidden }));
  }, []);

  const getAuth = React.useCallback<HandlerGetAuth>(() => authControl.auth, []);

  React.useEffect(() => {
    const eventsMap = new Map<Parameters<typeof authControl.on>[0], Parameters<typeof authControl.on>[1]>([
      [AuthControl.EVENT_TYPE_UPDATE_AUTH, setAuth],
      [AuthControl.EVENT_TYPE_UPDATE_FORBIDDEN, setForbidden],
    ]);

    eventsMap.forEach((handler, event) => authControl.on(event, handler));
    return () => {
      eventsMap.forEach((handler, event) => authControl.off(event, handler));
    };
  }, [setAuth, setForbidden]);

  useEffectOnce(() => {
    authControl.setAuth(defaultAuth);
  });

  return <AuthContext.Provider value={{ ...state, getAuth }}>{children}</AuthContext.Provider>;
};
