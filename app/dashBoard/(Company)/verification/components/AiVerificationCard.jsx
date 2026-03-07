import { FiShield } from "react-icons/fi";

export default function AiVerificationCard({
  title = "التحقق بالذكاء الاصطناعي",
  subtitle = "مستوى الثقة",
  progress = 95,
  description = "تم التحقق من جميع المستندات تلقائياً بنسبة ثقة عالية",
}) {
  return (
    <div
      dir="rtl"
      className="rounded-[20px] bg-linear-to-l from-emerald-500 to-emerald-600 px-5 py-5 text-white"
    >
      <div className="flex items-start justify-between gap-4">
        <FiShield className="mt-1 text-[22px] text-white/95" />

        <div className="flex-1 text-right">
          <h3 className="text-[28px] font-extrabold leading-tight">{title}</h3>
          <p className="mt-2 text-[15px] text-white/90">{subtitle}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 text-left text-[32px] font-extrabold">
          %{progress}
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-white/35">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-4 text-right text-[13px] text-white/90">
          {description}
        </p>
      </div>
    </div>
  );
}
