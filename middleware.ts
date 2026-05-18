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

const adminPaths = [
  "/dashBoard/App-monitoring",
  "/dashBoard/Certificate-verification",
  "/dashBoard/Company-verification",
  "/dashBoard/controll",
  "/dashBoard/Job-posting-management",
  "/dashBoard/Reports-analyses",
  "/dashBoard/Support-Fund",
  "/dashBoard/User-Management",
];

const companyPaths = [
  "/dashBoard/candidates",
  "/dashBoard/job-management",
  "/dashBoard/message",
  "/dashBoard/my-profile",
  "/dashBoard/panale",
  "/dashBoard/search-employee",
  "/dashBoard/verification",
];

const jobSeekerPaths = [
  "/dashBoard/analaize-cv",
  "/dashBoard/cv",
  "/dashBoard/favorite-jobs",
  "/dashBoard/job-applications",
  "/dashBoard/main",
  "/dashBoard/messages",
  "/dashBoard/profile",
  "/dashBoard/recommed-job",
  "/dashBoard/road-map",
  "/dashBoard/search-job",
  "/dashBoard/search-pages",
  "/dashBoard/Settings",
  "/dashBoard/trend-market",
];

const protectedPrefixes = ["/dashBoard"];

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  const tokenFromUrl = searchParams.get("token");

  const cookieToken = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  if (tokenFromUrl) {
    const response = NextResponse.redirect(new URL("/dashBoard", req.url));
    SetCookies(tokenFromUrl);

    return response;
  }

  const isLoggedIn = !!cookieToken;

  const isGuestPath = guestOnlyPaths.includes(pathname);
  const isadminPath = adminPaths.includes(pathname);
  const iscompanyPath = companyPaths.includes(pathname);
  const isjobSeekerPath = jobSeekerPaths.includes(pathname);

  const isProtectedPath = protectedPrefixes.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
  if (isLoggedIn && isGuestPath) {
    return NextResponse.redirect(new URL("/dashBoard", req.url));
  }
  if (isLoggedIn && isadminPath && role !== "Admin") {
    return NextResponse.rewrite(new URL("/forbidden", req.url));
  }
  if (isLoggedIn && iscompanyPath && role !== "Employer") {
    return NextResponse.rewrite(new URL("/forbidden", req.url));
  }
  if (isLoggedIn && isjobSeekerPath && role !== "JobSeeker") {
    //return NextResponse.redirect(new URL("/dashBoard", req.url));
    return NextResponse.rewrite(new URL("/forbidden", req.url));
  }

  if (!isLoggedIn && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
