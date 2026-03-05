"use client";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function InsightListCard({
  title,
  items = [],
  variant = "success", // "success" | "warning"
}) {
  const isSuccess = variant === "success";

  const styles = {
    cardIcon: isSuccess ? "text-green-600" : "text-amber-600",
    itemBg: isSuccess ? "bg-green-50" : "bg-amber-50",
    itemIcon: isSuccess ? "text-green-600" : "text-amber-600",
  };

  const Icon = isSuccess ? CheckCircleIcon : ExclamationTriangleIcon;

  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 mt-5">
      {/* Header */}
      <div className="flex items-center gap-5">
        <Icon className={`h-6 w-6 ${styles.cardIcon}`} />
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>

      {/* List */}
      <div className="mt-5 space-y-3">
        {items.map((text, idx) => (
          <div
            key={`${text}-${idx}`}
            className={`flex items-center justify-between rounded-2xl px-4 py-4 hover:scale-105 duration-300 ${styles.itemBg}`}
          >
            <p className="text-sm text-slate-800">{text}</p>
            <Icon className={`h-6 w-6 ${styles.itemIcon}`} aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}
