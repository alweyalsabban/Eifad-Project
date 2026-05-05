"use server";
import { cookies } from "next/headers";

export async function ApiPdf(Url, meth = "GET", body) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${Url}`, {
    method: meth,
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const blob = await res.blob();

  return {
    isSusses: res.ok,
    dataResponse: blob || "no data",
  };
}
