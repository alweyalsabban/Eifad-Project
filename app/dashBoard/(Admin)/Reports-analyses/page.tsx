import ApplicationTrendsStackedChart from "./components/ApplicationTrendsStackedChart";
import HiringTrendsPieChart from "./components/HiringTrendsPieChart";
import MarketActivityChart from "./components/MarketActivityChart";
import ReportsStatsGrid from "./components/ReportsStatsGrid";
import TopSkillsBarChart from "./components/TopSkillsBarChart";

export default function ReportsAnalyticsPage() {
  return (
    <div className="min-h-screen  p-6" dir="rtl">
      <div className="space-y-6">
        <ReportsStatsGrid />

        <MarketActivityChart />

        <div className="grid gap-6 xl:grid-cols-2">
          <HiringTrendsPieChart />
          <TopSkillsBarChart />
        </div>

        <ApplicationTrendsStackedChart />
      </div>
    </div>
  );
}
