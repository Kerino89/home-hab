import { authControl } from "@client/services/auth";
import { RefreshSubscribers } from "./fetch-client.helpers";
import type { AfterResponseHook, BeforeRequestHook, BeforeRetryHook } from "ky";

const refreshSubscribers = new RefreshSubscribers(authControl);

export const afterResponseAuth: AfterResponseHook = async (request, options, response) => {
  if (response.status === 403) {
    authControl.setForbidden(true);

    return response;
  }

  if (response.ok || response.status !== 401) return response;

  refreshSubscribers.refresh();
  refreshSubscribers.add(request, options);
};

export const beforeRequestAuth: BeforeRequestHook = async (request) => {
  if (!authControl.isValidAccessToken) await refreshSubscribers.refresh();

  if (authControl.isAuth) {
    request.headers.set("Authorization", authControl.getAuthCookie());
  }
};

export const beforeRetryAuth: BeforeRetryHook = ({ request }) => {
  if (authControl.isAuth) {
    request.headers.set("Authorization", authControl.getAuthCookie());
  }
};
