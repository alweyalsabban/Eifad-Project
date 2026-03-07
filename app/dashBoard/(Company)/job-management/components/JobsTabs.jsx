"use client";
import { useState } from "react";

export default function JobsTabs({ setPostJob, tabs }) {
  const [active, setActive] = useState("all");
  return (
    <div className="flex flex-wrap text-l font-medium justify-between md:space-y-1 space-y-5">
      <div className="space-x-4">
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
        className="bg-primaryBlue text-auxiliaryColorWhite px-4 py-2 rounded-2xl 
      hover:cursor-pointer hover:bg-blue-800 duration-300"
        onClick={() => {
          setPostJob(true);
        }}
      >
        إضافة وظيفة جديدة
      </button>
    </div>
  );
}
