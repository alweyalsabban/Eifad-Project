/* import React from "react";
import Image from "next/image";

function StartNow() {
  return (
    <>
      <div className="bg-auxiliaryColorWhite" dir="rtl">
        <div className="cusContaner m-auto scale-80 md:scale-90 flex items-center justify-center">
          <div
            className="w-308 h-108 rounded-[48px] bg-primaryColorBlue  flex 
          flex-col justify-center items-center gap-13 "
          >
            <Image
              src="/assets/Vector.svg"
              alt="bg"
              width={1232}
              height={324}
              className="absolute opacity-5 pointer-events-none select-none"
            />
            <h1 className="text-auxiliaryColorWhite text-4xl font-bold text-center">
              ابدأ رحلتك المهنية اليوم
            </h1>
            <p className="text-[20px] text-center text-auxiliaryColorGray">
              انضم إلى آلاف المحترفين والشركات الذين اختاروا إيفاد كشريك
              لنجاحهم.
            </p>
            <a
              href="./regestier"
              className="w-80 h-18 bg-auxiliaryColorWhite rounded-2xl flex items-center justify-center text-primaryColorBlue font-bold hover:scale-110 duration-500"
            >
              سجل مجانا الآن
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartNow;
 */

import React from "react";
import Image from "next/image";

function StartNow() {
  return (
    <>
      <div className="bg-auxiliaryColorWhite" dir="rtl">
        <div className="cusContaner m-auto flex items-center justify-center px-4 sm:px-6 py-10">
          <div
            className="w-full max-w-275min-h-[320px] sm:min-h-95 rounded-4xl sm:rounded-[48px] bg-primaryColorBlue 
            flex flex-col justify-center items-center gap-6 sm:gap-10 relative overflow-hidden px-6 sm:px-10"
          >
            <Image
              src="/assets/Vector.svg"
              alt="bg"
              width={1232}
              height={324}
              className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none select-none"
            />

            <h1 className="text-auxiliaryColorWhite text-2xl sm:text-4xl font-bold text-center leading-relaxed">
              ابدأ رحلتك المهنية اليوم
            </h1>

            <p className="text-base sm:text-[20px] text-center text-auxiliaryColorGray max-w-175 leading-relaxed">
              انضم إلى آلاف المحترفين والشركات الذين اختاروا إيفاد كشريك
              لنجاحهم.
            </p>

            <a
              href="./regestier"
              className="w-full sm:w-80 h-14 sm:h-18 bg-auxiliaryColorWhite rounded-2xl flex items-center justify-center 
              text-primaryColorBlue font-bold text-lg hover:scale-110 duration-500 text-center"
            >
              سجل مجانا الآن
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartNow;
