"use client";
/* 
import React from "react";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa6";
import { Prodect, Company, Low } from "../info";

function Footer() {
  return (
    <>
      <div className="bg-secondColorBlack" dir="rtl">
        <div className="cusContaner py-10 m-auto ">
          <div className="grid grid-cols-1 md:grid-cols-4  text-auxiliaryColorWhite gap-10  ">
            <div className="  gap-6 flex flex-col  items-center">
              <a href="#">
                <Image
                  src="/assets/logoWhite.svg"
                  alt="logo"
                  width={200}
                  height={306}
                />
              </a>
              <p className="leading-relaxed text-center">
                المنصة الأذكى للتوظيف في الشرق الأوسط. نسعى لتمكين الكوادر
                الوطنية وربطها بأفضل الفرص المتاحة.
              </p>
              <div>
                <a href="#" className="rounded-3xl ">
                  <FaFacebook />
                </a>
              </div>
            </div>

            <div className=" flex flex-col items-center gap-4">
              <h1 className="font-bold">المنتجات</h1>
              {Prodect.map((e) => (
                <a
                  href={e.href}
                  key={e.key}
                  className="text-auxiliaryColorGray"
                >
                  {e.name}
                </a>
              ))}
            </div>
            <div className="flex flex-col items-center gap-4">
              <h1 className="font-bold">الشركة</h1>
              {Company.map((e) => (
                <a
                  href={e.href}
                  key={e.key}
                  className="text-auxiliaryColorGray"
                >
                  {e.name}
                </a>
              ))}
            </div>
            <div className=" flex flex-col items-center gap-4">
              <h1 className="font-bold">قانوني</h1>
              {Low.map((e) => (
                <a
                  href={e.href}
                  key={e.key}
                  className="text-auxiliaryColorGray"
                >
                  {e.name}
                </a>
              ))}
            </div>
          </div>
          <div className="text-auxiliaryColorWhite flex justify-between items-center">
            <h1>© 2024 إيفاد للتوظيف الذكي. جميع الحقوق محفوظة.</h1>
            <select className="border rounded-lg px-10 py-2 items-center flex justify-center appearance-none">
              <option value="ar" className="text-black">
                العربية
              </option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
 */
import React from "react";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa6";
import { Prodect, Company, Low } from "../info";

function Footer() {
  return (
    <>
      <div className="bg-secondColorBlack" dir="rtl">
        <div className="cusContaner py-10 m-auto px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-auxiliaryColorWhite gap-10">
            <div className="gap-6 flex flex-col items-center md:items-start">
              <a href="#">
                <Image
                  src="/assets/logoWhite.svg"
                  alt="logo"
                  width={200}
                  height={306}
                />
              </a>

              <p className="leading-relaxed text-center md:text-start max-w-md">
                المنصة الأذكى للتوظيف في الشرق الأوسط. نسعى لتمكين الكوادر
                الوطنية وربطها بأفضل الفرص المتاحة.
              </p>

              <div className="flex items-center gap-3">
                <a href="#" className="rounded-3xl">
                  <FaFacebook />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start gap-4">
              <h1 className="font-bold">المنتجات</h1>
              {Prodect.map((e) => (
                <a
                  href={e.href}
                  key={e.key}
                  className="text-auxiliaryColorGray hover:text-auxiliaryColorWhite duration-300"
                >
                  {e.name}
                </a>
              ))}
            </div>

            <div className="flex flex-col items-center md:items-start gap-4">
              <h1 className="font-bold">الشركة</h1>
              {Company.map((e) => (
                <a
                  href={e.href}
                  key={e.key}
                  className="text-auxiliaryColorGray hover:text-auxiliaryColorWhite duration-300"
                >
                  {e.name}
                </a>
              ))}
            </div>

            <div className="flex flex-col items-center md:items-start gap-4">
              <h1 className="font-bold">قانوني</h1>
              {Low.map((e) => (
                <a
                  href={e.href}
                  key={e.key}
                  className="text-auxiliaryColorGray hover:text-auxiliaryColorWhite duration-300"
                >
                  {e.name}
                </a>
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
