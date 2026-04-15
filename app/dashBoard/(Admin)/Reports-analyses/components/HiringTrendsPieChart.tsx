"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Technology", value: 35, color: "#2563eb" },
  { name: "Finance", value: 20, color: "#16a34a" },
  { name: "Healthcare", value: 15, color: "#ef4444" },
  { name: "Education", value: 12, color: "#f59e0b" },
  { name: "Retail", value: 10, color: "#8b5cf6" },
  { name: "Other", value: 8, color: "#94a3b8" },
];

export default function HiringTrendsPieChart() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
      <div className="mb-6 text-right">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
          اتجاهات التوظيف حسب الصناعة
        </h3>
      </div>

      <div className="h-105">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                borderRadius: 14,
                border: "1px solid #e2e8f0",
                boxShadow: "0 8px 30px rgba(15,23,42,0.08)",
              }}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="52%"
              outerRadius={110}
              label={({ name, value }) => `${name} ${value}%`}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
