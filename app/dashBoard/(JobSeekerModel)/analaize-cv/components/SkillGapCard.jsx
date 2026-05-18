"use client";

import React from "react";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

export default function SkillGapCard({
  title = "تحليل فجوة المهارات",
  items = [],
}) {
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 mt-5">
      <div className="flex items-center gap-5">
        <ArrowTrendingUpIcon className="h-5 w-5 text-blue-600" />
        <h3 className="text-right text-sm font-semibold text-slate-900">
          {title}
        </h3>
      </div>

      <div className="mt-4 space-y-5">
        {items.map((item, index) => {
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-900 leading-relaxed text-justify w-[90%]">
                  {item.ar}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
