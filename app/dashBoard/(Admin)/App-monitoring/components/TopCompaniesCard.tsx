import RankingItem from "./RankingItem";
const companies = [
  {
    id: 1,
    hires: 45,
    name: "Tech Solutions Ltd",
    applications: 523,
  },
  {
    id: 2,
    hires: 38,
    name: "Digital Marketing Agency",
    applications: 412,
  },
  {
    id: 3,
    hires: 32,
    name: "Analytics Corp",
    applications: 389,
  },
  {
    id: 4,
    hires: 28,
    name: "Cloud Systems Inc",
    applications: 298,
  },
  {
    id: 5,
    hires: 25,
    name: "StartupX",
    applications: 267,
  },
];
export default function TopCompaniesCard() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60">
      <div className="mb-4 text-right">
        <h3 className="text-lg font-semibold text-slate-900">
          أفضل الشركات في التوظيف
        </h3>
      </div>

      <div className="space-y-3">
        {companies.map((company) => (
          <RankingItem
            key={company.id}
            value={company.hires}
            valueLabel="hires"
            title={company.name}
            subtitle={`total applications ${company.applications}`}
            valueColor="text-emerald-600"
          />
        ))}
      </div>
    </div>
  );
}
