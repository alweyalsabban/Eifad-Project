"use client";

import {
  MagnifyingGlassIcon,
  FunnelIcon,
  MapPinIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function JobSearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    onSearch?.({ keyword, location });
  };

  return (
    <section
      dir="rtl"
      className="w-full rounded-2xl border border-secondGray bg-white p-5 mt-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-[auto_20%] gap-4">
        {/* Keyword */}
        <div className="relative">
          <BriefcaseIcon className="absolute right-3 top-3 h-5 w-5 text-slate-400" />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="المسمى الوظيفي أو الكلمات المفتاحية"
            className="h-12 w-full rounded-xl border border-secondGray pr-10 pl-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div className="relative">
          <MapPinIcon className="absolute right-3 top-3 h-5 w-5 text-slate-400" />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="الموقع"
            className="h-12 w-full rounded-xl border border-secondGray pr-10 pl-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        {/* Search */}
        <button
          onClick={handleSearch}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl
           bg-blue-600 text-white h-12 hover:bg-blue-700 transition hover:cursor-pointer "
        >
          <span>بحث</span>
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>

        {/* Filter */}
        <button
          className="flex items-center gap-2 rounded-xl border border-secondGray px-4 h-12 
        text-slate-700 hover:bg-slate-50 hover:cursor-pointer"
        >
          <span>تصفية</span>
          <FunnelIcon className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
