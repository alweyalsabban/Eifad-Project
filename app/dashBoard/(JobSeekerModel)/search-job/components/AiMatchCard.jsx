"use client";

import { SparklesIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function AiMatchCard({ score = 92, reasons = [] }) {
  const clamped = Math.max(0, Math.min(100, score));

  return (
    <section className="w-full rounded-2xl bg-linear-to-r from-green-500 to-emerald-600 p-6 text-white mt-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-6 w-6" />
          <h3 className="text-lg font-semibold">
            تحليل المطابقة بالذكاء الاصطناعي
          </h3>
        </div>
      </div>
      {/* Score */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/90">نسبة المطابقة</span>
        <div className="text-3xl font-bold">{clamped}%</div>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-3 w-full rounded-full bg-white/25">
        <div
          className="h-3 rounded-full bg-white"
          style={{ width: `${clamped}%` }}
        />
      </div>

      {/* Reasons */}
      <div className="mt-6 text-right">
        <h4 className="mb-3 font-semibold">أسباب المطابقة العالية:</h4>

        <ul className="space-y-2">
          {reasons.map((r, i) => (
            <li key={i} className="flex items-center  gap-2 text-sm">
              <CheckCircleIcon className="h-5 w-5" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
