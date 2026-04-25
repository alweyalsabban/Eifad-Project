import {
  FiMoreVertical,
  FiMapPin,
  FiClock,
  FiUsers,
  FiEye,
  FiCalendar,
} from "react-icons/fi";
import { HiOutlineBriefcase } from "react-icons/hi2";
import Link from "next/link";

export default function JobListingCard({
  title,
  location,
  jobType,
  status,
  applicants,
  views,
  salary,
  publishedAt,
  expiresAt,
  setPostJob,
  onCloseJob,
  onMenuClick,
}) {
  return (
    <div
      className="w-full mt-5 max-w-2xl rounded-2xl border 
    border-slate-200 bg-white p-5 "
    >
      <div className="flex items-center justify-between  gap-4">
        <div className="flex gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
            <HiOutlineBriefcase className="text-[28px]" />
          </div>

          <div className="text-right">
            <h3 className="text-[20px] font-extrabold text-slate-900">
              {title}
            </h3>

            <div className="mt-2 flex flex-wrap items-center  gap-3 text-slate-500">
              <div className="flex items-center gap-1 text-[15px]">
                <span>{location}</span>
                <FiMapPin className="text-[15px]" />
              </div>

              <div className="flex items-center gap-1 text-[15px]">
                <span>{jobType}</span>
                <FiClock className="text-[15px]" />
              </div>
            </div>
          </div>
        </div>

        <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-[14px] font-bold text-emerald-700">
          {status}
        </span>
      </div>

      {/* Stats */}
      <div className="mt-7 grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-[18px] font-extrabold text-blue-600">
            <span>{applicants}</span>
            <FiUsers className="text-[16px]" />
          </div>
          <span className="mt-1 text-[14px] text-slate-500">متقدم</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-[18px] font-extrabold text-orange-500">
            <span>{views}</span>
            <FiEye className="text-[16px]" />
          </div>
          <span className="mt-1 text-[14px] text-slate-500">مشاهدة</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="text-[18px] text-center font-extrabold text-emerald-600">
            {salary}
          </div>
          <span className="mt-1 text-[14px] text-slate-500">راتب</span>
        </div>
      </div>

      <div className="my-5 h-px w-full bg-slate-200" />

      {/* Dates */}
      <div className="flex items-center justify-between text-[15px] text-slate-500">
        <div className="flex items-center gap-1">
          <FiCalendar className="text-[15px]" />
          <span>نُشر: {publishedAt}</span>
        </div>

        <div className="flex items-center gap-1">
          <FiCalendar className="text-[15px]" />
          <span>ينتهي: {expiresAt}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center gap-3">
        <button
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl
        bg-blue-600 px-6 text-[16px] font-medium text-white transition hover:bg-blue-700"
        >
          <FiUsers className="text-[16px]" />
          <span>عرض المتقدمين</span>
        </button>

        <button
          type="button"
          onClick={onCloseJob}
          className="h-12 rounded-2xl border border-red-300 px-6 text-[16px] font-medium text-red-500 transition hover:bg-red-50"
        >
          إغلاق
        </button>
      </div>
    </div>
  );
}
