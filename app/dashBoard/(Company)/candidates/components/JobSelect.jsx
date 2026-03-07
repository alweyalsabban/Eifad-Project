export default function JobSelect({ value, onChange, jobs }) {
  return (
    <div dir="rtl" className="w-full">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        اختر الوظيفة
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm
        text-gray-700 outline-none focus:border-blue-500 focus:ring-0"
      >
        <option value="">اختر الوظيفة</option>

        {jobs.map((job) => (
          <option key={job.id} value={job.id}>
            {job.title}
          </option>
        ))}
      </select>
    </div>
  );
}
