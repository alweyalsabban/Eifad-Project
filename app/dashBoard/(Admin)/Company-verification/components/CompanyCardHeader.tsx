import StatusTag from "./StatusTag";

type Props = {
  name: string;
  registrationNumber: string;
  icon?: string;
  verificationStatus: "موثق" | "قيد الانتظار";
  decision: "pending" | "accepted" | "rejected";
};

export default function CompanyCardHeader({
  name,
  registrationNumber,
  icon,
  verificationStatus,
  decision,
}: Props) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <StatusTag
          text={verificationStatus}
          variant={verificationStatus === "موثق" ? "success" : "warning"}
        />

        {decision === "accepted" && (
          <StatusTag text="مقبول" variant="success" />
        )}

        {decision === "rejected" && <StatusTag text="مرفوض" variant="danger" />}
      </div>

      <div className="flex items-start gap-3 text-right">
        <span className="text-3xl leading-none">{icon ?? "🏢"}</span>

        <div>
          <h3 className="text-xl font-bold text-[#0f172a]">{name}</h3>
          <p className="mt-1 text-sm text-slate-600">{registrationNumber}</p>
        </div>
      </div>
    </div>
  );
}
