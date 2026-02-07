"use client";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { LuClock } from "react-icons/lu";

import Image from "next/image";

function Page() {
  const number = [
    { key: 1, value: 0, set: () => {} },
    { key: 2, value: 0, set: () => {} },
    { key: 3, value: 0, set: () => {} },
    { key: 4, value: 0, set: () => {} },
    { key: 5, value: 0, set: () => {} },
    { key: 6, value: 0, set: () => {} },
  ];
  return (
    <>
      <div
        className="w-111 h-142 bg-auxiliaryColorWhite shadow-2xl rounded-b-lg m-auto mt-20
      items-center flex flex-col text-center py-10 px-8 justify-center "
        dir="rtl"
      >
        <Image
          src="/assets/chek.svg"
          alt="bg"
          width={50}
          height={40}
          className="mb-3 select-none pointer-events-none"
        />
        <h1 className="text-2xl font-bold">التحقق بخطوتين</h1>
        <p className="leading-8 w-75 mt-4">
          لقد أرسلنا رمز تحقق مكون من 6 أرقام إلى عنوان البريد الإلكتروني
          j***@gmail.com. يرجى إدخاله أدناه.{" "}
        </p>

        <form action="" className="mt-6  w-100 flex flex-col items-center ">
          <div className="flex gap-2">
            {number.map((e) => (
              <input
                key={e.key}
                type="text"
                className="border border-auxiliaryColorGray rounded-lg w-12 h-14 text-center"
                maxLength={1}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 mt-7 bg-auxiliaryColorGray px-10 py-1 rounded-sm text-auxiliaryColorOrange">
            <h1>ينتهي الرمز في 10:00 </h1>
            <LuClock />
          </div>

          <input
            type="submit"
            value="التحقق من الحساب البريد أدخل الآن البريد"
            className="w-90 h-12 mt-7 bg-primaryColorBlue text-auxiliaryColorWhite font-bold rounded-lg 
          hover:cursor-pointer hover:scale-105 duration-500 shadow-[0px_4px_6px_-4px_rgba(1,107,126,0.3),0px_10px_15px_-3px_rgba(1,107,126,0.3)]"
          />
        </form>

        <div className="mt-10 font-bold text-sm hover:cursor-pointer flex items-center gap-2">
          <a href="/regestier">الرجوع لتسجيل الدخول</a>
          <IoMdArrowBack size={15} />
        </div>
      </div>
    </>
  );
}

export default Page;
