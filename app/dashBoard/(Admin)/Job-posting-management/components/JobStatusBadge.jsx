export default function JobStatusBadge({ status }) {
  const styles = {
    Active: "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Closed: "bg-gray-200 text-gray-700",
    Draft: "bg-orange-100 text-orange-700",
    Deleted: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status === "Active" ? "نشط" : ""}
      {status === "Closed" ? "مغلقة" : ""}
      {status === "Draft" ? "مسودة" : ""}
      {status === "Deleted" ? "محذوفة" : ""}
    </span>
  );
}
