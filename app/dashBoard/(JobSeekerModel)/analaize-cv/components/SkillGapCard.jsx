"use client";

import React from "react";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

function clamp(n) {
  const v = Number(n) || 0;
  return Math.max(0, Math.min(100, v));
}

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
        {items.map((it, idx) => {
          const current = clamp(it.current);
          const target = clamp(it.target);

          return (
            <div key={it.label + idx} className="space-y-2">
              {/* top row: label */}
              <div className="flex items-center justify-between">
                <div className="text-right text-sm text-slate-900">
                  {it.label}
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="text-slate-500">الحالي: {current}%</span>
                  <span className="text-blue-600">الهدف: {target}%</span>
                </div>
              </div>

              {/* bar */}
              <div className="relative h-2 w-full rounded-full bg-slate-100">
                {/* target (blue fill) */}
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: `${target}%` }}
                />

                {/* current marker (green line) */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
