"use client";

import { IoSparklesOutline } from "react-icons/io5";

export default function SmartRecommendationsBanner({ jobs = 23 }) {
  return (
    <section className="w-full rounded-2xl bg-linear-to-r from-green-500 to-emerald-600 p-5 text-white mt-5">
      <div className="flex items-center justify-between">
        {/* text */}
        <div className="text-right">
          <h3 className="text-lg font-semibold">
            توصيات ذكية من الذكاء الاصطناعي
          </h3>

          <p className="mt-1 text-sm text-white/90">
            وجدنا {jobs} وظيفة تتناسب مع مهاراتك وخبراتك
          </p>
        </div>

        {/* icon */}
        <IoSparklesOutline className="h-7 w-7 text-white" />
      </div>
    </section>
  );
}
