import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import SetCookies from "./app/lib/setCookies";

const guestOnlyPaths = [
  "/",
  "/login",
  "/register",
  "/about-us",
  "/forgetPasswoed",
  "/jobs",
  "/rest-password",
  "/service",
  "/verify",
];

const protectedPrefixes = ["/dashBoard"];

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  const tokenFromUrl = searchParams.get("token");
  const cookieToken = req.cookies.get("token")?.value;

  if (tokenFromUrl) {
    const response = NextResponse.redirect(new URL("/dashBoard", req.url));
    SetCookies(tokenFromUrl);

    return response;
  }

  const isLoggedIn = !!cookieToken;

  const isGuestPath = guestOnlyPaths.includes(pathname);
  const isProtectedPath = protectedPrefixes.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  if (isLoggedIn && isGuestPath) {
    return NextResponse.redirect(new URL("/dashBoard", req.url));
  }

  if (!isLoggedIn && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
