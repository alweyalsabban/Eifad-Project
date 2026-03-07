import { FiMapPin, FiBriefcase } from "react-icons/fi";

export default function CandidateSimpleCard({
  name = "محمد عبدالله",
  title = "مطور ويب متكامل",
  experience = "4 سنوات",
  location = "الرياض",
  status = "متاح",
  skills = ["React", "Node.js", "MongoDB"],
  avatar = "👨‍💻",
  onViewProfile,
  onContact,
}) {
  return (
    <div
      dir="rtl"
      className="w-full rounded-3xl mt-5 border border-slate-200 bg-white p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl text-white">
            {avatar}
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
          {status}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-xl bg-slate-100 px-4 py-2 text-[14px] text-slate-600"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="my-5 h-px w-full bg-slate-200" />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onViewProfile}
          className="h-11 flex-1 rounded-xl bg-blue-600 px-6 text-[16px] font-medium text-white transition hover:bg-blue-700"
        >
          عرض الملف
        </button>

        <button
          type="button"
          onClick={onContact}
          className="h-11 rounded-xl border border-slate-300 bg-white px-6 text-[16px] font-medium text-slate-700 transition hover:bg-slate-50"
        >
          تواصل
        </button>
      </div>
    </div>
  );
}
