import RankingItem from "./RankingItem";
const jobs = [
  {
    id: 1,
    applications: 245,
    title: "Senior Full Stack Developer",
    company: "Tech Solutions",
  },
  {
    id: 2,
    applications: 198,
    title: "UI/UX Designer",
    company: "Creative Agency",
  },
  {
    id: 3,
    applications: 176,
    title: "Data Scientist",
    company: "Analytics Corp",
  },
  {
    id: 4,
    applications: 154,
    title: "DevOps Engineer",
    company: "Cloud Systems",
  },
  {
    id: 5,
    applications: 132,
    title: "Product Manager",
    company: "StartupX",
  },
];
export default function TopJobsCard() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60">
      <div className="mb-4 text-right">
        <h3 className="text-lg font-semibold text-slate-900">
          الوظائف الأكثر تقديمًا
        </h3>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => (
          <RankingItem
            key={job.id}
            value={job.applications}
            valueLabel="applications"
            title={job.title}
            subtitle={job.company}
            valueColor="text-blue-600"
          />
        ))}
      </div>
    </div>
  );
}
