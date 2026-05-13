"use client";

import { useEffect, useState } from "react";
import TitlePage from "./components/TitlePage";
import InfoCard from "./components/InfoCard";
import AleartCard from "./components/AleartCard";
import RecentActivities from "./components/RecentActivities";
import QuickActions from "./components/QuickActions";
import { ApiFetchServer } from "@/app/lib/ApiFetchServer";

import { HiOutlineDocumentText } from "react-icons/hi2";
import { FiBriefcase } from "react-icons/fi";
import { LuBuilding2, LuUsers } from "react-icons/lu";
import {
  RiBrainLine,
  RiMedalLine,
  RiErrorWarningLine,
  RiBuildingLine,
  RiAwardLine,
  RiUserSettingsLine,
} from "react-icons/ri";
import { useRouter } from "next/navigation";

/* ── نوع بيانات الـ API ── */
interface Stats {
  total_job_seekers: { count: number; growth_percentage: number };
  total_companies: { count: number; growth_percentage: number };
  active_job_ads: { count: number; growth_percentage: number };
  total_applications: { count: number; growth_percentage: number };
  pending_company_verifications: number;
  pending_certificate_reviews: number;
  ai_alerts_count: number;
}

function growthLabel(pct: number) {
  if (pct === 0) return "لا تغيير";
  return `${pct > 0 ? "+" : ""}${pct}% من الشهر الماضي`;
}

export default function ControllPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const res = await ApiFetchServer("/admin/users/statistics");
      if (res.isSusses) {
        setStats(res.dataResponse.data);
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  /* ── بطاقات الإحصائيات ── */
  const infoCards = stats
    ? [
        {
          id: 1,
          title: "إجمالي الباحثين عن عمل",
          value: stats.total_job_seekers.count.toLocaleString("en-US"),
          description: growthLabel(stats.total_job_seekers.growth_percentage),
          icon: LuUsers,
          iconBg: "#2563eb",
          growth: stats.total_job_seekers.growth_percentage,
        },
        {
          id: 2,
          title: "إجمالي الشركات",
          value: stats.total_companies.count.toLocaleString("en-US"),
          description: growthLabel(stats.total_companies.growth_percentage),
          icon: LuBuilding2,
          iconBg: "#16a34a",
          growth: stats.total_companies.growth_percentage,
        },
        {
          id: 3,
          title: "الإعلانات النشطة",
          value: stats.active_job_ads.count.toLocaleString("en-US"),
          description: growthLabel(stats.active_job_ads.growth_percentage),
          icon: FiBriefcase,
          iconBg: "#9333ea",
          growth: stats.active_job_ads.growth_percentage,
        },
        {
          id: 4,
          title: "إجمالي التطبيقات",
          value: stats.total_applications.count.toLocaleString("en-US"),
          description: growthLabel(stats.total_applications.growth_percentage),
          icon: HiOutlineDocumentText,
          iconBg: "#ff5c00",
          growth: stats.total_applications.growth_percentage,
        },
      ]
    : [];

  /* ── بطاقات التنبيهات ── */
  const alertCards = stats
    ? [
        {
          id: 1,
          title: "تنبيهات الذكاء الاصطناعي",
          value: stats.ai_alerts_count,
          icon: RiBrainLine,
          borderColor: "border-red-500",
          iconColor: "text-red-500",
        },
        {
          id: 2,
          title: "مراجعات الشهادات المعلقة",
          value: stats.pending_certificate_reviews,
          icon: RiMedalLine,
          borderColor: "border-orange-500",
          iconColor: "text-orange-500",
        },
        {
          id: 3,
          title: "التحقق من الشركات المعلقة",
          value: stats.pending_company_verifications,
          icon: RiErrorWarningLine,
          borderColor: "border-yellow-500",
          iconColor: "text-yellow-500",
        },
      ]
    : [];

  /* ── الإجراءات السريعة ── */
  const quickActionsData = [
    {
      id: 1,
      title: "التحقق من شركة",
      icon: RiBuildingLine,
      onClick: () => router.push("/dashBoard/Company-verification"),
    },
    {
      id: 2,
      title: "مراجعة الشهادات",
      icon: RiAwardLine,
      onClick: () => router.push("/dashBoard/Certificate-verification"),
    },
    {
      id: 3,
      title: "إدارة المستخدمين",
      icon: RiUserSettingsLine,
      onClick: () => router.push("/dashBoard/User-Management"),
    },
  ];

  /* ── آخر الأنشطة ── */
  const activitiesData = stats
    ? [
        {
          id: 1,
          title: `${stats.pending_company_verifications} شركة بانتظار التحقق`,
          time: "الآن",
        },
        {
          id: 2,
          title: `${stats.pending_certificate_reviews} شهادة بانتظار المراجعة`,
          time: "الآن",
        },
        {
          id: 3,
          title: `${stats.ai_alerts_count} تنبيه من الذكاء الاصطناعي`,
          time: "الآن",
        },
        {
          id: 4,
          title: `${stats.active_job_ads.count} إعلان وظيفي نشط`,
          time: "الآن",
        },
        {
          id: 5,
          title: `${stats.total_applications.count} طلب توظيف إجمالي`,
          time: "الآن",
        },
      ]
    : [];

  return (
    <div className="mb-50">
      <TitlePage title="لوحة التحكم" number={1} />

      {/* ── Loader ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-slate-500 text-sm">جارٍ تحميل الإحصائيات…</p>
        </div>
      ) : (
        <>
          {/* ── InfoCards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-[98%] justify-between m-auto mt-5">
            {infoCards.map((item) => (
              <InfoCard
                key={item.id}
                title={item.title}
                value={item.value}
                description={item.description}
                icon={item.icon}
                iconBg={item.iconBg}
                growth={item.growth}
              />
            ))}
          </div>

          {/* ── AleartCards ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-[98%] justify-between m-auto mt-5">
            {alertCards.map((item) => (
              <AleartCard
                key={item.id}
                title={item.title}
                value={item.value}
                icon={item.icon}
                borderColor={item.borderColor}
                iconColor={item.iconColor}
              />
            ))}
          </div>

          {/* ── RecentActivities + QuickActions ── */}
          <div className="p-2 mt-5 grid grid-cols-1 md:grid-cols-[auto_40%] gap-5">
            <RecentActivities activities={activitiesData} />
            <QuickActions actions={quickActionsData} />
          </div>
        </>
      )}
    </div>
  );
}
