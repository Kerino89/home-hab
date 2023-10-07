import { authControl } from "@client/services/auth";
import type { AfterResponseHook, BeforeRequestHook, BeforeRetryHook } from "ky";

export const afterResponseAuth: AfterResponseHook = (request, options, response) => {
  if (response.status === 401) {
    authControl.setAuth(null);
  }
};

export const beforeRequestAuth: BeforeRequestHook = (request) => {
  const { isAuth } = authControl;

  if (isAuth) {
    request.headers.set("Authorization", authControl.getAuthCookie());
  }
};

export const beforeRetryAuth: BeforeRetryHook = ({ request }) => {
  const { isAuth } = authControl;

  if (isAuth) {
    request.headers.set("Authorization", authControl.getAuthCookie());
  }
};
