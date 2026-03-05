"use client";

import Image from "next/image";
import Link from "next/link";
import { GoBell } from "react-icons/go";
import { GrLanguage } from "react-icons/gr";
import { FiSearch, FiMenu } from "react-icons/fi";
import { useState, useEffect } from "react";
import { personInformation } from "../data";

function SmHeader() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(localStorage.getItem("name") || personInformation.name);
    setRole(localStorage.getItem("role") || personInformation.role);
  }, []);

  const currentName = name || personInformation.name || "";
  const currentRole = role || personInformation.role || "";

  const roleLabel =
    currentRole === "JobSeeker"
      ? "باحث عن عمل"
      : currentRole === "Employer"
        ? "صاحب شركة"
        : currentRole === "Admin"
          ? "مسؤول النظام"
          : "";

  return (
    <header dir="rtl" className="mx-auto my-10 w-[95%] lg:w-[80%]">
      <div
        className="
          bg-auxiliaryColorWhite border border-secondGray
          px-4 lg:px-5 py-3
          rounded-2xl lg:rounded-full
          flex flex-col lg:flex-row
          gap-4
          lg:items-center lg:justify-between
        "
      >
        {/* Top row (md/sm) + Left side (lg) */}
        <div className="flex items-center justify-between gap-3">
          {/* User info */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar */}
            <div className="border w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              <div className="bg-auxiliaryColorGray w-10 h-10 rounded-full" />
            </div>

            {/* Name & role */}
            <div className="min-w-0">
              <h1 className="font-bold text-[16px] lg:text-[18px] truncate">
                {currentName}
              </h1>
              <p className="font-light text-[12px] lg:text-[14px] text-gray-500 truncate">
                {roleLabel}
              </p>
            </div>

            {/* Icons (bell/lang) */}
            <div className="hidden sm:flex gap-4 text-[#C6C8CC] mr-2">
              <GoBell
                size={20}
                onClick={() => {
                  // To show Notif
                }}
                className="hover:cursor-pointer"
              />
              <GrLanguage
                size={20}
                onClick={() => {
                  // To change language
                }}
                className="hover:cursor-pointer"
              />
            </div>
          </div>

          {/* Logo */}
          <Link href="/dashBoard/main" className="shrink-0">
            <Image src="/assets/logo.svg" alt="logo" width={120} height={60} />
          </Link>
        </div>

        {/* Icons on very small screens (optional) */}
        <div className="flex sm:hidden gap-4 text-[#C6C8CC]">
          <GoBell
            size={20}
            onClick={() => {
              // To show Notif
            }}
            className="hover:cursor-pointer"
          />
          <GrLanguage
            size={20}
            onClick={() => {
              // To change language
            }}
            className="hover:cursor-pointer"
          />
        </div>

        {/* Search (full width on md/sm, fixed-ish on lg) */}
        <div className="w-full lg:w-[520px]">
          <div className="flex items-center gap-3 h-12 bg-[#FAFAFA] rounded-full border border-transparent">
            <input
              type="text"
              className="w-full h-full rounded-full outline-none px-6 bg-transparent text-sm"
              placeholder="ابحث عن الوظيفة ... "
            />
            <button
              className="p-2 bg-primaryColorBlue text-auxiliaryColorWhite rounded-full
                         flex items-center justify-center hover:cursor-pointer ml-3"
              aria-label="search"
            >
              <FiSearch size={20} className="rotate-100" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SmHeader;
