"use client";
import { useState } from "react";
import FilterInput from "./FilterInput";
import AdsJob from "./AdsJob";
import DeatilsAdJobs from "./DeatilsAdJobs";
import { jobAds } from "../info";

function ResultSearchSection() {
  const [isFilter, setFilter] = useState(false);
  return (
    <div className="cusContaner m-auto my-10 " dir="rtl">
      <div>
        <button
          className={`border border-secondColorBlack px-3 py-2 rounded-xl hover:cursor-pointer ${isFilter && "bg-blue-100"} hover:bg-blue-100`}
          onClick={() => {
            setFilter(!isFilter);
          }}
        >
          فلاتر متقدمة
          {isFilter && <span className="pr-4">X</span>}
        </button>
        {isFilter && (
          <div className="border border-auxiliaryColorGray my-4 px-10 py-4 rounded-xl flex gap-2 items-center justify-center">
            <FilterInput
              lableName="نوع الدوام"
              optionsNames={["حضوري", "عن بعد", "هجين"]}
            />
            <FilterInput
              lableName="مستوى الخبرة"
              optionsNames={["مبتدئ", "متوسط", "خبير"]}
            />
            <FilterInput
              lableName="المجال"
              optionsNames={["تقنية", "موارد بشرية", "صحة"]}
            />
            <FilterInput
              lableName="تاريخ النشر"
              optionsNames={["اليوم", "خلال الاسبوع", "خلال الشهر"]}
            />
          </div>
        )}
        <h1 className="font-bold text-l mt-4">تم العثور على 12 وظيفة</h1>
      </div>
      {/* Result Section */}
      <div className="flex gap-2">
        <div className="w-[35%] mt-5 flex flex-col gap-2 h-200 overflow-y-auto px-3">
          <AdsJob jobAds={jobAds} />
        </div>
        <div className=" w-[65%]">
          <DeatilsAdJobs jobAds={jobAds} />
        </div>
      </div>
    </div>
  );
}

export default ResultSearchSection;
