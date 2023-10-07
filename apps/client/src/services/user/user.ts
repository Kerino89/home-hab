import { fetchMain } from "@client/helpers/fetch-client";
import type { Options as KyOptions } from "ky";

export const profile = async (options?: KyOptions) => {
  const response = fetchMain.get("api/auth/profile", options);

  return response.json();
};
