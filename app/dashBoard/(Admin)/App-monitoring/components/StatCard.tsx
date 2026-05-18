import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type Props = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: ReactNode;
  iconBgClass?: string;
  iconClassName?: string;
};

export default function StatCard({
  title,
  value,
  change,
  trend,
  icon,
  iconBgClass = "bg-slate-100",
  iconClassName = "text-slate-500",
}: Props) {
  const isUp = trend === "up";

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBgClass} ${iconClassName}`}
          >
            {icon}
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

          <div
            className={`mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium ${
              isUp
                ? "bg-emerald-50 text-emerald-600"
                : "bg-rose-50 text-rose-600"
            }`}
          >
            {isUp ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
            <span>{change}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
