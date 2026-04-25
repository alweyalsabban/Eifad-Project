"use client";

import { useRouter } from "next/navigation";
import { FiMapPin, FiBriefcase } from "react-icons/fi";

function getId(employee) {
  return employee?.id ?? employee?.JobSeekerID ?? employee?.user_id;
}

function getName(employee) {
  return (
    employee?.FullName ??
    employee?.full_name ??
    employee?.name ??
    "موظف بدون اسم"
  );
}

function getTitle(employee) {
  return (
    employee?.JobTitle ??
    employee?.job_title ??
    employee?.title ??
    employee?.ProfileSummary ??
    employee?.profile_summary ??
    "باحث عن عمل"
  );
}

function getLocation(employee) {
  return employee?.Location ?? employee?.location ?? "غير محدد";
}

function getExperience(employee) {
  return (
    employee?.experience ??
    employee?.Experience ??
    employee?.years_of_experience ??
    "غير محدد"
  );
}

function getSkills(employee) {
  const skills = employee?.skills ?? employee?.Skills ?? [];

  if (!Array.isArray(skills)) return [];

  return skills.map(
    (skill) => skill?.skill_name ?? skill?.SkillName ?? skill?.name ?? skill,
  );
}

export default function CandidateSimpleCard({ employee }) {
  const router = useRouter();

  const id = getId(employee);
  const name = getName(employee);
  const title = getTitle(employee);
  const location = getLocation(employee);
  const experience = getExperience(employee);
  const skills = getSkills(employee);

  return (
    <div
      dir="rtl"
      className="w-full rounded-3xl mt-5 border border-slate-200 bg-white p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl text-white">
            👨‍💻
          </div>

          <div className="text-right">
            <h3 className="text-[20px] font-extrabold text-slate-900">
              {name}
            </h3>

            <p className="mt-1 text-[16px] text-slate-600">{title}</p>

            <div className="mt-2 flex flex-wrap items-center justify-end gap-3 text-[15px] text-slate-500">
              <div className="flex items-center gap-1">
                <span>{experience}</span>
                <FiBriefcase className="text-[15px]" />
              </div>

              <span className="text-slate-300">•</span>

              <div className="flex items-center gap-1">
                <span>{location}</span>
                <FiMapPin className="text-[15px]" />
              </div>
            </div>
          </div>
        </div>

        <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-[14px] font-bold text-emerald-700">
          متاح
        </span>
      </div>

      {skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="rounded-xl bg-slate-100 px-4 py-2 text-[14px] text-slate-600"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="my-5 h-px w-full bg-slate-200" />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push(`/dashBoard/search-employee/${id}`)}
          className="h-11 flex-1 rounded-xl bg-blue-600 px-6 text-[16px] font-medium text-white transition hover:bg-blue-700"
        >
          عرض الملف
        </button>

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
