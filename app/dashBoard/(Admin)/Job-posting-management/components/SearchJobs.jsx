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
    <div className="flex flex-col gap-4 rounded-2xl p-4 md:flex-row md:items-center">
      <div className="relative w-full md:flex-1">
        <FiSearch className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="بحث عن وظيفة..."
          className="h-12 w-full rounded-xl border border-transparent bg-[#f7f7f8] pr-12 pl-4 text-right outline-none transition placeholder:text-gray-400 focus:border-gray-300"
        />
      </div>
      <div className="relative w-full md:w-56">
        <select
          value={companyId}
          onChange={(e) => setCompanyId?.(e.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-transparent bg-[#f7f7f8] px-4 text-right outline-none transition focus:border-gray-300"
        >
          <option value="">كل الشركات</option>
          {allCompany?.map((item, index) => (
            <option key={index} value={item.CompanyID}>
              {item.CompanyName}
            </option>
          ))}
        </select>

        <FiChevronDown className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      <div className="relative w-full md:w-56">
        <select
          value={status}
          onChange={(e) => onStatusChange?.(e.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-transparent bg-[#f7f7f8] px-4 text-right outline-none transition focus:border-gray-300"
        >
          <option value="">الكل</option>
          <option value="Active">فعال</option>
          <option value="Closed">مغلق</option>
          <option value="Draft">مسودة</option>
          <option value="Deleted">محذوف</option>
        </select>

        <FiChevronDown className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}
