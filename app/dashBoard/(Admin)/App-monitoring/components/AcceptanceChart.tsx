"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", accepted: 45, rejected: 55 },
  { name: "Feb", accepted: 52, rejected: 48 },
  { name: "Mar", accepted: 48, rejected: 52 },
  { name: "Apr", accepted: 58, rejected: 42 },
  { name: "May", accepted: 62, rejected: 38 },
  { name: "Jun", accepted: 65, rejected: 35 },
];

export default function AcceptanceChart() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-5 text-sm font-medium">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            Accepted
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <span className="h-3 w-3 rounded-full bg-rose-500" />
            Rejected
          </div>
        </div>

        <div className="text-right">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900">
            Acceptance vs Rejection
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            مقارنة القبول والرفض خلال آخر 6 أشهر
          </p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
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
              cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
              contentStyle={{
                borderRadius: 14,
                border: "1px solid #e2e8f0",
                boxShadow: "0 8px 30px rgba(15,23,42,0.08)",
              }}
            />
            <Bar dataKey="accepted" fill="#22c55e" radius={[8, 8, 0, 0]} />
            <Bar dataKey="rejected" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
