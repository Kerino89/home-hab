import { fetchMain } from "@client/helpers/fetch-client";
import type { Options as KyOptions } from "ky";
import type { UserResponse } from "./user.interface";

export const profile = async (options?: KyOptions): Promise<UserResponse> => {
  const response = fetchMain.get("api/auth/profile", options);

  return response.json();
};
