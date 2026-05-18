import TitlePage from "../controll/components/TitlePage";
import AcceptanceChart from "./components/AcceptanceChart";
import ApplicationsChart from "./components/ApplicationsChart";
import StatsGrid from "./components/StatsGrid";
import TopCompaniesCard from "./components/TopCompaniesCard";
import TopJobsCard from "./components/TopJobsCard";

export default function AppMonitoring() {
  return (
    <div className="min-h-screen  p-6" dir="rtl">
      <TitlePage title="مراقبة التطبيقات" number={6} />
      <div className="space-y-6">
        <StatsGrid />

        <div className="grid gap-6 xl:grid-cols-2">
          <AcceptanceChart />
          <ApplicationsChart />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <TopJobsCard />
          <TopCompaniesCard />
        </div>
      </div>
    </div>
  );
}
