import JobsList from "./JobsList";
export default function QuckliyAction({ name, NameData }) {
  return (
    <div
      className="w-full mb-4 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 flex-wrap"
      dir="ltr"
    >
      <div className="flex items-center justify-between">
        <button className="text-sm text-blue-600 hover:underline hover:cursor-pointer">
          عرض الكل
        </button>

        <h1 className="text-lg font-bold text-slate-900">{name}</h1>
      </div>

      <div className="space-y-3">
        {NameData.map((r) => (
          <JobsList
            key={r.id}
            status={r.status}
            title={r.title}
            company={r.company}
            timeAgo={r.timeAgo}
          />
        ))}
      </div>
    </div>
  );
}
