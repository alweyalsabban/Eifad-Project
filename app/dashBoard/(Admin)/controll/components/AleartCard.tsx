import { StatusCardProps } from "../../TypeAdmin";

export default function AleartCard({
  title,
  value,
  icon: Icon,
  borderColor,
  iconColor = "text-black",
}: StatusCardProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-2xl border-2 w-full 
       p-6 duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.12)] hover:-translate-y-1 ${borderColor}`}
    >
      <div>
        <Icon size={30} className={iconColor} />
      </div>

      <div className="text-right">
        <p className="text-2xl font-bold text-[#0d1b3d]">{value}</p>
        <p className="mt-1 text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );
}
