import { FiCheckCircle } from "react-icons/fi";

export default function VerificationAlert({
  title = "شركة موثقة",
  description = "تم التحقق من شركتك بنجاح. يمكنك الآن الوصول لجميع الميزات.",
}) {
  return (
    <div className="rounded-[20px] border border-emerald-200 bg-emerald-50 px-5 py-4 mt-5">
      <div className="flex items-start justify-between gap-4">
        <FiCheckCircle className="mt-1 text-[26px] text-emerald-600" />

        <div className="flex-1 text-right">
          <h3 className="text-[18px] font-extrabold text-emerald-700">
            {title}
          </h3>
          <p className="mt-1 text-[13px] text-emerald-700/90">{description}</p>
        </div>
      </div>
    </div>
  );
}
