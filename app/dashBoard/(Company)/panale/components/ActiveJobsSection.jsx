export default function ActiveJobsSection({ title, children }) {
  return (
    <section className="mx-auto mt-5 w-[98%] rounded-2xl border border-slate-200 bg-white p-4  md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-slate-900">{title}</h2>

        <button
          className="text-sm font-medium text-blue-500 transition 
        hover:text-blue-600 hover:underline hover:cursor-pointer"
        >
          عرض الكل
        </button>
      </div>

      <div className="space-y-5">{children}</div>
    </section>
  );
}
