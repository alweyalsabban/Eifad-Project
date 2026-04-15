import { BriefcaseBusiness, Check, Users } from "lucide-react";
import StatCard from "./StatCard";

export default function StatsGrid() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <StatCard
        title="متوسط درجة المطابقة"
        value="78%"
        change="2% أقل من الشهر الماضي"
        trend="down"
        icon={<BriefcaseBusiness size={28} />}
        iconBgClass="bg-violet-50"
        iconClassName="text-violet-400"
      />

      <StatCard
        title="معدل القبول"
        value="65%"
        change="5% أعلى من الشهر الماضي"
        trend="up"
        icon={<Check size={28} />}
        iconBgClass="bg-emerald-50"
        iconClassName="text-emerald-500"
      />

      <StatCard
        title="التطبيقات الشهرية"
        value="3,200"
        change="14% أعلى من الشهر الماضي"
        trend="up"
        icon={<Users size={28} />}
        iconBgClass="bg-blue-50"
        iconClassName="text-blue-300"
      />
    </div>
  );
}
