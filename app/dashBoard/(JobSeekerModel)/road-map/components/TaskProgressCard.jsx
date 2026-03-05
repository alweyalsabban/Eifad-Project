"use client";

import { ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function TaskProgressCard({
  title = "تعلم معمارية السحابة",
  priority = "أولوية عالية",
  duration = "3 months",
  index = 1,
  progress = 60,
  onDetails,
}) {
  const clamped = Math.max(0, Math.min(100, Number(progress) || 0));

  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 mt-5">
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        {/* Right: title + meta + circle number */}
        <div className="flex flex-1 w-full  gap-4">
          {/* Number circle */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-sm font-semibold text-slate-900">
            {index}
          </div>

          <div className="text-right">
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>

            <div className="mt-2 flex items-center justify-end gap-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />
                {duration}
              </span>
              <span className="rounded-full bg-red-100 px-3 py-1 text-red-600">
                {priority}
              </span>
            </div>

            <div className="mt-2 text-xs text-slate-500">التقدم</div>
          </div>
        </div>
        {/* Left: Details button */}
        <Link href={"/dashBoard/road-map/detail-steps"}>
          <button
            type="button"
            onClick={onDetails}
            className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 hover:cursor-pointer"
          >
            تفاصيل
          </button>{" "}
        </Link>
      </div>

      {/* Progress */}
      <div className="mt-4 flex items-center gap-3">
        <span className="w-10 text-left text-xs font-semibold text-blue-600">
          {clamped}%
        </span>

        <div className="h-2 w-full rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-blue-600"
            style={{ width: `${clamped}%` }}
            role="progressbar"
            aria-valuenow={clamped}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </section>
  );
}
