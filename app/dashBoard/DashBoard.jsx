"use client";

import logout from "@/app/lib/deleteCookies";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import SetCookies from "../lib/setCookies";

export default function DashBoard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      SetCookies(token);
      router.push("/dashBoard");
    }
  }, [token, router]);

  useEffect(() => {
    async function fetc() {
      const res = await fetch("/api/user");
      const data = await res.json();
      if (res.ok) {
        console.log(data);
      }
    }
    fetc();
  }, []);

  return (
    <>
      <h1>dashBoard page</h1>

      <button
        onClick={() => {
          localStorage.clear();
          sessionStorage.clear();
          logout();
        }}
        className="bg-red-500 p-2 hover:cursor-pointer"
      >
        تسجيل الخروج
      </button>
    </>
  );
}
