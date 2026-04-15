"use client";

import { useState } from "react";
import JobTableRow from "./JobTableRow";
import JobDetailsModal from "./JobDetailsModal";
import type { JobItem, JobStatus } from "../../TypeAdmin";

type Props = {
  data: JobItem[];
};

export default function JobsTable({ data }: Props) {
  const [jobs, setJobs] = useState<JobItem[]>(data);
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [openModal, setOpenModal] = useState(false);

  function openView(job: JobItem) {
    setSelectedJob(job);
    setModalMode("view");
    setOpenModal(true);
  }

  function openEdit(job: JobItem) {
    setSelectedJob(job);
    setModalMode("edit");
    setOpenModal(true);
  }

  function updateJobInState(updatedJob: JobItem) {
    setJobs((prev) =>
      prev.map((job) => (job.id === updatedJob.id ? updatedJob : job)),
    );
    setSelectedJob(updatedJob);
  }

  function changeStatus(jobId: number, status: JobStatus, actionLabel: string) {
    setJobs((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, status } : job)),
    );

    setSelectedJob((prev) =>
      prev && prev.id === jobId ? { ...prev, status } : prev,
    );

    console.log(`${actionLabel}:`, { jobId, newStatus: status });
  }

  function handleDelete(jobId: number) {
    changeStatus(jobId, "محذوفة", "حذف من الجدول");
  }

  function handleRestore(jobId: number) {
    changeStatus(jobId, "نشط", "استرجاع الوظيفة");
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm">
            <thead className="bg-[#fafafa]">
              <tr className="text-right text-base font-semibold text-[#1f2a44]">
                <th className="px-4 py-4">المسمى الوظيفي</th>
                <th className="px-4 py-4">الشركة</th>
                <th className="px-4 py-4">تاريخ النشر</th>
                <th className="px-4 py-4">الحالة</th>
                <th className="px-4 py-4">عدد التطبيقات</th>
                <th className="px-4 py-4">الإجراءات</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <JobTableRow
                  key={job.id}
                  job={job}
                  onView={openView}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                  onRestore={handleRestore}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <JobDetailsModal
        open={openModal}
        mode={modalMode}
        onClose={() => setOpenModal(false)}
        job={selectedJob}
        onSave={updateJobInState}
        onChangeStatus={changeStatus}
      />
    </>
  );
}
