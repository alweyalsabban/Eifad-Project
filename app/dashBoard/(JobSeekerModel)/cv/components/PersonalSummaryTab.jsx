"use client";
import { useState } from "react";

function PersonalSummaryTab() {
  const [summary, setSummary] = useState("");
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 mt-5">
      <h3 className="text-right text-base font-semibold text-slate-900">
        الملخص الشخصي
      </h3>

      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="اكتب ملخصاً مهنياً عن نفسك..."
        className="mt-3 h-32 w-full resize-none rounded-2xl border border-slate-200 p-4 text-right text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default PersonalSummaryTab;
