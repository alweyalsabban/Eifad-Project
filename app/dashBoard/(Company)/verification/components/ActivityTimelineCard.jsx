import { FiCheckCircle } from "react-icons/fi";

export default function ActivityTimelineCard({
  title = "الجدول الزمني للأنشطة",
  activities = [],
}) {
  return (
    <div
      dir="rtl"
      className="rounded-[20px] border border-slate-200 bg-white px-4 py-5"
    >
      <h3 className="mb-5 text-right text-[18px] font-extrabold text-slate-900">
        {title}
      </h3>

      <div className="space-y-5">
        {activities.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-3">
            <FiCheckCircle className="mt-1 text-[20px] text-emerald-500" />

            <div className="flex-1 text-right">
              <h4 className="text-[15px] font-bold text-slate-900">
                {item.title}
              </h4>
              <p className="mt-1 text-[12px] text-slate-500">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
