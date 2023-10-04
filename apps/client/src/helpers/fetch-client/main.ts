import ky from "ky";
import { authControl } from "@client/services/auth";

/**
 * Экземпляр Fetch для основного backend.
 */
export const fetchMain = ky.create({
  prefixUrl: process.env.MAIN_API_URL || "http://localhost:5000",
  throwHttpErrors: true,
  hooks: {
    beforeRequest: [
      async (request) => {
        const { auth } = authControl;

        if (auth) {
          request.headers.set("Authorization", `${auth.tokenType} ${auth.accessToken}`);
        }
      },
    ],
    beforeRetry: [
      async ({ request }) => {
        const { auth } = authControl;

        if (auth) {
          request.headers.set("Authorization", `${auth.tokenType} ${auth.accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          authControl.setAuth(null);
        }
      },
    ],
  },
});
