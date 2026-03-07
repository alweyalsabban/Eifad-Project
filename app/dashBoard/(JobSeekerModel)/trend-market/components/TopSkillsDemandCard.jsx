// components/TopSkillsDemandCard.jsx
import React from "react";

export default function TopSkillsDemandCard({
  title = "المهارات الأكثر طلباً",
  /*  viewAllText = "عرض الكل",
  onViewAll, */
  items = [],
}) {
  return (
    <section
      dir="rtl"
      className="w-[98%] m-auto rounded-2xl border border-slate-200 bg-white p-6 mt-5 "
    >
      <header className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>

        {/*  {onViewAll ? (
          <button
            type="button"
            onClick={onViewAll}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            {viewAllText}
          </button>
        ) : (
          <span className="text-sm font-medium text-blue-600">
            {viewAllText}
          </span>
        )} */}
      </header>

      <div className="space-y-5">
        {items.map((item) => {
          const percent = Math.max(0, Math.min(100, item.percent));

          return (
            <div key={item.name} className="space-y-2">
              {/* العنوان */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  {item.name}
                </span>

                <span className="text-xs text-slate-500">{percent}% طلب</span>
              </div>

              {/* progress bar */}
              <div className="relative h-2 w-full rounded-full bg-slate-200">
                <div
                  className="absolute inset-y-0 right-0 rounded-full bg-blue-600"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
