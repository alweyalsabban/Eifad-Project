"use client";

import React from "react";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa6";
import { Prodect, Company, Low } from "../info";
import Link from "next/link";

function Footer() {
  return (
    <>
      <div className="bg-secondColorBlack" dir="rtl">
        <div className="cusContaner py-10 m-auto px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-auxiliaryColorWhite gap-10">
            <div className="gap-6 flex flex-col items-center md:items-start">
              <Link href="#">
                <Image
                  src="/assets/logoWhite.svg"
                  alt="logo"
                  width={200}
                  height={306}
                />
              </Link>

              <p className="leading-relaxed text-center md:text-start max-w-md">
                المنصة الأذكى للتوظيف في الشرق الأوسط. نسعى لتمكين الكوادر
                الوطنية وربطها بأفضل الفرص المتاحة.
              </p>

              <div className="flex items-center gap-3">
                <Link href="#" className="rounded-3xl">
                  <FaFacebook />
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start gap-4">
              <h1 className="font-bold">المنتجات</h1>
              {Prodect.map((e) => (
                <Link
                  href={e.href}
                  key={e.key}
                  className="text-auxiliaryColorGray hover:text-auxiliaryColorWhite duration-300"
                >
                  {e.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col items-center md:items-start gap-4">
              <h1 className="font-bold">الشركة</h1>
              {Company.map((e) => (
                <Link
                  href={e.href}
                  key={e.key}
                  className="text-auxiliaryColorGray hover:text-auxiliaryColorWhite duration-300"
                >
                  {e.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col items-center md:items-start gap-4">
              <h1 className="font-bold">قانوني</h1>
              {Low.map((e) => (
                <Link
                  href={e.href}
                  key={e.key}
                  className="text-auxiliaryColorGray hover:text-auxiliaryColorWhite duration-300"
                >
                  {e.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 text-auxiliaryColorWhite flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
            <h1 className="text-center sm:text-start text-sm sm:text-base">
              © 2024 إيفاد للتوظيف الذكي. جميع الحقوق محفوظة.
            </h1>

            <div className="flex justify-center sm:justify-end">
              <select className="border rounded-lg px-6 sm:px-10 py-2 items-center flex justify-center appearance-none bg-transparent text-auxiliaryColorWhite">
                <option value="ar" className="text-black">
                  العربية
                </option>
                <option value="en" className="text-black">
                  English
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
