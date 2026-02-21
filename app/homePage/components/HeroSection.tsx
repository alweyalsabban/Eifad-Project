"use client";
import Image from "next/image";
import { statistc } from "../info";
import Link from "next/link";

function HeroSection() {
  return (
    <section dir="rtl" className="bg-[#F0FDFA]">
      <div className="cusContaner m-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 px-4 sm:px-6 lg:px-12 py-10 sm:py-12">
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 ">
          <h1 className="text-[181%] sm:text-[244%] lg:text-[275%] font-bold leading-[1.7] ">
            و ظيفتك القادمة، وموظفك المثــالـي
            <span> </span>
            <span className="bg-linear-to-l from-[#00B8B8] to-[#0E5A5D] bg-clip-text text-transparent">
              فــي مـكـان واحــد
            </span>
          </h1>

          <p className="leading-8 sm:leading-9 text-justify text-base sm:text-[16px]">
            إيفاد هي منصة توظيف ذكية تجمع الباحثين عن عمل وأصحاب الشركات ضمن
            بيئة رقمية موحدة، وتعتمد على تقنيات الذكاء الاصطناعي لتحليل السير
            الذاتية، تقييم المهارات، وتقديم مطابقة دقيقة بين المتقدمين وفرص
            العمل، مما يساهم في تسريع التوظيف ورفع كفاءة اتخاذ القرار لكلا
            الطرفين.
          </p>

          <div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-stretch sm:items-center justify-center sm:justify-start font-bold">
              <Link
                href="/register"
                onClick={() => sessionStorage.setItem("LinkFrom", "jobSeeker")}
                className="bg-primaryColorBlue rounded-lg drop-shadow-2xl drop-shadow-[#134E4A33] text-auxiliaryColorWhite px-8 sm:px-10 py-3.5 sm:py-4 hover:scale-110 duration-500 text-center"
              >
                ابدأ كباحث عن عمل
              </Link>
              <Link
                href="/register"
                onClick={() => sessionStorage.setItem("LinkFrom", "company")}
                className="border text-secondColorBlack rounded-lg border-secondColorBlack px-8 sm:px-10 py-3.5 sm:py-4 hover:scale-110 duration-500 text-center"
              >
                ابدأ كشركة
              </Link>
            </div>
          </div>
        </div>

        <div className="grid justify-center items-start gap-4">
          <Image
            src="/assets/bg.png"
            alt="bg"
            width={490}
            height={300}
            className="mb-1 sm:mb-3 rounded-3xl w-full max-w-130 h-auto"
            priority
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4 w-full max-w-130 m-auto">
            {statistc.map((e) => (
              <div
                key={e.key}
                className="bg-auxiliaryColorWhite rounded-xl border border-auxiliaryColorGray drop-shadow-sm
                  flex flex-col gap-2 pr-4 pt-3 w-full min-h-22.5"
              >
                <h1 className="text-[#64748B] text-sm sm:text-base">
                  {e.name}
                </h1>
                <h1 className="font-bold text-[22px] sm:text-[24px] text-primaryColorBlue">
                  {e.number}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
