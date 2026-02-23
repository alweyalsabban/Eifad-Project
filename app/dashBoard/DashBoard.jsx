"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const fetchWithAuth = async (url, options = {}) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) throw new Error("NO_TOKEN");

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  // لو التوكن غير صالح
  if (response.status === 401) throw new Error("UNAUTHORIZED");

  if (!response.ok) throw new Error(`Request failed: ${response.status}`);

  return response.json();
};

export default function DashBoard() {
  const router = useRouter();

  const [data, setData] = useState(null); // هنا نخزن البيانات
  const [loading, setLoading] = useState(true); // لمنع عرض الصفحة قبل البيانات
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const result = await fetchWithAuth(
          "https://eifad.laravel.cloud/api/auth/me",
        );

        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (cancelled) return;

        setLoading(false);

        // ما فيه توكن أو توكن غلط -> رجّعه للصفحة الرئيسية
        if (err?.message === "NO_TOKEN" || err?.message === "UNAUTHORIZED") {
          document.cookie = "token=; path=/; max-age=0";
          router.replace("/");
          return;
        }

        setError(err?.message || "Something went wrong");
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  // 1) لا تعرض المحتوى قبل ما تجهز البيانات
  if (loading) {
    return <div className="p-4">جاري تحميل البيانات...</div>;
  }

  // 2) لو فيه خطأ غير 401
  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-600">خطأ: {error}</p>
        <button
          className="bg-gray-200 p-2 mt-3"
          onClick={() => router.refresh()}
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  // 3) حماية إضافية: لو ما فيه data لأي سبب
  if (!data) return null;

  return (
    <>
      <h1>dashBoard page</h1>

      {/* الآن تقدر تستخدم data */}
      <pre className="bg-gray-100 p-3 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>

      <button
        onClick={() => {
          localStorage.clear();
          sessionStorage.clear();
          document.cookie = "token=; path=/; max-age=0";
          router.replace("/");
        }}
        className="bg-red-500 p-2 hover:cursor-pointer"
      >
        تسجيل الخروج
      </button>
    </>
  );
}
