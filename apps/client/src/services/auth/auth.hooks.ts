"use client";

import { useCallback, useContext } from "react";
import { AuthContext } from "./auth.context";
import { useMutation } from "@tanstack/react-query";
import { authControl } from "./auth.control";
import { login as loginRequest, logout as logoutRequest } from "./auth";

import type { LoginRequest } from "./auth.interface";

export const useAuth = () => {
  const state = useContext(AuthContext);

  const { isLoading, mutateAsync } = useMutation(loginRequest, {
    onSuccess(data) {
      authControl.setAuth(data);
    },
  });

  const logout = useCallback(async () => {
    const isLogout = await logoutRequest();

    if (isLogout) authControl.setAuth(null);
  }, []);

  const clearForbidden = useCallback(() => authControl.setForbidden(false), []);

  const login = useCallback((body: LoginRequest) => mutateAsync(body), [mutateAsync]);

  return { ...state, isLoading, login, logout, clearForbidden };
};
