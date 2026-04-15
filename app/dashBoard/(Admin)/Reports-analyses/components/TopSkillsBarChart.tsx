"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { skill: "JavaScript", value: 1500 },
  { skill: "Python", value: 1280 },
  { skill: "React", value: 1130 },
  { skill: "Node.js", value: 980 },
  { skill: "AWS", value: 860 },
  { skill: "Docker", value: 720 },
  { skill: "SQL", value: 680 },
];

export default function TopSkillsBarChart() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
      <div className="mb-6 text-right">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
          المهارات الأكثر طلبًا
        </h3>
      </div>

      <div className="h-105">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              horizontal={true}
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 13 }}
            />
            <YAxis
              dataKey="skill"
              type="category"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#475569", fontSize: 13 }}
              width={90}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 14,
                border: "1px solid #e2e8f0",
                boxShadow: "0 8px 30px rgba(15,23,42,0.08)",
              }}
            />
            <Bar
              dataKey="value"
              fill="#2563eb"
              radius={[0, 8, 8, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
