"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", applications: 1200, jobPosts: 420 },
  { month: "Feb", applications: 1900, jobPosts: 580 },
  { month: "Mar", applications: 2400, jobPosts: 720 },
  { month: "Apr", applications: 2100, jobPosts: 640 },
  { month: "May", applications: 2800, jobPosts: 880 },
  { month: "Jun", applications: 3200, jobPosts: 940 },
];

export default function MarketActivityChart() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
      <div className="mb-6 text-right">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
          نشاط سوق العمل
        </h3>
      </div>

      <div className="h-105">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
            <Line
              type="monotone"
              dataKey="applications"
              name="Applications"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="jobPosts"
              name="Job Posts"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
