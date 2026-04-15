type Props = {
  value: number;
  valueLabel: string;
  title: string;
  subtitle: string;
  valueColor?: string;
};

export default function RankingItem({
  value,
  valueLabel,
  title,
  subtitle,
  valueColor = "text-blue-600",
}: Props) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 transition hover:bg-slate-100">
      {/* Right (text) */}
      <div className="text-right">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
      </div>

      {/* Left (value) */}
      <div className="text-left">
        <p className={`text-lg font-bold ${valueColor}`}>{value}</p>
        <p className="text-[11px] text-slate-400">{valueLabel}</p>
      </div>
    </div>
  );
}
