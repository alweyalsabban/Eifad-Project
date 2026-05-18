"use client";

import {
  MagnifyingGlassIcon,
  FunnelIcon,
  MapPinIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { PiBag } from "react-icons/pi";

import { useState } from "react";

export default function PageSearch({ onSearch, params, setParams }) {
  const handleSearch = () => {
    onSearch?.({ keyword, location });
  };

  return (
    <section className="w-full rounded-2xl border border-secondGray bg-white p-5 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-[auto_20%_20%] gap-4">
        {/* Keyword */}
        <div className="relative">
          <BriefcaseIcon className="absolute right-3 top-3 h-5 w-5 text-slate-400" />
          <input
            value={params.name}
            onChange={(e) => setParams({ ...params, name: e.target.value })}
            placeholder="اسم الشركة"
            className="h-12 w-full rounded-xl border border-secondGray pr-10 pl-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <PiBag className="absolute right-3 top-3 h-5 w-5 text-slate-400" />
          <input
            value={params.field}
            onChange={(e) => setParams({ ...params, field: e.target.value })}
            placeholder="مجال العمل"
            className="h-12 w-full rounded-xl border border-secondGray pr-10 pl-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <MapPinIcon className="absolute right-3 top-3 h-5 w-5 text-slate-400" />
          <input
            value={params.location}
            onChange={(e) => setParams({ ...params, location: e.target.value })}
            placeholder="الموقع"
            className="h-12 w-full rounded-xl border border-secondGray pr-10 pl-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </section>
  );
}
