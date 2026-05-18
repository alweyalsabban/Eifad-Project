"use client";

import { useEffect, useState } from "react";
import {
  X,
  BriefcaseBusiness,
  MapPin,
  DollarSign,
  Calendar,
  Building2,
  Monitor,
  Clock,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import JobStatusBadge from "./JobStatusBadge";

/* ───── helpers ───── */
function formatDate(iso) {
  if (!iso) return "غير محدد";
  return new Date(iso).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ListSection({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h4 className="mb-3 text-lg font-bold text-slate-800">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-slate-600">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoBadge({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
      <Icon size={15} className="text-blue-500 shrink-0" />
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

/* ───── component ───── */
export default function JobDetailsModal({
  open,
  mode,
  onClose,
  job,
  onSave,
  onChangeStatus,
}) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    setForm(job);
  }, [job]);

  if (!open || !job || !form) return null;

  const isEdit = mode === "edit";

  function updateField(key, value) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function updateArrayField(key, index, value) {
    setForm((prev) => {
      if (!prev) return prev;
      const next = [...(prev[key] || [])];
      next[index] = value;
      return { ...prev, [key]: next };
    });
  }

  function handleSave() {
    if (!form) return;
    onSave(form);
    onClose();
  }

  const salary =
    job.SalaryMin || job.SalaryMax
      ? `${job.SalaryMin ?? 0} - ${job.SalaryMax ?? 0} ${job.Currency ?? ""}`
      : null;

  const workTypeLabel = {
    "Full-time": "دوام كامل",
    "Part-time": "دوام جزئي",
    Contract: "عقد",
    Freelance: "مستقل",
  };

  const workplaceLabel = {
    onsite: "حضوري",
    remote: "عن بُعد",
    hybrid: "هجين",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="flex h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100"
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={18} className="text-blue-600" />
            <h3 className="text-lg font-bold text-slate-800">
              {isEdit ? "تعديل تفاصيل الوظيفة" : "تفاصيل الوظيفة"}
            </h3>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6" dir="rtl">
          {/* Company + Title */}
          <div className="flex  gap-4">
            {job?.company?.LogoPath.length > 40 && (
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                <Image
                  src={job?.company?.LogoPath ?? ""}
                  alt={job?.company?.CompanyName ?? "شعار الشركة"}
                  fill
                  className="object-contain p-1"
                />
              </div>
            )}
            <div className="flex-1 text-right">
              {isEdit ? (
                <input
                  value={form.Title ?? ""}
                  onChange={(e) => updateField("Title", e.target.value)}
                  className="mb-1 w-full rounded-lg border px-3 py-2 text-xl font-bold outline-none focus:border-blue-400"
                />
              ) : (
                <h2 className="text-2xl font-bold text-slate-900">
                  {job.Title || "بدون عنوان"}
                </h2>
              )}
              <p className="mt-1 text-base font-medium text-blue-600">
                {job.company?.CompanyName ?? "—"}
              </p>
              {job.company?.FieldOfWork && (
                <p className="text-sm text-slate-500">
                  {job.company.FieldOfWork}
                </p>
              )}
            </div>
          </div>

          {/* Status badge */}
          <div className="flex ">
            <JobStatusBadge status={isEdit ? form.Status : job.Status} />
          </div>

          {/* Info badges */}
          <div className="flex flex-wrap  gap-2">
            <InfoBadge
              icon={MapPin}
              label="الموقع"
              value={job.Location ?? "غير محدد"}
            />
            <InfoBadge
              icon={Clock}
              label="نوع العمل"
              value={workTypeLabel[job.WorkType] ?? job.WorkType}
            />
            <InfoBadge
              icon={Monitor}
              label="بيئة العمل"
              value={workplaceLabel[job.WorkplaceType] ?? job.WorkplaceType}
            />
            {salary && (
              <InfoBadge icon={DollarSign} label="الراتب" value={salary} />
            )}
            <InfoBadge
              icon={Calendar}
              label="تاريخ النشر"
              value={formatDate(job.PostedAt)}
            />
            <InfoBadge
              icon={Calendar}
              label="تاريخ الانتهاء"
              value={formatDate(job.ExpiryDate)}
            />
            <InfoBadge
              icon={Building2}
              label="الشركة"
              value={
                job.company?.CompanyName
                  ? `${job.company.CompanyName}${job.company?.IsCompanyVerified ? " ✓" : ""}`
                  : null
              }
            />
          </div>

          {/* Description */}
          <div className="">
            <h4 className="mb-2 text-lg font-bold text-slate-800">
              وصف الوظيفة
            </h4>
            {isEdit ? (
              <textarea
                value={form.Description ?? ""}
                onChange={(e) => updateField("Description", e.target.value)}
                rows={4}
                className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-blue-400"
              />
            ) : (
              <p className="leading-8 text-slate-600">
                {job.Description || "لا يوجد وصف"}
              </p>
            )}
          </div>

          {/* Requirements */}
          {isEdit ? (
            <div className="text-right">
              <h4 className="mb-2 text-lg font-bold text-slate-800">
                المتطلبات
              </h4>
              <div className="space-y-2">
                {(form.Requirements ?? []).map((item, i) => (
                  <input
                    key={i}
                    value={item}
                    onChange={(e) =>
                      updateArrayField("Requirements", i, e.target.value)
                    }
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-400"
                  />
                ))}
              </div>
            </div>
          ) : (
            <ListSection title="المتطلبات" items={job.Requirements} />
          )}

          {/* Responsibilities */}
          {isEdit ? (
            <div>
              <h4 className="mb-2 text-lg font-bold text-slate-800">
                المهام والمسؤوليات
              </h4>
              <div className="space-y-2">
                {(form.Responsibilities ?? []).map((item, i) => (
                  <input
                    key={i}
                    value={item}
                    onChange={(e) =>
                      updateArrayField("Responsibilities", i, e.target.value)
                    }
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-400"
                  />
                ))}
              </div>
            </div>
          ) : (
            <ListSection
              title="المهام والمسؤوليات"
              items={job.Responsibilities}
            />
          )}

          {/* Benefits */}
          {isEdit ? (
            <div className="text-right">
              <h4 className="mb-2 text-lg font-bold text-slate-800">المزايا</h4>
              <div className="space-y-2">
                {(form.Benefits ?? []).map((item, i) => (
                  <input
                    key={i}
                    value={item}
                    onChange={(e) =>
                      updateArrayField("Benefits", i, e.target.value)
                    }
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-400"
                  />
                ))}
              </div>
            </div>
          ) : (
            <ListSection title="المزايا" items={job.Benefits} />
          )}
        </div>

        {/* ── Footer actions ── */}
        <div className="border-t px-6 py-4">
          {isEdit ? (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                حفظ التعديلات
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-gray-50"
              >
                إلغاء
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3" dir="rtl">
              <button
                type="button"
                onClick={() =>
                  onChangeStatus(job.JobAdID, "Closed", "إغلاق الوظيفة")
                }
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-gray-50"
              >
                إغلاق الوظيفة
              </button>
              <button
                type="button"
                onClick={() =>
                  onChangeStatus(job.JobAdID, "Deleted", "حذف الوظيفة")
                }
                className="rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
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
