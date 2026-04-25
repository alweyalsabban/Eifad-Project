import { FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

export default function VerificationAlert({ isVerified }) {
  if (isVerified) {
    return (
      <div className="rounded-[20px] border border-emerald-200 bg-emerald-50 px-5 py-4 mt-5">
        <div className="flex items-start justify-between gap-4">
          <FiCheckCircle className="mt-1 text-[26px] text-emerald-600" />

          <div className="flex-1 text-right">
            <h3 className="text-[18px] font-extrabold text-emerald-700">
              شركة موثقة
            </h3>
            <p className="mt-1 text-[13px] text-emerald-700/90">
              تم التحقق من شركتك بنجاح. يمكنك الآن الوصول لجميع الميزات.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[20px] border border-yellow-200 bg-yellow-50 px-5 py-4 mt-5">
      <div className="flex items-start justify-between gap-4">
        <FiAlertTriangle className="mt-1 text-[26px] text-yellow-600" />

        <div className="flex-1 text-right">
          <h3 className="text-[18px] font-extrabold text-yellow-700">
            لم يتم التحقق بعد
          </h3>
          <p className="mt-1 text-[13px] text-yellow-700/90">
            إرفع البيانات المطلوبة من أجل التحقق من شركتك.
          </p>
        </div>
      </div>
    </div>
  );
}
