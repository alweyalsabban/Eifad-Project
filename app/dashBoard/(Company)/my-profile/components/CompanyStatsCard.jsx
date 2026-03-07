import { FiUsers, FiCalendar, FiBriefcase } from "react-icons/fi";

const stats = [
  {
    id: 1,
    label: "عدد الموظفين",
    value: "100-500",
    icon: FiUsers,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    label: "سنة التأسيس",
    value: "2010",
    icon: FiCalendar,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: 3,
    label: "الصناعة",
    value: "التقنية",
    icon: FiBriefcase,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
];

export default function CompanyStatsCard() {
  return (
    <div className="rounded-2xl mt-5 border max-w-sm border-slate-200 bg-white p-4">
      <h3 className="mb-4  text-[15px] font-extrabold text-slate-900">
        إحصائيات الشركة
      </h3>

      <div className="space-y-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3"
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.iconBg}`}
              >
                <Icon className={`text-[16px] ${item.iconColor}`} />
              </div>

              <div className="flex-1 text-right">
                <p className="text-[11px] text-slate-400">{item.label}</p>
                <p className="text-[16px] font-extrabold leading-tight text-slate-900">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
