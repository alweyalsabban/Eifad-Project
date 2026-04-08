import { tInfoCard } from "../../TypeAdmin";

export default function InfoCard({
  title,
  value,
  description,
  icon: Icon,
  iconBg,
}: tInfoCard) {
  return (
    <div
      className="w-full rounded-2xl border border-gray-200 bg-auxiliaryColorWhite 
    p-5 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.12)] hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-4" dir="rtl">
        <div className="flex-1 text-right">
          <h3 className="text-[15px] font-medium text-gray-600">{title}</h3>

          <p className="mt-2 text-3xl font-bold leading-none text-[#0d1b3d]">
            {value}
          </p>

          <p className="mt-3 text-sm font-medium text-green-500">
            {description}
          </p>
        </div>

        <div
          className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl text-white"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
