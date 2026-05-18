import {
  FiMapPin,
  FiClock,
  FiUsers,
  FiEye,
  FiCalendar,
  FiEdit3,
  FiTrash2,
} from "react-icons/fi";
import { HiOutlineBriefcase } from "react-icons/hi2";

const statusStyle = {
  Active: "bg-emerald-100 text-emerald-700",
  Closed: "bg-red-100 text-red-700",
  Draft: "bg-blue-100 text-blue-700",
};

export default function JobListingCard({
  job,
  onEdit,
  onView,
  onPublish,
  onCloseJob,
  onViewApplicants,
  onDeleteJob,
}) {
  const status = job?.Status ?? job?.status;
  const applicants = job?.applications_count ?? job?.ApplicationsCount ?? 0;
  const canEdit = !(status === "Active" && Number(applicants) > 0);

  const salary = `${job?.SalaryMin ?? job?.salary_min ?? ""} - ${
    job?.SalaryMax ?? job?.salary_max ?? ""
  } ${job?.Currency ?? job?.currency ?? ""}`;

  return (
    <div className="w-full mt-5 max-w-2xl rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
            <HiOutlineBriefcase className="text-[28px]" />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => (canEdit ? onEdit(job) : onView(job))}
              className="text-[20px] font-extrabold text-slate-900 hover:text-blue-600"
            >
              {job?.Title ?? job?.title}
            </button>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-slate-500">
              <div className="flex items-center gap-1 text-[15px]">
                <span>{job?.Location ?? job?.location}</span>
                <FiMapPin />
              </div>
              <div className="flex items-center gap-1 text-[15px]">
                <span>{job?.WorkType ?? job?.work_type}</span>
                <FiClock />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-center justify-center">
          <button
            type="button"
            onClick={() => onDeleteJob(job)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-red-200 text-red-500 hover:bg-red-50"
            title="حذف الوظيفة"
          >
            <FiTrash2 className="text-[18px]" />
          </button>
          <span
            className={`rounded-full px-4 py-1.5 text-[14px] font-bold ${
              statusStyle[status] ?? "bg-slate-100 text-slate-700"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-4 ">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-[18px] font-extrabold text-blue-600">
            <span>{applicants}</span>
            <FiUsers />
          </div>
          <span className="mt-1 text-[14px] text-slate-500">متقدم</span>
        </div>

        {/*     <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-[18px] font-extrabold text-orange-500">
            <span>{job?.views_count ?? "لا يوجد"}</span>
            <FiEye />
          </div>
          <span className="mt-1 text-[14px] text-slate-500">مشاهدة</span>
        </div> */}

        <div className="flex flex-col items-center justify-center">
          <div className="text-[18px] text-center font-extrabold text-emerald-600">
            {salary}
          </div>
          <span className="mt-1 text-[14px] text-slate-500">راتب</span>
        </div>
      </div>

      <div className="my-5 h-px w-full bg-slate-200" />

      <div className="flex items-center justify-between text-[15px] text-slate-500">
        <div className="flex items-center gap-1">
          <FiCalendar />
          <span>
            نُشر: {(job?.PostedAt ?? job?.posted_at ?? "").slice(0, 10) || "-"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <FiCalendar />
          <span>
            ينتهي:
            {(job?.ExpiryDate ?? job?.expiry_date ?? "").slice(0, 10) || "-"}
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {status === "Active" && (
          <button
            onClick={() => onViewApplicants(job)}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 text-[16px] font-medium text-white hover:bg-blue-700"
          >
            <FiUsers />
            عرض المتقدمين
          </button>
        )}

        {canEdit && (
          <button
            onClick={() => onEdit(job)}
            className="h-12 rounded-2xl border border-blue-300 px-5 text-[16px] font-medium text-blue-600 hover:bg-blue-50"
          >
            <FiEdit3 className="inline ml-1" />
            تعديل الوظيفة
          </button>
        )}

        {!canEdit && (
          <button
            onClick={() => onView(job)}
            className="h-12 rounded-2xl border border-slate-300 px-5 text-[16px] font-medium text-slate-600 hover:bg-slate-50"
          >
            عرض التفاصيل
          </button>
        )}

        {status !== "Active" && (
          <button
            onClick={() => onPublish(job)}
            className="h-12 rounded-2xl border border-green-300 px-5 text-[16px] font-medium text-green-600 hover:bg-green-50"
          >
            نشر
          </button>
        )}

        {status === "Active" && (
          <button
            onClick={() => onCloseJob(job)}
            className="h-12 rounded-2xl border border-red-300 px-6 text-[16px] font-medium text-red-500 hover:bg-red-50"
          >
            إغلاق
          </button>
        )}
      </div>
    </div>
  );
}
