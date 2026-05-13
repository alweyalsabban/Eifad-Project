import StatusTag from "./StatusTag";
import Image from "next/image";

export default function CompanyCardHeader({
  name,
  registrationNumber,
  logoPath,
  verificationStatus,
  decision,
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div className="flex  gap-3 ">
        {logoPath?.length > 40 ? (
          <Image
            src={logoPath}
            alt={name}
            width={1000}
            height={1000}
            className="w-15 h-15 rounded-lg object-cover border border-auxiliaryColorGray "
          />
        ) : (
          <span className="text-3xl leading-none bg-primaryBlue w-15 h-15 rounded-lg text-white flex items-center justify-center">
            E
          </span>
        )}
        <div>
          <h3 className="text-xl font-bold text-[#0f172a]">
            {name || "بدون اسم"}
          </h3>
          <p className="mt-1 text-sm text-slate-600">{registrationNumber}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <StatusTag variant={decision} />
      </div>
    </div>
  );
}
