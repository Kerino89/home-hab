import { type NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/disk", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
