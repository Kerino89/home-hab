"use client";

import { useQuery } from "@tanstack/react-query";
import { readDir } from "./directory";
// import { trpc, RouterInput } from "@client/helpers/trpc";

// export const useReadDir = (path: RouterInput["readDir"]["path"] = "") => {
//   return useQuery(["read-dir", path], ({ signal }) => trpc.readDir.query({ path }, { signal }));
// };

export const useReadDir = (path: string = "") => {
  return useQuery(["read-dir", path], ({ signal }) => readDir(path, { signal }));
};
