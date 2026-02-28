import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

  // 1. استخراج التوكن من الرابط أو الكوكيز
  const tokenFromUrl = searchParams.get("token");
  const cookieToken = req.cookies.get("token")?.value;

  // 2. معالجة حالة وجود توكن في الرابط (تسجيل دخول جديد)
  if (tokenFromUrl) {
    // توجيه المستخدم للداشبورد لتنظيف الرابط من التوكن
    const response = NextResponse.redirect(new URL("/dashBoard", req.url));

    // تخزين التوكن في الكوكيز
    response.cookies.set("token", tokenFromUrl, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // تم التغيير لـ lax لضمان القبول بعد التوجيه الخارجي
      path: "/",
      maxAge: 60 * 60 * 24, // جعلناها 24 ساعة لضمان عدم الطرد السريع
    });

    return response;
  }

  // 3. تحديد حالة تسجيل الدخول الحالية
  const isLoggedIn = !!cookieToken;

  // 4. تحديد نوع المسار الحالي
  const isGuestPath = guestOnlyPaths.includes(pathname);
  const isProtectedPath = protectedPrefixes.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  // 5. منطق التحويلات (Redirection Logic)

  // إذا كان مسجلاً ويحاول دخول صفحات الضيوف (login, register...)
  if (isLoggedIn && isGuestPath) {
    return NextResponse.redirect(new URL("/dashBoard", req.url));
  }

  // إذا لم يكن مسجلاً ويحاول دخول الداشبورد
  if (!isLoggedIn && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
