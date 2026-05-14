"use client";

import { FiChevronDown, FiSearch } from "react-icons/fi";

export default function SearchJobs({
  search,
  status,
  onSearchChange,
  onStatusChange,
  allCompany,
  companyId,
  setCompanyId,
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
            placeholder="ابحث عن وظيفة..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-[#f7f7f8] pr-10 pl-4 text-right text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:bg-white"
          />
        </div>
      </div>

      {/* ── الشركة ── */}
      <div className="flex flex-col gap-1.5 w-full md:w-56">
        <label className="text-xs font-semibold text-gray-500 px-1">
          الشركة
        </label>
        <div className="relative">
          <select
            value={companyId ?? ""}
            onChange={(e) => setCompanyId?.(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-[#f7f7f8] px-4 text-right text-sm outline-none transition focus:border-blue-400 focus:bg-white"
          >
            <option value="">كل الشركات</option>
            {allCompany?.map((item, index) => (
              <option key={index} value={item.CompanyID}>
                {item.CompanyName || "غير معروفه"}
              </option>
            ))}
          </select>
          <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* ── الحالة ── */}
      <div className="flex flex-col gap-1.5 w-full md:w-44">
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
            <option value="Active">فعال</option>
            <option value="Closed">مغلق</option>
            <option value="Draft">مسودة</option>
            <option value="Deleted">محذوف</option>
          </select>
          <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

