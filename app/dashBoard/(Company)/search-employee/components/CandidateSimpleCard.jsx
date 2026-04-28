import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export default function CandidateSimpleCard({ employee }) {
  return (
    <div
      dir="rtl"
      className="w-full rounded-3xl mt-5 border border-slate-200 bg-white p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-[10%_auto] flex-wrap gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl text-white">
          {employee?.PersonalPhoto?.length > 20 ? (
            <Image
              alt="profile photo"
              src={employee?.PersonalPhoto ?? ""}
              width={200}
              height={200}
              className=" h-16 w-16  rounded-full object-cover"
            />
          ) : (
            "E"
          )}
        </div>

        <div>
          <h3 className="text-[20px] font-extrabold text-slate-900">
            {employee?.user?.FullName}
          </h3>

          <p className="mt-1 text-[16px] text-slate-600 ">
            {employee?.ProfileSummary}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-[15px] text-slate-500">
            <div className="flex items-center gap-1">
              <FiPhone />
              {employee?.user?.Phone}
            </div>

            <div className="flex items-center gap-1">
              <FiMail />
              {employee?.user?.Email}
            </div>

            <div className="flex items-center gap-1">
              <FiMapPin className="text-[15px]" />
              <span>{employee?.Location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5 h-px w-full bg-slate-200" />

      <div className="flex items-center gap-3">
        <Link
          href={`/dashBoard/search-employee/${employee.JobSeekerID}`}
          className="h-11 flex-1 rounded-xl bg-blue-600 px-6 text-[16px] font-medium 
          text-white transition hover:bg-blue-700 justify-center items-center flex"
        >
          عرض الملف
        </Link>

        <button
          type="button"
          className="h-11 rounded-xl border border-slate-300 bg-white px-6 text-[16px] font-medium text-slate-700 transition hover:bg-slate-50"
        >
          تواصل
        </button>
      </div>
    </div>
  );
}
