import { fetchMain } from "@client/helpers/fetch-client";
import { Options as KyOptions } from "ky";
import type { DirAndFileStatResponse } from "./directory.interface";

export const readDir = async (path: string, options?: KyOptions): Promise<Array<DirAndFileStatResponse>> => {
  const response = fetchMain.post("api/directory/read", { json: { path }, ...options });

  return response.json();
};
