"use client";
import { useState } from "react";

type FeatcherAIProps = {
  isEmployee: boolean;
};

import { RoadToSingForEmployee, RoadToSingForCompany } from "../info";

function RoadToSing({ isEmployee }: FeatcherAIProps) {
  const [nummber, setNumber] = useState(0);
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
              ابدأ باستخدام منصة إيفاد في ثلاث خطوات بسيطة
            </p>
          </div>

          {/* Road Map to sing in */}

          <div className="grid grid-cols-1 sm:grid-cols-3">
            {whatRoad.map((e) => (
              <div
                key={e.key}
                className=" flex flex-col gap-2 justify-center items-center"
              >
                <div
                  className={`w-12 h-12 rounded-full border-2 border-primaryColorBlue text-primaryColorBlue 
                    flex items-center justify-center font-bold bg-[#F0FDFA] hover:cursor-pointer hover:bg-auxiliaryColorOrange hover:border-auxiliaryColorOrange hover:text-auxiliaryColorWhite 
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

                <div className={`text-center w-53 gap-2 flex flex-col `}>
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
      </div>
    </>
  );
}

export default RoadToSing;
