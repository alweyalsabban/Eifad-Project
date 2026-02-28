"use client";
import logout from "@/app/lib/deleteCookies";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import SetCookies from "../lib/setCookies";

export default function DashBoard() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  if (token !== "" || token != null) {
    console.log("Cookies");
    SetCookies(token);
    redirect("/dashBoard");
  }
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
