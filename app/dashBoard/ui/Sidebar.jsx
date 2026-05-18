"use client";
import {
  JobseekerSideBar,
  CompanySideBar,
  AdminSideBar,
  TwoIcon,
  personInformation,
} from "../data";
import logout from "@/app/lib/deleteCookies";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Sidebar({
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

  return (
    <>
      {isLoggingOut && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      )}
      <div
        className="w-15 p-3 bg-auxiliaryColorWhite border border-secondGray z-50
      rounded-full  mr-10 mb-10 hidden md:block  "
      >
        <div className="flex flex-col items-center justify-center gap-9 py-10 ">
          {sidebar.map((j) => {
            return (
              <div key={j.id} className="relative group flex items-center">
                <span
                  onClick={() => {
                    setnumberOfSideBar(j.id);
                    setName(j.name);
                  }}
                  className="cursor-pointer"
                >
                  <Link href={j.href}>{j.icon}</Link>
                </span>

                {/* Tooltip */}
                <div className="absolute right-full mr-4 px-2 py-1 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-[100] shadow-lg pointer-events-none flex items-center">
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-800"></div>
                  {j.name}
                </div>
              </div>
            );
          })}
          <span className="border w-full border-secondGray"></span>
          {smallSidebar.map((j) => {
            return (
              <div key={j.id} className="relative group flex items-center">
                <span
                  onClick={() => {
                    setnumberOfSideBar(j.id);
                    if (j.id === 14) {
                      setIsLoggingOut(true);
                      localStorage.clear();
                      logout();
                    }
                  }}
                  className="cursor-pointer"
                >
                  <Link href={j.href}>{j.icon}</Link>
                </span>

                {/* Tooltip */}
                <div className="absolute right-full mr-4 px-2 py-1 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-[100] shadow-lg pointer-events-none flex items-center">
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-800"></div>
                  {j.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
