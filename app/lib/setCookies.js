"use server";
import { cookies } from "next/headers";

export default async function SetCookies(value) {
  const cookieStore = await cookies();

  cookieStore.set("token", value, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60,
  });
}
