"use client";
import React, { useState } from "react";
import Image from "next/image";
import { links } from "../info";
import Link from "next/link";

function Header() {
  const [ismenu, setMenu] = useState(false);

  return (
    <>
      <div dir="rtl" className="bg-auxiliaryColorWhite border-header border">
        <header className="flex justify-between items-center cusContaner m-auto py-2 px-4 sm:px-6">
          <Link href="./" className="shrink-0">
            <Image src="/assets/logo.svg" alt="logo" width={120} height={60} />
          </Link>

          <nav className="gap-8 hidden md:flex">
            {links.map((link) => (
              <Link
                key={link.nameEnglish}
                href={link.hrf}
                className="hover:text-primaryColorBlue hover:cursor-pointer duration-500 font-bold text-[15px]"
              >
                {link.nameArabic}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-2">
            <Link
              href="/login"
              className="bg-auxiliaryColorGray p-2 w-31 h-10 rounded-lg flex items-center justify-center hover:scale-110 duration-500"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/register"
              className="bg-primaryColorBlue p-3 w-28 h-10 rounded-lg text-auxiliaryColorWhite flex items-center justify-center hover:scale-110 duration-500"
            >
              إنشاء حساب
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="p-1"
              onClick={() => {
                setMenu(!ismenu);
              }}
              aria-label="Open Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 hover:cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu */}
      {ismenu && (
        <div
          dir="rtl"
          className="bg-auxiliaryColorWhite w-full min-h-screen flex flex-col items-center justify-start fixed inset-0 z-50 pt-24 px-6"
          onMouseLeave={() => {
            setMenu(false);
          }}
        >
          <nav className="flex flex-col w-full max-w-md">
            {links.map((link) => (
              <Link
                key={link.nameEnglish}
                href={link.hrf}
                className="hover:bg-auxiliaryColorGray w-full h-14 hover:cursor-pointer items-center justify-center flex duration-500 font-bold rounded-lg"
                onClick={() => setMenu(false)}
              >
                {link.nameArabic}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3 flex-col my-6 w-full max-w-md">
            <Link
              href="/login"
              className="bg-auxiliaryColorGray p-2 w-full h-10 rounded-lg flex items-center justify-center hover:scale-110 duration-500"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/register"
              className="bg-primaryColorBlue p-3 w-full h-10 rounded-lg text-auxiliaryColorWhite flex items-center justify-center hover:scale-110 duration-500"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
