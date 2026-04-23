import { NextResponse } from "next/server";

function setCookies(response: NextResponse, key: string, value: string) {
  response.cookies.set(key, value, {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_API_BASE_URL === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60,
  });
}

export async function POST(req: Request) {
  try {
    const response = NextResponse.json({ success: true });

    const { token, role, name } = await req.json();
    setCookies(response, "token", token);
    setCookies(response, "role", role);
    setCookies(response, "name", name);

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to save session" },
      { status: 500 },
    );
  }
}
