import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// الصفحات المسموحة للضيوف فقط (إذا مسجّل → امنعه منها)
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

// أي مسار يبدأ بهذه الأشياء يعتبر “محمّي” (إذا غير مسجّل → امنعه)
const protectedPrefixes = ["/dashBoard/*"];

function isGuestOnly(pathname: string) {
  return guestOnlyPaths.includes(pathname);
}

function isProtected(pathname: string) {
  return protectedPrefixes.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // نحن نعتبره مسجّل إذا عنده Cookie اسمها token
  const token = req.cookies.get("token")?.value;
  const isLoggedIn = Boolean(token);

  // إذا مسجّل وحاول يدخل صفحات الضيوف → ودّه dashboard
  if (isLoggedIn && isGuestOnly(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashBoard";
    return NextResponse.redirect(url);
  }

  // إذا غير مسجّل وحاول يدخل صفحة محمية → ودّه login (أو /)
  if (!isLoggedIn && isProtected(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login"; // تقدر تخليها "/"
    return NextResponse.redirect(url);
  }

  // غير كذا، خله يكمل طبيعي
  return NextResponse.next();
}

// نطبّق الميدلوير على كل الصفحات
export const config = {
  matcher: ["/:path*"],
};
