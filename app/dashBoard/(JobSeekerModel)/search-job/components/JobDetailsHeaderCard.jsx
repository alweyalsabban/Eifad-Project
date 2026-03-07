"use client";

import React from "react";
import {
  HeartIcon,
  ShareIcon,
  MapPinIcon,
  BriefcaseIcon,
  ClockIcon,
  UserIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function JobDetailsHeaderCard({
  title = "مهندس برمجيات أول",
  company = "جوجل المملكة العربية السعودية",
  location = "الرياض، المملكة العربية السعودية",
  mode = "Hybrid",
  workType = "دوام كامل",
  postedAgo = "2 days ago",
  applicants = 28,
  salaryFrom = "25,000",
  salaryTo = "35,000",
  currency = "ريال",
  onApplyNow,
  onAutoApply,
  onToggleSave,
  onShare,
  saved = false,
}) {
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 mt-5">
      {/* Top row */}
      <div className="flex items-start justify-between gap-6">
        {/* Left icons */}
        <div className="flex items-center gap-4 text-slate-500">
          <button
            type="button"
            onClick={onToggleSave}
            className="hover:text-red-500"
            aria-label="حفظ"
            title="حفظ"
          >
            <HeartIcon className={`h-6 w-6 ${saved ? "text-red-500" : ""}`} />
          </button>

          <button
            type="button"
            onClick={onShare}
            className="hover:text-slate-700"
            aria-label="مشاركة"
            title="مشاركة"
          >
            <ShareIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Right content + logo */}
        <div className="flex flex-1 items-start justify-between gap-4">
          {/* Text */}
          <div className="text-right">
            <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
            <p className="mt-1 text-sm text-slate-600">{company}</p>

            {/* Meta row 1 */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1">
                <MapPinIcon className="h-4 w-4" />
                {location}
              </span>

              <span className="text-slate-300">•</span>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600">
                {mode}
              </span>

              <span className="text-slate-300">•</span>

              <span className="inline-flex items-center gap-1">
                <BriefcaseIcon className="h-4 w-4" />
                {workType}
              </span>
            </div>

            {/* Meta row 2 */}
            <div className="mt-4 flex flex-wrap items-center  gap-6 text-sm">
              <span className="inline-flex items-center gap-2 text-slate-500">
                <ClockIcon className="h-4 w-4" />
                {postedAgo}
              </span>

              <span className="inline-flex items-center gap-2 text-slate-500">
                <UserIcon className="h-4 w-4" />
                {applicants} متقدم
              </span>

              <span className="inline-flex items-center gap-2 font-semibold text-green-600">
                <span className="text-green-600">$</span>
                {salaryTo} - {salaryFrom} {currency}
              </span>
            </div>
          </div>

          {/* Logo */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white text-lg font-bold">
            G
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 h-px w-full bg-slate-200" />

      {/* Buttons */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Apply Now */}
        <button
          type="button"
          onClick={onApplyNow}
          className="h-12 w-full rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700"
        >
          تقديم الآن
        </button>

        {/* Auto Apply */}
        <button
          type="button"
          onClick={onAutoApply}
          className="h-12 w-full rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 inline-flex items-center justify-center gap-2"
        >
          <SparklesIcon className="h-5 w-5" />
          تقديم تلقائي
        </button>
      </div>
    </section>
  );
}
