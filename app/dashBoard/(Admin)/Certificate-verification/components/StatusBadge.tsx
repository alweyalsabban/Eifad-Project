type Props = {
  status: "موثق" | "قيد الانتظار";
};

export default function StatusBadge({ status }: Props) {
  const styles =
    status === "موثق"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}
