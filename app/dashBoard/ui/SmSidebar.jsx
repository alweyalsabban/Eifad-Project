"use client";
import {
  JobseekerSideBar,
  TwoIcon,
  personInformation,
  CompanySideBar,
  AdminSideBar,
} from "../data";
import logout from "@/app/lib/deleteCookies";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SmSidebar({
  setName,
  numberOfSideBar,
  setnumberOfSideBar,
}) {
  const [role, setRole] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);
  const sidebar =
    personInformation.role === "JobSeeker" || role === "JobSeeker"
      ? JobseekerSideBar(numberOfSideBar)
      : personInformation.role === "Employer" || role === "Employer"
        ? CompanySideBar(numberOfSideBar)
        : personInformation.role === "Admin" || role === "Admin"
          ? AdminSideBar(numberOfSideBar)
          : [];
  const smallSidebar = TwoIcon(numberOfSideBar);
  const allIcons = [...sidebar, ...smallSidebar];

  const handleNavigation = (item) => {
    // التأكد من أن الدوال موجودة قبل استدعائها لتجنب الخطأ الذي ظهر لك
    if (typeof setnumberOfSideBar === "function") {
      setnumberOfSideBar(item.id);
    }
    if (typeof setName === "function" && item.name) {
      setName(item.name);
    }

    if (item.id === 14) {
      setIsLoggingOut(true);
      localStorage.clear();
      logout();
    }
  };

  return (
    <>
      {isLoggingOut && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      )}
      {/* --- Mobile Bottom Nav (اللون الأزرق هنا) --- */}
      <div
        className="md:hidden  fixed bottom-5 left-0 right-0 bg-white border-t w-[80%] m-auto rounded-2xl
      border-gray-200 z-50 shadow-[0_-2px_15px_rgba(0,0,0,0.1)] px-2"
      >
        <div className="flex items-center justify-start gap-2 overflow-x-auto no-scrollbar py-3 px-4">
          {allIcons.map((j) => (
            <Link
              key={j.id}
              href={j.href}
              onClick={() => handleNavigation(j)}
              className={`flex flex-col items-center justify-center min-w-20 py-1 rounded-xl transition-all
                ${numberOfSideBar === j.id ? "text-blue-600 bg-blue-50 font-bold" : "text-gray-500"}`}
            >
              <span
                className={`text-2xl ${numberOfSideBar === j.id ? "text-blue-600" : "text-gray-400"}`}
              >
                {j.icon}
              </span>
              <span className="text-[10px] mt-1 text-center ">
                {j.name || (j.id === 14 ? "خروج" : "")}
              </span>
            </Link>
          ))}
        </div>
        {/* Safe area for mobile */}
        <div className="h-4 bg-white"></div>
      </div>

      {/* Spacer for Mobile */}
      <div className="h-20 lg:hidden"></div>
    </>
  );
}
