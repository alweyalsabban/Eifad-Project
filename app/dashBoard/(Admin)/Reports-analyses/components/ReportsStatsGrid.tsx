import ReportsStatCard from "./ReportsStatCard";

export default function ReportsStatsGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <ReportsStatCard
        title="Success Rate"
        value="68%"
        subtitle="Offer acceptance"
        valueClassName="text-fuchsia-600"
      />

      <ReportsStatCard
        title="Avg. Response Time"
        value="2.4"
        subtitle="Days"
        valueClassName="text-orange-600"
      />

      <ReportsStatCard
        title="Total Applications"
        value="13,600"
        subtitle="Last 6 months"
        valueClassName="text-emerald-600"
      />

      <ReportsStatCard
        title="Total Job Posts"
        value="4,210"
        subtitle="Last 6 months"
        valueClassName="text-blue-600"
      />
    </div>
  );
}
