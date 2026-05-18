"use server";
import { cookies } from "next/headers";

export default async function setRole(value) {
  const cookieStore = await cookies();

  cookieStore.set("role", value, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60,
  });
}
