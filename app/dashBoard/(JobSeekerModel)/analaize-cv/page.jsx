"use client";
import { useContext, useEffect } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import AiScoreCard from "./components/AiScoreCard";
import InsightListCard from "./components/InsightListCard";
import SkillGapCard from "./components/SkillGapCard";

function AnalaizeCv() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("تحليل السيرة الذاتية");
    setnumberOfSideBar(4);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return (
    <>
      <AiScoreCard score={82} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InsightListCard
          title="نقاط القوة"
          variant="success"
          items={[
            "مهارات تقنية قوية في React و Node.js",
            "خبرة تزيد عن 5 سنوات ذات صلة",
            "ملخص مهني واضح وموجز",
            "تاريخ عمل منظم بشكل جيد",
          ]}
        />
        <InsightListCard
          title="نقاط التحسين"
          variant="warning"
          items={[
            "قسم الشهادات مفقود",
            "لا توجد روابط للمشاريع",
            "قسم المهارات يحتاج المزيد من التفاصيل",
          ]}
        />
      </div>
      <SkillGapCard
        items={[
          { label: "Cloud Architecture", current: 60, target: 90 },
          { label: "Leadership", current: 40, target: 80 },
          { label: "System Design", current: 70, target: 95 },
        ]}
      />

      <button
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 text-white text-sm 
      font-medium hover:bg-blue-700 transition mt-5 mb-15 hover:cursor-pointer"
      >
        <span>تحميل تقرير التحليل (PDF)</span>
        <ArrowDownTrayIcon className="h-5 w-5" />
      </button>
    </>
  );
}

export default AnalaizeCv;
