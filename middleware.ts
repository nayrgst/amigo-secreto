import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session-token")?.value;

  const protectedRoutes = ["/dashboard", "/api/auth/"];

  if (
    protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
      return NextResponse.next();
    } catch (error) {
      console.error("Token inválido:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
