"use client";

import { useEffect, useState } from "react";
import { X, BriefcaseBusiness, MapPin, DollarSign, Users } from "lucide-react";
import JobStatusBadge from "./JobStatusBadge";
import type { JobItem, JobStatus } from "../../TypeAdmin";

type Props = {
  open: boolean;
  mode: "view" | "edit";
  onClose: () => void;
  job: JobItem | null;
  onSave: (job: JobItem) => void;
  onChangeStatus: (
    jobId: number,
    status: JobStatus,
    actionLabel: string,
  ) => void;
};

export default function JobDetailsModal({
  open,
  mode,
  onClose,
  job,
  onSave,
  onChangeStatus,
}: Props) {
  const [form, setForm] = useState<JobItem | null>(null);

  useEffect(() => {
    setForm(job);
  }, [job]);

  if (!open || !job || !form) return null;

  const isEdit = mode === "edit";

  function updateField<K extends keyof JobItem>(key: K, value: JobItem[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function handleRequirementChange(index: number, value: string) {
    if (!form) return;

    const next = [...form.requirements];
    next[index] = value;
    updateField("requirements", next);
  }

  function handleSave() {
    if (!form) return;

    onSave(form);
    console.log("Job updated:", form);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 "
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-white h-150 overflow-y-scroll p-6 shadow-xl "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100"
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={18} />
            <h3 className="text-xl font-bold">
              {isEdit ? "تعديل تفاصيل الوظيفة" : "عرض تفاصيل الوظيفة"}
            </h3>
          </div>
        </div>

        <div className="space-y-5">
          <div className="text-right">
            {isEdit ? (
              <input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-2xl font-bold outline-none"
              />
            ) : (
              <h2 className="text-3xl font-bold text-slate-900">{job.title}</h2>
            )}

            <div className="mt-3">
              {isEdit ? (
                <input
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-lg text-blue-600 outline-none"
                />
              ) : (
                <p className="text-2xl text-blue-600">{job.company}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-5 border-b pb-5 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              {isEdit ? (
                <input
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  className="rounded border px-2 py-1 outline-none"
                />
              ) : (
                <span>{job.location}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <DollarSign size={16} />
              {isEdit ? (
                <input
                  value={form.salaryRange}
                  onChange={(e) => updateField("salaryRange", e.target.value)}
                  className="rounded border px-2 py-1 outline-none"
                />
              ) : (
                <span>{job.salaryRange}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <BriefcaseBusiness size={16} />
              {isEdit ? (
                <input
                  value={form.employmentType}
                  onChange={(e) =>
                    updateField("employmentType", e.target.value)
                  }
                  className="rounded border px-2 py-1 outline-none"
                />
              ) : (
                <span>{job.employmentType}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Users size={16} />
              {isEdit ? (
                <input
                  type="number"
                  value={form.applicantsCount}
                  onChange={(e) =>
                    updateField("applicantsCount", Number(e.target.value))
                  }
                  className="w-24 rounded border px-2 py-1 outline-none"
                />
              ) : (
                <span>{job.applicantsCount} applicants</span>
              )}
            </div>
          </div>

          <div className="text-right">
            <h4 className="mb-3 text-2xl font-bold">Job Description</h4>

            {isEdit ? (
              <textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={4}
                className="w-full rounded-xl border px-3 py-2 outline-none"
              />
            ) : (
              <p className="text-lg leading-8 text-slate-700">
                {job.description}
              </p>
            )}
          </div>

          <div className="text-right">
            <h4 className="mb-3 text-2xl font-bold">Requirements</h4>

            <div className="space-y-2">
              {(isEdit ? form.requirements : job.requirements).map(
                (item, index) =>
                  isEdit ? (
                    <input
                      key={index}
                      value={form.requirements[index]}
                      onChange={(e) =>
                        handleRequirementChange(index, e.target.value)
                      }
                      className="w-full rounded-lg border px-3 py-2 outline-none"
                    />
                  ) : (
                    <p key={index} className="text-lg text-slate-700">
                      • {item}
                    </p>
                  ),
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 rounded-2xl bg-slate-50 p-4">
            <div className="text-center">
              <p className="mb-1 text-sm text-slate-500">تاريخ النشر</p>
              {isEdit ? (
                <input
                  value={form.publishDate}
                  onChange={(e) => updateField("publishDate", e.target.value)}
                  className="w-full rounded border px-2 py-1 text-center outline-none"
                />
              ) : (
                <p className="text-2xl font-semibold">{job.publishDate}</p>
              )}
            </div>

            <div className="text-center">
              <p className="mb-1 text-sm text-slate-500">الحالة</p>
              <div className="flex justify-center">
                <JobStatusBadge status={isEdit ? form.status : job.status} />
              </div>
            </div>

            <div className="text-center">
              <p className="mb-1 text-sm text-slate-500">عدد التطبيقات</p>
              <p className="text-2xl font-semibold">
                {isEdit ? form.applicantsCount : job.applicantsCount}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-5">
          {isEdit ? (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-blue-700"
              >
                حفظ التعديلات
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-base font-semibold"
              >
                إلغاء
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => onChangeStatus(job.id, "مغلقة", "إغلاق الوظيفة")}
                className="rounded-xl border border-gray-200 px-4 py-3 text-base font-semibold text-slate-800 transition hover:bg-gray-50"
              >
                إغلاق الوظيفة
              </button>

              <button
                type="button"
                onClick={() =>
                  onChangeStatus(job.id, "مبلغ عنها", "الإبلاغ عن الوظيفة")
                }
                className="rounded-xl border border-gray-200 px-4 py-3 text-base font-semibold text-orange-600 transition hover:bg-orange-50"
              >
                الإبلاغ عن الوظيفة
              </button>

              <button
                type="button"
                onClick={() => onChangeStatus(job.id, "محذوفة", "حذف الوظيفة")}
                className="rounded-xl border border-gray-200 px-4 py-3 text-base font-semibold text-red-600 transition hover:bg-red-50"
              >
                حذف الوظيفة
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
