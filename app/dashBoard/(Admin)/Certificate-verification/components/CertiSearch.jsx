"use client";

import { FiChevronDown, FiSearch } from "react-icons/fi";

export default function CertiSearch({
  search,
  status,
  onSearchChange,
  onStatusChange,
}) {
  return (
    <div
      className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:flex-row md:items-end"
      dir="rtl"
    >
      {/* ── البحث ── */}
      <div className="flex flex-col gap-1.5 w-full md:flex-1">
        <label className="text-xs font-semibold text-gray-500 px-1">
          البحث
        </label>
        <div className="relative">
          <FiSearch className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
          <input
            type="text"
            value={search ?? ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="ابحث عن شركة..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-[#f7f7f8] pr-10 pl-4 text-right text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:bg-white"
          />
        </div>
      </div>

      {/* ── الحالة ── */}
      <div className="flex flex-col gap-1.5 w-full md:w-48">
        <label className="text-xs font-semibold text-gray-500 px-1">
          الحالة
        </label>
        <div className="relative">
          <select
            value={status ?? ""}
            onChange={(e) => onStatusChange?.(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-[#f7f7f8] px-4 text-right text-sm outline-none transition focus:border-blue-400 focus:bg-white"
          >
            <option value="">الكل</option>
            <option value="pending">قيد الإنتظار</option>
            <option value="ai_reviewed">تم المراجعة بـ AI</option>
            <option value="verified">موثوق</option>
            <option value="rejected">غير موثوق</option>
          </select>
          <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
