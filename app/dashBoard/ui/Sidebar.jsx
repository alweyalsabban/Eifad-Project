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
    <div
      className="w-15 p-3 bg-auxiliaryColorWhite border border-secondGray z-50
    rounded-full  mr-10 mb-10 hidden md:block  "
    >
      <div className="flex flex-col items-center justify-center gap-9 py-10 ">
        {sidebar.map((j) => {
          return (
            <div key={j.id}>
              <span
                onClick={() => {
                  setnumberOfSideBar(j.id);
                  setName(j.name);
                }}
              >
                <Link href={j.href}>{j.icon}</Link>
              </span>
            </div>
          );
        })}
        <span className="border w-full border-secondGray"></span>
        {smallSidebar.map((j) => {
          return (
            <div key={j.id}>
              <span
                onClick={() => {
                  setnumberOfSideBar(j.id);
                  if (j.id === 14) {
                    localStorage.clear();
                    logout();
                  }
                }}
              >
                <Link href={j.href}>{j.icon}</Link>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
