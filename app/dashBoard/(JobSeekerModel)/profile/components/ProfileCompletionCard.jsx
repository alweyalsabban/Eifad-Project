import React from "react";

export default function ProfileCompletionCard({
  percent = 75,
  statusText = "مكتمل",
  hintText = "أكمل ملفك لزيادة فرص الظهور بنسبة %40",
}) {
  const clamped = Math.max(0, Math.min(100, Number(percent) || 0));

  return (
    <section className="w-full rounded-2xl bg-linear-to-b from-blue-500 to-blue-600 p-6 text-auxiliaryColorWhite">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold">اكتمال الملف</h3>
        <span className="text-xl font-bold">{clamped}%</span>
      </div>

      <h1 className="mt-4 text-sm opacity-90">{statusText}</h1>

      <div className="mt-4 h-3 w-full rounded-full bg-auxiliaryColorWhite/25">
        <div className={`h-3 rounded-full bg-white w-[${clamped}%] `} />
      </div>

      <p className="mt-4 text-sm opacity-90">{hintText}</p>
    </section>
  );
}
