"use client";

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { tabsCv } from "../CVData";

export default function CvTab() {
  const [activeTab, setActiveTab] = useState(tabsCv[0]);

  return (
    <div className="flex flex-wrap items-center mt-5 justify-center gap-6 border border-slate-200 rounded-2xl p-3 w-full m-auto">
      {tabsCv.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-xl text-sm transition hover:cursor-pointer
            ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:text-blue-600"
            }`}
        >
          {tab}
        </button>
      ))}

      <button className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white hover:cursor-pointer">
        <PlusIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
