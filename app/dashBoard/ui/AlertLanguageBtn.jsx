"use client";
import React from "react";
import { GoBell } from "react-icons/go";
import { GrLanguage } from "react-icons/gr";
export default function AlertLanguageBtn() {
  return (
    <>
      <div className="flex gap-4 text-[#C6C8CC]">
        <GoBell size={20} className="hover:cursor-pointer" />
        <GrLanguage size={20} className="hover:cursor-pointer" />
      </div>
    </>
  );
}
