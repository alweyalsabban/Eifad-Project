"use client";

export default function JobDescriptionCard({ title, description }) {
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 mt-5">
      <h3 className="text-right text-lg font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-4 text-right leading-7 text-slate-600">{description}</p>
    </section>
  );
}
