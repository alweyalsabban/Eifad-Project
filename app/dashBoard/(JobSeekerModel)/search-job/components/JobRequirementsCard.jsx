"use client";

export default function JobRequirementsCard({ title, requirements = [] }) {
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 mt-5">
      <h3 className="text-right text-lg font-semibold text-slate-900">
        {title}
      </h3>

      <ul className="mt-4 space-y-3">
        {requirements.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-slate-700">
            {/* bullet */}
            <span className="mt-2 h-2 w-2 rounded-full bg-blue-600"></span>

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
