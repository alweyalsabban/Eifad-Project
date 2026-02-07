"use client";
/* "use client";

import Image from "next/image";
import { useState } from "react";
type FeatcherAIProps = {
  isEmployee: boolean;
};

import { RoadToSingForEmployee, RoadToSingForCompany } from "../info";

function RoadToSing({ isEmployee }: FeatcherAIProps) {
  const [nummber, setNumber] = useState(0);
  const [isMeduim] = useState(true);
  const whatRoad = isEmployee ? RoadToSingForEmployee : RoadToSingForCompany;
  return (
    <>
      <div className="bg-[#F0FDFA]" dir="rtl">
        <div className="cusContaner m-auto h-200 md:h-120">
          <div className="flex flex-col gap-3 items-center justify-center m-auto py-10">
            <h1 className="font-bold text-center text-3xl">
              طريقك نحو توظيف أذكى
            </h1>
            <p>ارتقِ باستراتيجية التوظيف لديك في ثلاث خطوات استراتيجية.</p>
          </div> */
{
  /* Road Map to sing in */
}
/*           <div className={`hidden xl:block `}>
            <div className="flex">
              <Image
                src="/assets/path/path1.svg"
                alt="bg"
                width={400}
                height={400}
                className="relative top-34.5 right-2.75 pointer-events-none select-none"
              />
              <Image
                src="/assets/path/path2.svg"
                alt="bg"
                width={400}
                height={400}
                className="relative right-[7.8px] top-3.5 pointer-events-none select-none"
              />
              <Image
                src="/assets/path/path3.svg"
                alt="bg"
                width={400}
                height={400}
                className="relative top-35 right-[4.5px] pointer-events-none select-none"
              />
            </div>
            <div className="flex justify-between  ">
              {whatRoad.map((e) => (
                <div key={e.key}>
                  <div
                    className={`w-12 h-12 rounded-full  border-2 border-primaryColorBlue text-primaryColorBlue 
                  flex items-center justify-center font-bold bg-[#F0FDFA] ${e.postionId} 
                  hover:cursor-pointer hover:bg-auxiliaryColorOrange hover:border-auxiliaryColorOrange hover:text-auxiliaryColorWhite 
                  hover:shadow-[0_4px_6px_-4px_rgba(249,115,22,0.30),0_10px_15px_-3px_rgba(249,115,22,0.30)] duration-500 hover:scale-95 `}
                    onMouseEnter={() => {
                      setNumber(e.key);
                    }}
                    onMouseLeave={() => {
                      setNumber(0);
                    }}
                  >
                    {e.key}
                  </div>
                  <div
                    className={`text-center w-53 gap-2 flex flex-col ${e.postion} `}
                  >
                    <h1 className="font-bold text-[18px]">{e.title}</h1>
                    <p
                      className={`w-54 leading-relaxed text-pretty  ${e.key === nummber ? "" : "opacity-0"}  duration-1000 `}
                    >
                      {e.describtion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
 
          </div>
 */
{
  /* Road Map For Mobile */
}

/*          <div className="grid grid-cols-1  xl:hidden sm:grid-cols-3 ">
            {whatRoad.map((e) => (
              <div
                key={e.key}
                className="flex flex-col  items-center justify-center gap-5 mb-6 "
              >
                <div
                  className={`w-12 h-12 rounded-full  border-2 border-primaryColorBlue text-primaryColorBlue 
                  flex items-center justify-center font-bold bg-[#F0FDFA] ${!isMeduim && e.postionId} 
                  hover:cursor-pointer hover:bg-auxiliaryColorOrange hover:border-auxiliaryColorOrange hover:text-auxiliaryColorWhite 
                  hover:shadow-[0_4px_6px_-4px_rgba(249,115,22,0.30),0_10px_15px_-3px_rgba(249,115,22,0.30)] duration-500 hover:scale-95`}
                  onMouseEnter={() => {
                    setNumber(e.key);
                  }}
                  onMouseLeave={() => {
                    setNumber(0);
                  }}
                >
                  {e.key}
                </div>
                <div
                  className={`text-center w-53 gap-2 flex flex-col ${!isMeduim && e.postion} `}
                >
                  <h1 className="font-bold text-[18px]">{e.title}</h1>
                  <p
                    className={`w-54 leading-relaxed text-pretty  ${e.key === nummber ? "" : "opacity-0"}  duration-1000 `}
                  >
                    {e.describtion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RoadToSing; */

