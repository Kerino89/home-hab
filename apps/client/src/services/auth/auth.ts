import ky from "ky";
import { AuthJWT, LoginRequest } from "./auth.interface";

export const login = async (body: LoginRequest): Promise<AuthJWT> => {
  const response = await ky.post("http://localhost:5000/api/auth/login", { json: body });

  return response.json();
};

export const logout = async () => {
  const { status } = await ky.post("http://localhost:5000/api/auth/logout");

  return status === 200;
};
