"use client";
import { FiSearch } from "react-icons/fi";

export default function CandidateTab({ tabs, active, setActive }) {
  return (
    <div
      className="font-medium  px-3 py-4 md:space-y-7 space-y-5 mt-5 
      w-full border border-slate-200 rounded-2xl"
    >
      <div className="relative flex-1">
        <FiSearch className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[20px] text-slate-400" />
        <input
          type="text"
          placeholder="ابحث عن وظيفة..."
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pr-12 pl-4 text-[16px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500"
        />
      </div>
      <div className="flex justify-between ">
        <div className="space-x-6">
          {tabs.map((tab) => (
            /*  className="rounded-2xl px-4 py-2 bg-blue-100  text-blue-600" */
            <button
              key={tab.id}
              onClick={() => {
                setActive(tab.id);
              }}
              type="button"
              className={`hover:cursor-pointer ${active === tab.id ? "rounded-2xl px-4 py-2 bg-blue-100  text-blue-600" : "text-slate-500 transition hover:text-slate-700"}`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <button
          className="rounded-xl bg-blue-600 px-8 py-3 text-white font-semibold
        hover:bg-blue-700 transition hover:cursor-pointer"
        >
          ترشيح الوظيفة بـ AI
        </button>
      </div>
    </div>
  );
}
