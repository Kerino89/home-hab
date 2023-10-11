import ky from "ky";
import { afterResponseAuth, beforeRequestAuth, beforeRetryAuth } from "./ky.hooks";

/**
 * Экземпляр Fetch для основного backend.
 */
export const fetchMain = ky.create({
  prefixUrl: process.env.MAIN_API_URL,
  throwHttpErrors: true,
  hooks: {
    beforeRequest: [beforeRequestAuth],
    beforeRetry: [beforeRetryAuth],
    afterResponse: [afterResponseAuth],
  },
});
