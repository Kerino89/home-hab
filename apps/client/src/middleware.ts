import { type NextRequest, NextResponse } from "next/server";
import { INTERNAL_ROUTES } from "@client/constants/routes.const";

export default async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const refreshToken = cookies.get("_rt")?.value;

  if (!nextUrl.pathname.startsWith(INTERNAL_ROUTES.LOGIN) && !refreshToken) {
    return NextResponse.redirect(new URL(INTERNAL_ROUTES.LOGIN, request.url));
  }

  if (nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(INTERNAL_ROUTES.DISK, request.url));
  }

  const response = NextResponse.next();

  if (nextUrl.pathname.startsWith(INTERNAL_ROUTES.LOGIN)) {
    response.cookies.delete("_rt");
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
