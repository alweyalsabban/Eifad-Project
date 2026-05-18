type Props = {
  industry: string;
  employees: string;
};

export default function CompanyInfoList({ industry, employees }: Props) {
  return (
    <div className="space-y-3 text-right">
      <div>
        <p className="text-sm text-slate-500">مجال العمل</p>
        <p className="text-lg font-medium text-black">
          {industry || "لا يوجد"}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-500">عدد الموظفين</p>
        <p className="text-lg font-medium text-black">
          {employees || "لا يوجد"}
        </p>
      </div>
    </div>
  );
}
