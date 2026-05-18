"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

export default function HeaderSearch({ role }) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const placeholder =
    role === "JobSeeker"
      ? "إبحث عن وظيفة ..."
      : role === "Employer"
        ? "إبحث عن موظف ..."
        : "إبحث عن مستخدم ...";

  const targetPath =
    role === "JobSeeker"
      ? "/dashBoard/search-job"
      : role === "Employer"
        ? "/dashBoard/search-employee"
        : "/dashBoard/User-Management";

  function handleSearch() {
    const q = search.trim();
    router.push(`${targetPath}?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="flex items-center justify-between gap-4 w-xl h-12 bg-[#FAFAFA] rounded-full">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        className="w-full h-full rounded-full outline-none p-6"
        placeholder={placeholder}
      />

      <button
        type="button"
        onClick={handleSearch}
        className="p-2 bg-primaryColorBlue text-auxiliaryColorWhite rounded-full items-center flex justify-center hover:cursor-pointer ml-4"
      >
        <FiSearch size={20} className="rotate-100" />
      </button>
    </div>
  );
}