import Image from "next/image";
import { useState } from "react";

type FeatcherAIProps = {
  isEmployee: boolean;
};

import { RoadToSingForEmployee, RoadToSingForCompany } from "../info";

function RoadToSing({ isEmployee }: FeatcherAIProps) {
  const [nummber, setNumber] = useState(0);
  const [isMeduim] = useState(true);
  const whatRoad = isEmployee ? RoadToSingForEmployee : RoadToSingForCompany;

  return (
    <>
      <div className="bg-[#F0FDFA]" dir="rtl">
        <div className="cusContaner m-auto min-h-130 md:min-h-95">
          <div className="flex flex-col gap-3 items-center justify-center m-auto py-10 px-4 sm:px-0">
            <h1 className="font-bold text-center text-2xl sm:text-3xl">
              طريقك نحو توظيف أذكى
            </h1>
            <p className="text-center text-sm sm:text-base">
              ارتقِ باستراتيجية التوظيف لديك في ثلاث خطوات استراتيجية.
            </p>
          </div>

          {/* Road Map to sing in */}
          <div className="hidden xl:block">
            <div className="flex justify-center">
              <Image
                src="/assets/path/path1.svg"
                alt="bg"
                width={400}
                height={400}
                className="relative top-34.5 right-2.75 pointer-events-none select-none"
              />
              <Image
                src="/assets/path/path2.svg"
                alt="bg"
                width={400}
                height={400}
                className="relative right-[7.8px] top-3.5 pointer-events-none select-none"
              />
              <Image
                src="/assets/path/path3.svg"
                alt="bg"
                width={400}
                height={400}
                className="relative top-35 right-[4.5px] pointer-events-none select-none"
              />
            </div>

            <div className="flex justify-between gap-6">
              {whatRoad.map((e) => (
                <div key={e.key}>
                  <div
                    className={`w-12 h-12 rounded-full border-2 border-primaryColorBlue text-primaryColorBlue 
                    flex items-center justify-center font-bold bg-[#F0FDFA] ${e.postionId} 
                    hover:cursor-pointer hover:bg-auxiliaryColorOrange hover:border-auxiliaryColorOrange hover:text-auxiliaryColorWhite 
                    hover:shadow-[0_4px_6px_-4px_rgba(249,115,22,0.30),0_10px_15px_-3px_rgba(249,115,22,0.30)] duration-500 hover:scale-95`}
                    onMouseEnter={() => {
                      setNumber(e.key);
                    }}
                    onMouseLeave={() => {
                      setNumber(0);
                    }}
                  >
                    {e.key}
                  </div>

                  <div
                    className={`text-center w-53 gap-2 flex flex-col ${e.postion}`}
                  >
                    <h1 className="font-bold text-[18px]">{e.title}</h1>
                    <p
                      className={`w-54 leading-relaxed text-pretty ${
                        e.key === nummber ? "" : "opacity-0"
                      } duration-1000`}
                    >
                      {e.describtion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Road Map For Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:hidden px-4 sm:px-0">
            {whatRoad.map((e) => (
              <div
                key={e.key}
                className="flex flex-col items-center justify-start gap-4 sm:gap-5 mb-6"
              >
                <div
                  className={`w-12 h-12 rounded-full border-2 border-primaryColorBlue text-primaryColorBlue 
                  flex items-center justify-center font-bold bg-[#F0FDFA] ${
                    !isMeduim && e.postionId
                  } 
                  hover:cursor-pointer hover:bg-auxiliaryColorOrange hover:border-auxiliaryColorOrange hover:text-auxiliaryColorWhite 
                  hover:shadow-[0_4px_6px_-4px_rgba(249,115,22,0.30),0_10px_15px_-3px_rgba(249,115,22,0.30)] duration-500 hover:scale-95`}
                  onMouseEnter={() => {
                    setNumber(e.key);
                  }}
                  onMouseLeave={() => {
                    setNumber(0);
                  }}
                >
                  {e.key}
                </div>

                <div
                  className={`text-center w-full max-w-[320px] gap-2 flex flex-col ${
                    !isMeduim && e.postion
                  }`}
                >
                  <h1 className="font-bold text-[18px]">{e.title}</h1>
                  <p
                    className={`w-full leading-relaxed text-pretty ${
                      e.key === nummber ? "" : "opacity-0"
                    } duration-1000`}
                  >
                    {e.describtion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RoadToSing;
