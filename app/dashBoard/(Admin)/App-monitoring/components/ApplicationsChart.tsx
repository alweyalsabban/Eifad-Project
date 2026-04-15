"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 1800 },
  { name: "Mar", value: 2400 },
  { name: "Apr", value: 2100 },
  { name: "May", value: 2800 },
  { name: "Jun", value: 3200 },
];

export default function ApplicationsChart() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
      <div className="mb-6 text-right">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
          التطبيقات الشهرية
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          عدد التطبيقات المستلمة خلال آخر 6 أشهر
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="name"
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
            <Line
              type="monotone"
              dataKey="value"
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
