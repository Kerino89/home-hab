"use client";

import { useQuery } from "@tanstack/react-query";
import { trpc, RouterInput } from "@client/helpers/trpc";

export const useReadDir = (path: RouterInput["readDir"]["path"] = "") => {
  return useQuery(["read-dir", path], ({ signal }) => trpc.readDir.query({ path }, { signal }));
};
