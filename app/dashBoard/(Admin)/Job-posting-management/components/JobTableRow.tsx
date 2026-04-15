"use client";

import JobStatusBadge from "./JobStatusBadge";
import JobRowActions from "./JobRowActions";
import type { JobItem } from "../../TypeAdmin";
import { Users } from "lucide-react";

type Props = {
  job: JobItem;
  onView: (job: JobItem) => void;
  onEdit: (job: JobItem) => void;
  onDelete: (jobId: number) => void;
  onRestore: (jobId: number) => void;
};

export default function JobTableRow({
  job,
  onView,
  onEdit,
  onDelete,
  onRestore,
}: Props) {
  return (
    <tr className="border-t border-gray-200 text-right transition hover:bg-gray-50">
      <td className="px-4 py-4 whitespace-nowrap">{job.title}</td>
      <td className="px-4 py-4 whitespace-nowrap">{job.company}</td>
      <td className="px-4 py-4 whitespace-nowrap">{job.publishDate}</td>

      <td className="px-4 py-4">
        <JobStatusBadge status={job.status} />
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center justify-start gap-2">
          <Users size={16} className="text-gray-500" />
          <span>{job.applicantsCount}</span>
        </div>
      </td>

      <td className="px-4 py-4">
        <JobRowActions
          status={job.status}
          onView={() => onView(job)}
          onEdit={() => onEdit(job)}
          onDelete={() => onDelete(job.id)}
          onRestore={() => onRestore(job.id)}
        />
      </td>
    </tr>
  );
}
