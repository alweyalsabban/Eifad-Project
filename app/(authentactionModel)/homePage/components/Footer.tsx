"use client";

import React from "react";
import Image from "next/image";

import Link from "next/link";

function Footer() {
  return (
    <>
      <div className="bg-secondColorBlack" dir="rtl">
        <div className="cusContaner py-10 m-auto px-4 sm:px-6 lg:px-0">
          <div className=" sm:grid-cols-2 md:grid-cols-4 text-auxiliaryColorWhite gap-10">
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3  items-center md:items-start justify-center">
              <div className="w-full flex justify-center">
                <Link href="#">
                  <Image
                    src="/assets/logoWhite.svg"
                    alt="logo"
                    width={200}
                    height={306}
                  />
                </Link>
              </div>

              <p className="leading-relaxed text-center md:text-start max-w-md">
                منصة توظيف ذكية تربط الباحثين عن عمل وأصحاب الشركات في بيئة
                رقمية موحدة، مدعومة بأدوات تحليل ومطابقة تساعد على تحسين كفاءة
                التوظيف.
              </p>

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

              {/*  <div className="flex items-center gap-3">
                <Link href="#" className="rounded-3xl">
                  <FaFacebook />
                </Link>
              </div> */}
            </div>

            {/*             <div className="flex flex-col items-center md:items-start gap-4">
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
            </div> */}
          </div>

          <div className="mt-10 text-auxiliaryColorWhite flex justify-center">
            <h1 className="text-center sm:text-start text-sm sm:text-base">
              © 2024 إيفاد للتوظيف الذكي. جميع الحقوق محفوظة.
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
