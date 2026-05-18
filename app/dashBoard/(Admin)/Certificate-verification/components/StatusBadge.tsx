export default function StatusBadge({ status }: { status: string }) {
  let label = "غير معروف";
  let styles = "bg-gray-100 text-gray-700";

  if (status === "verified") {
    label = "مقبول";
    styles = "bg-green-100 text-green-700";
  } else if (status === "pending") {
    label = "قيد الانتظار";
    styles = "bg-yellow-100 text-yellow-700";
  } else if (status === "rejected") {
    label = "مرفوض";
    styles = "bg-red-100 text-red-700";
  } else if (status === "ai_reviewed") {
    label = "مراجعة الذكاء الاصطناعي";
    styles = "bg-blue-100 text-blue-700";
  }

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles}`}
    >
      {label}
    </span>
  );
}
