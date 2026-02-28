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

  // 1. استخراج التوكن من الرابط (Query Params) في حال كان قادماً من Google/Laravel
  const tokenFromUrl = searchParams.get("token");

  // 2. قراءة التوكن الموجود مسبقاً في الكوكيز
  const cookieToken = req.cookies.get("token")?.value;
  const isLoggedIn = !!cookieToken || !!tokenFromUrl;

  // --- منطق معالجة التوكن القادم من الرابط ---
  if (tokenFromUrl) {
    SetCookies(tokenFromUrl);
    /* // توجيه المستخدم لصفحة الداشبورد لتنظيف الرابط من التوكن (URL Cleanup)
    const response = NextResponse.redirect(new URL("/dashBoard", req.url));
    // تخزين التوكن في الكوكيز فوراً
    response.cookies.set("token", tokenFromUrl, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // ساعة واحدة
    });

    return response; */
  }

  // --- منطق الحماية والتحقق من المسارات ---
  const isGuestPath = guestOnlyPaths.includes(pathname);
  const isProtectedPath = protectedPrefixes.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  // إذا كان مسجلاً ويحاول دخول صفحات الضيوف (مثل صفحة اللوجن)
  if (isLoggedIn && isGuestPath) {
    return NextResponse.redirect(new URL("/dashBoard", req.url));
  }

  // إذا لم يكن مسجلاً ويحاول دخول لوحة التحكم
  if (!isLoggedIn && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
