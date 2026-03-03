"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoBell } from "react-icons/go";
import { GrLanguage } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { personInformation } from "../data";

function Header() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(localStorage.getItem("name") || "");
    setRole(localStorage.getItem("role") || "");
  }, []);
  return (
    <div
      className="bg-auxiliaryColorWhite border border-secondGray w-[80%] py-1 px-5 m-auto my-10 rounded-full flex items-center justify-between"
      dir="rtl"
    >
      <div className="flex justify-center items-center gap-4">
        <div className="border w-15 h-15 rounded-full flex items-center justify-center">
          <div className="bg-auxiliaryColorGray w-13 h-13 rounded-full"></div>
        </div>
        <div>
          <h1 className="font-bold text-[18px]">
            {personInformation.name || name}
          </h1>
          <h1 className="font-light text-[14px]">
            {personInformation.role || role === "JobSeeker"
              ? "باحث عن عمل"
              : personInformation.role || role === "Employer"
                ? "صاحب شركة"
                : "مسؤول النظام"}
          </h1>
        </div>
        <div className="flex gap-4 text-[#C6C8CC]">
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
      <div className="flex items-center justify-between gap-4 w-xl h-12 bg-[#FAFAFA] rounded-full">
        <input
          type="text"
          className=" w-full h-full rounded-full outline-none p-6"
          placeholder="ابحث عن الوظيفة ... "
        />
        <div
          className="p-2 bg-primaryColorBlue text-auxiliaryColorWhite rounded-full 
        items-center flex justify-center hover:cursor-pointer ml-4"
        >
          <FiSearch size={20} className="rotate-100" />
        </div>
      </div>
      <div>
        <Link href="/dashBoard/main">
          <Image src="/assets/logo.svg" alt="logo" width={120} height={60} />
        </Link>
      </div>
    </div>
  );
}

export default Header;
