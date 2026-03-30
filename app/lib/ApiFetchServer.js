"use server";
import { cookies } from "next/headers";

export async function ApiFetchServer(Url) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${Url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const Data = await res.json();

  return {
    isSusses: res.ok,
    dataResponse: Data || "no data",
  };
}
