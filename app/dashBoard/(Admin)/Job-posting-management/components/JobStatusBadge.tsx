import type { JobStatus } from "../../TypeAdmin";

type Props = {
  status: JobStatus;
};

export default function JobStatusBadge({ status }: Props) {
  const styles: Record<JobStatus, string> = {
    نشط: "bg-blue-100 text-blue-700",
    "قيد الانتظار": "bg-yellow-100 text-yellow-700",
    مغلقة: "bg-gray-200 text-gray-700",
    "مبلغ عنها": "bg-orange-100 text-orange-700",
    محذوفة: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
