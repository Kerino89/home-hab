import ky from "ky";
import { AuthJWT, LoginRequest } from "./auth.interface";

export const login = async (body: LoginRequest): Promise<AuthJWT> => {
  const response = await ky.post("/api/auth/login", { json: body });

  return response.json();
};

export const logout = async () => {
  const { status } = await ky.post("/api/auth/logout");

  return status === 200;
};
