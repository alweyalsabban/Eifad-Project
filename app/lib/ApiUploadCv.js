"use server";

import { cookies } from "next/headers";

export async function ApiUploadCv(Url, formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const headers = {
      Accept: "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${Url}`, {
      method: "POST",
      body: formData,
      headers,
    });

    const contentType = res.headers.get("content-type");

    let result;

    if (contentType?.includes("application/json")) {
      result = await res.json();
    } else {
      result = await res.text();
    }

    return {
      isSuccess: res.ok,
      status: res.status,
      dataResponse: result,
    };
  } catch (error) {
    return {
      isSuccess: false,
      status: 500,
      dataResponse: {
        message: error.message || "حدث خطأ غير متوقع",
      },
    };
  }
}
