"use client";
/* 
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { EmployeeFeatcher, CompanyFeatcher } from "../info";
import RoadToSing from "./RoadToSing";

function FeatcherAI() {
  const [isEmployee, setEmployee] = useState(false);
  const featcher = isEmployee ? EmployeeFeatcher : CompanyFeatcher;

  return (
    <>
      <div className="cusContaner bg-auxiliaryColorWhite m-auto " dir="rtl">
        <div className="flex flex-col items-center justify-center m-auto gap-6 mt-10">
          <h1 className="text-3xl font-bold text-secondColorBlack m-auto text-center">
            مميزات ذكية تربط الكفاءات بالفرص العظيمة
          </h1>
          <p className="text-secondColorBlack w-[70%] sm:w-[45%] text-center leading-relaxed">
            نوحد الرؤى بين المواهب الباحثة عن التطور والمؤسسات الباحثة عن
            التميز، لنخلق بيئة عمل مثالية للجميع باستخدام أحدث تقنيات الذكاء
            الاصطناعي.
          </p>
          <div className="inline-flex mb-7 items-center gap-2 w-fit h-12 p-4 rounded-xl bg-[#F0FDFA] border border-[#E2E8F0] shadow-[inset_0_2px_4px_1px_rgba(0,0,0,0.05)] ">
            <button
              className={`w-27 h-9 hover:cursor-pointer cusFeatcherBtn ${isEmployee && "btnActive"} `}
              onClick={() => {
                setEmployee(true);
              }}
            >
              للموظفين
            </button>
            <button
              className={`cusFeatcherBtn hover:cursor-pointer ${!isEmployee && "btnActive"}`}
              onClick={() => {
                setEmployee(false);
              }}
            >
              للمدراء
            </button>
          </div>
        </div> */
{
  /* Featcher */
}
/*  <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 2xl:grid-cols-4">
          {featcher.map((e) => (
            <div
              key={e.key}
              className="w-70 h-59 border border-auxiliaryColorGray rounded-2xl p-6 gap-3 grid m-auto"
            >
              <div className="w-12 h-12 bg-linear-to-r from-[#016B7E1A] to-[#37B9C51A] flex items-center justify-center  rounded-xl">
                <Image
                  src={e.icon}
                  alt="bg"
                  width={30}
                  height={36}
                  className="rounded-3xl "
                />
              </div>
              <h1 className="text-xl font-bold">{e.title}</h1>
              <p className="text-[#475569] w-60 text-[15px] leading-7">
                {e.describtion}
              </p>
            </div>
          ))}
        </div>
      </div>
      <RoadToSing isEmployee={isEmployee} />
    </>
  );
}

export default FeatcherAI;
 */

import Image from "next/image";
import React from "react";
import { useState } from "react";
import { EmployeeFeatcher, CompanyFeatcher } from "../info";
import RoadToSing from "./RoadToSing";

function FeatcherAI() {
  const [isEmployee, setEmployee] = useState(false);
  const featcher = isEmployee ? EmployeeFeatcher : CompanyFeatcher;

  return (
    <>
      <div className="cusContaner bg-auxiliaryColorWhite m-auto " dir="rtl">
        <div className="flex flex-col items-center justify-center m-auto gap-6 mt-10">
          <h1 className="text-3xl font-bold text-secondColorBlack m-auto text-center">
            مميزات ذكية تربط الكفاءات بالفرص العظيمة
          </h1>
          <p className="text-secondColorBlack w-[70%] sm:w-[45%] text-center leading-relaxed">
            نوحد الرؤى بين المواهب الباحثة عن التطور والمؤسسات الباحثة عن
            التميز، لنخلق بيئة عمل مثالية للجميع باستخدام أحدث تقنيات الذكاء
            الاصطناعي.
          </p>
          <div className="inline-flex mb-7 items-center gap-2 w-fit h-12 p-4 rounded-xl bg-[#F0FDFA] border border-[#E2E8F0] shadow-[inset_0_2px_4px_1px_rgba(0,0,0,0.05)] ">
            <button
              className={`w-27 h-9 hover:cursor-pointer cusFeatcherBtn ${isEmployee && "btnActive"} `}
              onClick={() => {
                setEmployee(true);
              }}
            >
              للموظفين
            </button>
            <button
              className={`cusFeatcherBtn hover:cursor-pointer ${!isEmployee && "btnActive"}`}
              onClick={() => {
                setEmployee(false);
              }}
            >
              للمدراء
            </button>
          </div>
        </div>
        {/* Featcher */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 2xl:grid-cols-4">
          {featcher.map((e) => (
            <div
              key={e.key}
              className="w-70 h-59 border border-auxiliaryColorGray rounded-2xl p-6 gap-3 grid m-auto"
            >
              <div className="w-12 h-12 bg-linear-to-r from-[#016B7E1A] to-[#37B9C51A] flex items-center justify-center  rounded-xl">
                <Image
                  src={e.icon}
                  alt="bg"
                  width={30}
                  height={36}
                  className="rounded-3xl "
                />
              </div>
              <h1 className="text-xl font-bold">{e.title}</h1>
              <p className="text-[#475569] w-60 text-[15px] leading-7">
                {e.describtion}
              </p>
            </div>
          ))}
        </div>
      </div>
      <RoadToSing isEmployee={isEmployee} />
    </>
  );
}

export default FeatcherAI;
