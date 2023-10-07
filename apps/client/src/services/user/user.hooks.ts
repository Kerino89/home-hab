import { useQuery } from "@tanstack/react-query";
import { profile } from "./user";

export const useProfile = () => {
  return useQuery(["profile"], ({ signal }) => profile({ signal }));
};
