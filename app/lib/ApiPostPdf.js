"use server";
import { cookies } from "next/headers";

export async function ApiPostPdf(Url, formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${Url}`, {
      method: "POST",
      body: formData, // تأكد أن المرسل هنا هو كائن FormData مباشر
      headers: {
        Authorization: `Bearer ${token}`,
        // ملاحظة: لا تضف 'Content-Type': 'multipart/form-data' يدوياً هنا
      },
    });

    const result = await res.json();

    return {
      isSusses: res.ok,
      dataResponse: result,
    };
  } catch (error) {
    return { isSusses: false, dataResponse: error.message };
  }
}
