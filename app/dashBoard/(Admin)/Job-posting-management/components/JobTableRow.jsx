"use client";

import JobStatusBadge from "./JobStatusBadge";
import JobRowActions from "./JobRowActions";
import { Users } from "lucide-react";

export default function JobTableRow({ job, onView, onEdit, onDelete }) {
  return (
    <tr className="border-t border-gray-200 text-right transition hover:bg-gray-50">
      <td className="px-4 py-4 whitespace-nowrap">
        {job.Title || "بدون عنوان"}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        {job.company.CompanyName || "بدون اسم"}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        {job?.ExpiryDate?.slice(0, 10) || " لم يضع تاريخ"}
      </td>

      <td className="px-4 py-4">
        <JobStatusBadge status={job.Status} />
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center justify-start gap-2">
          <Users size={16} className="text-gray-500" />
          <span>22</span>
        </div>
      </td>

      <td className="px-4 py-4">
        <JobRowActions
          status={job.Status}
          onView={() => onView(job)}
          onEdit={() => onEdit(job)}
          onDelete={() => onDelete(job.id)}
        />
      </td>
    </tr>
  );
}
