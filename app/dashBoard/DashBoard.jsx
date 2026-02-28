"use client";
import logout from "@/app/lib/deleteCookies";
import { useEffect } from "react";

export default function DashBoard() {
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
