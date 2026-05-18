"use client";

export default function CandidateTab({ tabs = [], active, setActive }) {
  return (
    <div dir="rtl" className="mt-5 flex flex-wrap gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActive(tab.id)}
          className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
            active === tab.id
              ? "bg-blue-100 text-blue-700"
              : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
          }`}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  );
}
