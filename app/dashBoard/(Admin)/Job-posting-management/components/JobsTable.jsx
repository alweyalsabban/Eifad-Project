"use client";

import { useState, useEffect } from "react";
import { ApiFetchServer } from "@/app/lib/ApiFetchServer";
import { toast } from "react-toastify";
import JobTableRow from "./JobTableRow";
import JobDetailsModal from "./JobDetailsModal";

export default function JobsTable({ data }) {
  const [jobs, setJobs] = useState(data ?? []);

  // مزامنة الـ state عند وصول البيانات من الـ parent
  useEffect(() => {
    setJobs(data ?? []);
  }, [data]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [openModal, setOpenModal] = useState(false);

  // ── فتح المودال ────────────────────────────────────
  function openView(job) {
    setSelectedJob(job);
    setModalMode("view");
    setOpenModal(true);
  }

  function openEdit(job) {
    setSelectedJob(job);
    setModalMode("edit");
    setOpenModal(true);
  }

  // ── PUT /admin/jobs/{id} ────────────────────────────
  async function handleSave(updatedJob) {
    const { JobAdID, Title, Description, Status } = updatedJob;
    const { isSusses } = await ApiFetchServer(`/admin/jobs/${JobAdID}`, "PUT", {
      title: Title,
      description: Description,
      status: Status,
    });

    if (isSusses) {
      setJobs((prev) =>
        prev.map((j) => (j.JobAdID === JobAdID ? updatedJob : j)),
      );
      setSelectedJob(updatedJob);
      toast.success("تم تعديل الوظيفة بنجاح ✅");
    } else {
      toast.error("فشل تعديل الوظيفة، يرجى المحاولة مجددًا.");
    }
  }

  // ── DELETE /admin/jobs/{id} ─────────────────────────
  async function handleDelete(jobId) {
    const { isSusses } = await ApiFetchServer(`/admin/jobs/${jobId}`, "DELETE");

    if (isSusses) {
      // soft-delete: نحدّث الحالة محليًا إلى Deleted
      setJobs((prev) =>
        prev.map((j) =>
          j.JobAdID === jobId ? { ...j, Status: "Deleted" } : j,
        ),
      );
      setSelectedJob((prev) =>
        prev && prev.JobAdID === jobId ? { ...prev, Status: "Deleted" } : prev,
      );
      toast.success("تم حذف الوظيفة بنجاح 🗑️");
    } else {
      toast.error("فشل حذف الوظيفة، يرجى المحاولة مجددًا.");
    }
  }

  // ── تغيير الحالة من داخل المودال (إغلاق أو حذف) ────
  async function changeStatus(jobId, newStatus, actionLabel) {
    if (newStatus === "Deleted") {
      return handleDelete(jobId);
    }

    // لأي حالة أخرى (Closed, Active …) نستخدم PUT
    const { isSusses } = await ApiFetchServer(`/admin/jobs/${jobId}`, "PUT", {
      status: newStatus,
    });

    if (isSusses) {
      setJobs((prev) =>
        prev.map((j) =>
          j.JobAdID === jobId ? { ...j, Status: newStatus } : j,
        ),
      );
      setSelectedJob((prev) =>
        prev && prev.JobAdID === jobId ? { ...prev, Status: newStatus } : prev,
      );
      toast.success(`تم تنفيذ "${actionLabel}" بنجاح ✅`);
    } else {
      toast.error(`فشل تنفيذ "${actionLabel}"، يرجى المحاولة مجددًا.`);
    }
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
                <th className="px-4 py-4">عدد المتقدمين</th>
                <th className="px-4 py-4">الإجراءات</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job, index) => (
                <JobTableRow
                  key={job.JobAdID ?? index}
                  job={job}
                  onView={openView}
                  onEdit={openEdit}
                  onDelete={() => handleDelete(job.JobAdID)}
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
        onSave={handleSave}
        onChangeStatus={changeStatus}
      />
    </>
  );
}
