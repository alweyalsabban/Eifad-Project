import React from "react";
import TicketsStatsGrid from "./components/TicketsStatsGrid";
import TicketsTable from "./components/TicketsTable";

function SupportFund() {
  return (
    <div className="min-h-screen  p-6" dir="rtl">
      <div className="space-y-6">
        <TicketsStatsGrid />
        <TicketsTable />
      </div>
    </div>
  );
}

export default SupportFund;
