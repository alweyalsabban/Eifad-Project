import React from "react";

export default function ProfileStatsCard({ views, contacts, rating }) {
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-auxiliaryColorWhite p-6">
      <h3 className="text-lg font-bold text-secondColorBlack">
        إحصائيات الملف
      </h3>

      <div className="mt-6 grid grid-cols-2 gap-y-6">
        <h1 className="text-right text-secondColorBlack">المشاهدات</h1>
        <h1 className="text-left text-2xl font-bold text-secondColorBlack">
          {views}
        </h1>

        <h1 className="text-right text-secondColorBlack">الاتصالات</h1>
        <h1 className="text-left text-2xl font-bold text-secondColorBlack">
          {contacts}
        </h1>

        <h1>التقييم</h1>
        <h1 className="text-left text-2xl font-bold text-secondColorBlack">
          {rating}
        </h1>
      </div>
    </section>
  );
}
