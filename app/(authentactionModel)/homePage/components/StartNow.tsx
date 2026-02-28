import React from "react";
import Image from "next/image";
import Link from "next/link";

function StartNow() {
  return (
    <>
      <div className="bg-auxiliaryColorWhite" dir="rtl">
        <div className="cusContaner m-auto flex items-center justify-center px-4 sm:px-6 py-10 animate-fade-up">
          <div
            className="w-full p-10 rounded-4xl bg-primaryColorBlue 
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
              خطوتك التالية تبدأ من هنا
            </h1>

            <p className="text-base sm:text-[20px] text-center text-auxiliaryColorGray max-w-175 leading-relaxed">
              سواء كنت تسعى لبناء مستقبلك المهني أو تبحث عن الكفاءات المناسبة
              لشركتك، توفر لك إيفاد بيئة رقمية متكاملة تجعل عملية التوظيف أكثر
              تنظيمًا وسهولة.
            </p>

            <Link
              href="./register"
              className="w-full sm:w-80 h-14 sm:h-18 bg-auxiliaryColorWhite rounded-2xl flex items-center justify-center 
              text-primaryColorBlue font-bold text-lg hover:scale-110 duration-500 text-center"
            >
              سجل مجانا الآن
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartNow;
