"use client";

import React from "react";
import {
  HeartIcon,
  MapPinIcon,
  ClockIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function JobCard({
  match = 92,
  title = "مهندس برمجيات أول",
  company = "Google",
  location = "الرياض",
  workType = "دوام كامل",
  mode = "Hybrid",
  postedAgo = "2 days ago",
  salaryFrom = "25,000",
  salaryTo = "35,000",
  currency = "ريال",
  saved = false,
  onToggleSave,
  onDetails,
  onQuickApply,
}) {
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 mt-5">
      {/* Logo  */}
      <div className="flex justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
          G
        </div>

        {/* RIGHT: content + logo */}
        <div className="flex flex-wrap w-full justify-between gap-4  px-3">
          {/* Text */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{title}</h3>

            {/* company name under title (like image) */}
            <p className="mt-1 text-sm text-slate-600">{company}</p>

            {/* meta row */}
            <div className="mt-3 flex flex-wrap items-center  gap-3 text-sm text-slate-500 ">
              <span className="inline-flex items-center gap-1">
                <MapPinIcon className="h-4 w-4" />
                {location}
              </span>

              <span className="text-slate-300">•</span>

              <span className="inline-flex items-center gap-1">
                <BriefcaseIcon className="h-4 w-4" />
                {workType}
              </span>

              <span className="text-slate-300">•</span>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600">
                {mode}
              </span>
            </div>

            {/* second row: time + salary */}
            <div className="mt-3 flex items-center justify-end gap-6">
              {/* salary on the far right */}
              <div className="inline-flex items-center gap-2 text-green-600 font-semibold">
                <CurrencyDollarIcon className="h-5 w-5" />
                <span>
                  {salaryTo} - {salaryFrom} {currency}
                </span>
              </div>

              {/* time (a bit left) */}
              <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                <ClockIcon className="h-4 w-4" />
                <span>{postedAgo}</span>
              </div>
            </div>
          </div>

          {/* LEFT: heart + match */}
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={onToggleSave}
              className="text-slate-400 hover:text-red-500"
              aria-label="حفظ الوظيفة"
            >
              <HeartIcon className={`h-6 w-6 ${saved ? "text-red-500" : ""}`} />
            </button>

            <div className="inline-flex items-center gap-2 rounded-xl bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white text-xs">
                ◎
              </span>
              {match}%
            </div>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-4 mt-5">
        {/* big blue button */}
        <button
          type="button"
          onClick={onDetails}
          className="h-12 flex-1 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 hover:cursor-pointer"
        >
          <Link href={"/dashBoard/search-job/detailJob"}> عرض التفاصيل</Link>
        </button>

        {/* left small button */}
        <button
          type="button"
          onClick={onQuickApply}
          className="h-12 rounded-xl border border-green-500 px-8 text-green-600 font-medium hover:bg-green-50 hover:cursor-pointer"
        >
          تقديم سريع
        </button>
      </div>
    </section>
  );
}
