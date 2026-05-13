type StatusTagProps = {
  variant: "Verified" | "Rejected" | "Pending" | "Unverified" | string;
};

const variants: Record<string, string> = {
  Verified: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
  Unverified: "bg-gray-100 text-gray-700",
};

const textAr: Record<string, string> = {
  Verified: "موثوق",
  Pending: "قيد الانتظار",
  Rejected: "مرفوض",
  Unverified: "غير موثوق",
};

export default function StatusTag({ variant }: StatusTagProps) {
  const colorClass = variants[variant] ?? "bg-gray-100 text-gray-500";
  const label = textAr[variant] ?? variant;

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${colorClass}`}
    >
      {label}
    </span>
  );
}
