"use client";

import { FiChevronDown, FiSearch } from "react-icons/fi";

export default function SearchCompany({
  search,
  status,
  onSearchChange,
  onStatusChange,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl p-4 md:flex-row md:items-center">
      <div className="relative w-full md:flex-1">
        <FiSearch className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="بحث عن شركة ..."
          className="h-12 w-full rounded-xl border border-transparent bg-[#f7f7f8] pr-12 pl-4 text-right outline-none transition placeholder:text-gray-400 focus:border-gray-300"
        />
      </div>

      <div className="relative w-full md:w-56">
        <select
          value={status}
          onChange={(e) => onStatusChange?.(e.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-transparent bg-[#f7f7f8] px-4 text-right outline-none transition focus:border-gray-300"
        >
          <option value="">الكل</option>
          <option value="Unverified">غير موثوق</option>
          <option value="Rejected">مرفوض</option>
          <option value="Verified">موثق</option>
          <option value="Pending">قيد الانتظار</option>
        </select>

        <FiChevronDown className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}
