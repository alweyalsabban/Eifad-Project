type Props = {
  industry: string;
  employees: string;
};

export default function CompanyInfoList({ industry, employees }: Props) {
  return (
    <div className="space-y-3 text-right">
      <div>
        <p className="text-sm text-slate-500">Industry</p>
        <p className="text-lg font-semibold text-black">{industry}</p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Employees</p>
        <p className="text-lg font-semibold text-black">{employees}</p>
      </div>
    </div>
  );
}
