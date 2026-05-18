type Props = {
  title: string;
  value: string;
  subtitle: string;
  valueClassName?: string;
};

export default function ReportsStatCard({
  title,
  value,
  subtitle,
  valueClassName = "text-slate-900",
}: Props) {
  return (
    <div className="rounded-2xl bg-white px-6 py-7 shadow-sm ring-1 ring-slate-200/70">
      <div className="text-center">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p
          className={`mt-8 text-4xl font-bold tracking-tight ${valueClassName}`}
        >
          {value}
        </p>
        <p className="mt-8 text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}
