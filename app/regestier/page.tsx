"use client";

/* import React from "react";
import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react";
import RegesterPage from "./Components/RegesterPage";
import LogInPage from "./Components/LogInPage";

function Page() {
  const [isLogIn, setLogIn] = useState(true);
  return (
    <>
      <div className="cusContaner m-auto mb-10" dir="rtl">
        <header className="flex items-center justify-between w-[80%] m-auto">
          <a href="./">
            <Image src="/assets/logo.svg" alt="logo" width={120} height={60} />
          </a>
          <a href="./" className="flex items-center justify-center gap-3">
            العوة للخلف <IoArrowBack />
          </a>
        </header>

        <section
          className={`w-250 ${isLogIn ? " h-220" : " h-160"} m-auto  lg:m-auto md:mx-20   flex `}
        >
          <div className="flex flex-col items-center w-130">
            <div className="items-center flex flex-col  gap-3">
              <h1 className="text-secondColorBlack font-bold text-2xl">
                مرحبا بك
              </h1>
              <h1>رجاءََ أدخل تفاصيل حسابك</h1>
            </div>

            <div className="grid md:grid-cols-2">
              <button
                className={`w-60 h-9 py-10  hover:cursor-pointer  ${isLogIn && "border-b-3  text-primaryColorBlue border-b-primaryColorBlue"} `}
                onClick={() => {
                  setLogIn(true);
                }}
              >
                إنشاء حساب
              </button>
              <button
                className={`w-60 h-9 py-10 hover:cursor-pointer ${!isLogIn && "border-b-3  text-primaryColorBlue border-b-primaryColorBlue"}`}
                onClick={() => {
                  setLogIn(false);
                }}
              >
                تسجيل دخول
              </button>
            </div>
            <div>{isLogIn ? <RegesterPage /> : <LogInPage />}</div>
          </div> */

{
  /* Second Section */
}
/*   <div className="w-120.5 bg-linear-to-r from-[#016B7E] to-[#37B9C5] rounded-l-3xl px-10 pt-10 hidden flex-col lg:flex">
            <div className="flex flex-col gap-5">
              <h1 className="text-auxiliaryColorWhite text-2xl font-bold leading-13">
                ابحث عن خطوتك المهنية التالية مع خاصية المطابقة الذكية.
              </h1>
              <p className="text-auxiliaryColorGray w-90 leading-7">
                انضم إلى آلاف المهنيين والشركات ذات الرؤية المستقبلية التي تبني
                المستقبل معًا.
              </p>
            </div> */
{
  /* Number add */
}
/*     </div>
        </section>
      </div>
    </>
  );
}

export default Page;
 */

import React from "react";
import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react";
import RegesterPage from "./Components/RegesterPage";
import LogInPage from "./Components/LogInPage";

function Page() {
  const [isLogIn, setLogIn] = useState(true);

  return (
    <>
      <div className="cusContaner m-auto mb-10" dir="rtl">
        <header className="flex items-center justify-between w-full max-w-230 m-auto px-4 sm:px-0 py-2">
          <a href="./" className="shrink-0">
            <Image src="/assets/logo.svg" alt="logo" width={120} height={60} />
          </a>

          <a
            href="./"
            className="flex items-center justify-center gap-3 text-sm sm:text-base"
          >
            العوة للخلف <IoArrowBack />
          </a>
        </header>

        <section
          className={`w-full max-w-250 ${
            isLogIn ? "min-h-220" : "min-h-160"
          } m-auto mt-6 flex flex-col lg:flex-row`}
        >
          {/* Form Section */}
          <div className="flex flex-col items-center w-full lg:w-130 px-4 sm:px-0">
            <div className="items-center flex flex-col gap-3">
              <h1 className="text-secondColorBlack font-bold text-2xl">
                مرحبا بك
              </h1>
              <h1 className="text-center">رجاءََ أدخل تفاصيل حسابك</h1>
            </div>

            <div className="grid grid-cols-2 w-full max-w-120 mt-4">
              <button
                className={`w-full h-12 hover:cursor-pointer ${
                  isLogIn &&
                  "border-b-3 text-primaryColorBlue border-b-primaryColorBlue"
                }`}
                onClick={() => {
                  setLogIn(true);
                }}
              >
                إنشاء حساب
              </button>
              <button
                className={`w-full h-12 hover:cursor-pointer ${
                  !isLogIn &&
                  "border-b-3 text-primaryColorBlue border-b-primaryColorBlue"
                }`}
                onClick={() => {
                  setLogIn(false);
                }}
              >
                تسجيل دخول
              </button>
            </div>

            <div className="w-full max-w-120">
              {isLogIn ? <RegesterPage /> : <LogInPage />}
            </div>
          </div>

          {/* Second Section */}
          <div className="w-full lg:w-105 bg-linear-to-r from-[#016B7E] to-[#37B9C5] rounded-3xl lg:rounded-l-3xl lg:rounded-r-none px-6 sm:px-10 pt-10 hidden flex-col lg:flex">
            <div className="flex flex-col gap-5">
              <h1 className="text-auxiliaryColorWhite text-2xl font-bold leading-10">
                ابحث عن خطوتك المهنية التالية مع خاصية المطابقة الذكية.
              </h1>
              <p className="text-auxiliaryColorGray w-full max-w-90 leading-7">
                انضم إلى آلاف المهنيين والشركات ذات الرؤية المستقبلية التي تبني
                المستقبل معًا.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Page;
