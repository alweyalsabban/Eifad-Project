"use client";

import { useState } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";

export default function JobSearchBar() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    console.log({
      search,
      location,
    });
  };

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 mt-5">
      {/* job search */}
      <div className="relative flex-1">
        <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="المسمى الوظيفي أو المهارات"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 py-3 pr-10 pl-4 outline-none focus:border-blue-500"
        />
      </div>
      {/* location */}
      <div className="relative flex-1">
        <FiMapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="الموقع"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full rounded-xl border border-slate-200 py-3 pr-10 pl-4 outline-none focus:border-blue-500"
        />
      </div>

      {/* search button */}
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-10 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
      >
        بحث
      </button>
    </div>
  );
}
