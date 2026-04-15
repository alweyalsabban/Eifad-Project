"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", fullTime: 800, partTime: 250, remote: 150 },
  { month: "Feb", fullTime: 1200, partTime: 400, remote: 280 },
  { month: "Mar", fullTime: 1500, partTime: 550, remote: 350 },
  { month: "Apr", fullTime: 1300, partTime: 480, remote: 320 },
  { month: "May", fullTime: 1800, partTime: 600, remote: 420 },
  { month: "Jun", fullTime: 2000, partTime: 700, remote: 500 },
];

export default function ApplicationTrendsStackedChart() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
      <div className="mb-6 text-right">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
          اتجاهات التطبيقات
        </h3>
      </div>

      <div className="h-105">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={true}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 13 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 13 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 14,
                border: "1px solid #e2e8f0",
                boxShadow: "0 8px 30px rgba(15,23,42,0.08)",
              }}
            />
            <Legend />
            <Bar
              dataKey="fullTime"
              stackId="a"
              name="Full-time"
              fill="#2563eb"
            />
            <Bar
              dataKey="partTime"
              stackId="a"
              name="Part-time"
              fill="#16a34a"
            />
            <Bar dataKey="remote" stackId="a" name="Remote" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
