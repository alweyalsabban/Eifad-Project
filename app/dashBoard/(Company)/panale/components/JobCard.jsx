import { FiClock, FiEye, FiUsers } from "react-icons/fi";

export default function JobCard({ title, applicants, views, daysAgo }) {
  return (
    <div className="rounded-3xl bg-slate-50 px-6 py-6 md:px-8 md:py-7">
      <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>

      <div className="my-5 h-px w-full bg-slate-200" />

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-blue-600">
            <FiUsers className="text-lg" />
            <span className="text-l font-extrabold ">{applicants}</span>
          </div>
          <span className="mt-2 text-base text-slate-500">متقدم</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-orange-600">
            <FiEye className="text-l" />
            <span className="text-l font-extrabold ">{views}</span>
          </div>
          <span className="mt-2 text-base text-slate-500">مشاهدة</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-slate-500">
            <FiClock className="text-l" />
            <span className="text-l font-bold">{daysAgo}d</span>
          </div>
          <span className="mt-1 text-base text-slate-500">منذ</span>
        </div>
      </div>
    </div>
  );
}
