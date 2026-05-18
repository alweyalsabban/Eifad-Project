"use client";

import { FiSearch, FiMapPin } from "react-icons/fi";

export default function JobSearchBar({ filters, setFilters }) {
  function updateField(name, value) {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div
      dir="rtl"
      className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-4 mt-5 md:grid-cols-2"
    >
      <div className="relative">
        <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="المسمى الوظيفي أو المهارات"
          value={filters.search}
          onChange={(e) => updateField("search", e.target.value)}
          className="w-full rounded-xl border border-slate-200 py-3 pr-10 pl-4 outline-none focus:border-blue-500"
        />
      </div>

      <div className="relative">
        <FiMapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="الموقع"
          value={filters.location}
          onChange={(e) => updateField("location", e.target.value)}
          className="w-full rounded-xl border border-slate-200 py-3 pr-10 pl-4 outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
}
