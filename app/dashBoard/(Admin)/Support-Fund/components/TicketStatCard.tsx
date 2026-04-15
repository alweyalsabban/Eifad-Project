import { ReactNode } from "react";

type Props = {
  title: string;
  value: number;
  icon: ReactNode;
  color: string;
};

export default function TicketStatCard({ title, value, icon, color }: Props) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white px-6 py-5 shadow-sm ring-1 ring-slate-200/70">
      <div className="text-right">
        <p className="text-sm text-slate-500">{title}</p>
        <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
      </div>

      <div className={`text-3xl ${color}`}>{icon}</div>
    </div>
  );
}
