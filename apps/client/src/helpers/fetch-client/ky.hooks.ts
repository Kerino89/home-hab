import { authControl } from "@client/services/auth";
import type { AfterResponseHook, BeforeRequestHook, BeforeRetryHook } from "ky";

export const afterResponseAuth: AfterResponseHook = (request, options, response) => {
  if (response.status === 401) {
    authControl.setAuth(null);
  }
};

export const beforeRequestAuth: BeforeRequestHook = (request) => {
  const { auth } = authControl;

  if (auth) {
    request.headers.set("Authorization", `${auth.tokenType} ${auth.accessToken}`);
  }
};

export const beforeRetryAuth: BeforeRetryHook = ({ request }) => {
  const { auth } = authControl;

  if (auth) {
    request.headers.set("Authorization", `${auth.tokenType} ${auth.accessToken}`);
  }
};
