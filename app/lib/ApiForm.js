"use server";
import { cookies } from "next/headers";

export async function ApiForm(Url, meth = "GET", body) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${Url}`, {
    method: meth,
    body: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const Data = await res.json();

  return {
    isSusses: res.ok,
    dataResponse: Data || "no data",
  };
}
