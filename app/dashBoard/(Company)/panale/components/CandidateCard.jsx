import { FiClock } from "react-icons/fi";
import { PiStudentFill } from "react-icons/pi";
import { HiOutlineBadgeCheck } from "react-icons/hi";

export default function CandidateCard() {
  return (
    <div
      dir="rtl"
      className="w-full max-w-2xl rounded-[22px] border border-slate-200 bg-white px-6 py-5 "
    >
      <div className="flex items-start justify-between gap-4">
        {/* Right side */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white">
            <PiStudentFill className="text-[28px]" />
          </div>

          <div className="text-right">
            <h3 className="text-[20px] font-extrabold leading-none text-slate-900">
              أحمد محمد علي
            </h3>

            <p className="mt-2 text-[16px] font-medium text-slate-600">
              Senior Software Engineer
            </p>

            <div className="mt-2 flex items-center gap-2 text-slate-500">
              <FiClock className="text-[16px]" />
              <span className="text-[14px]">2 hours ago</span>
            </div>
          </div>
        </div>

        {/* Left side */}
        <div className="flex flex-col items-start gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-emerald-700">
            <HiOutlineBadgeCheck className="text-[16px]" />
            <span className="text-[16px] font-extrabold">92%</span>
          </div>

          <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-[15px] font-medium text-blue-600">
            جديد
          </div>
        </div>
      </div>
    </div>
  );
}
