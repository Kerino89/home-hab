import jwtDecode from "jwt-decode";

export function isValidToken(token?: string | null): boolean {
  if (!token) return false;

  try {
    const { exp } = jwtDecode<{ exp: number }>(token);

    return Date.now() < exp * 1000;
  } catch (error) {
    return false;
  }
}
