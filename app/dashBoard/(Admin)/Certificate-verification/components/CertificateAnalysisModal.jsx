"use client";

import { X, Brain, ShieldCheck, FileSearch } from "lucide-react";

function getScoreStyles(score) {
  if (score >= 80) {
    return {
      text: "text-green-600",
      bar: "bg-green-600",
      icon: "text-green-600",
    };
  }

  if (score >= 60) {
    return {
      text: "text-yellow-600",
      bar: "bg-yellow-500",
      icon: "text-yellow-600",
    };
  }

  return {
    text: "text-red-600",
    bar: "bg-red-600",
    icon: "text-red-600",
  };
}

export default function CertificateAnalysisModal({
  open,
  onClose,
  certificate,
}) {
  if (!open || !certificate) return null;
  console.log(" AI");
  console.log(certificate);

  const aiResult = certificate?.ExtractedData?.ai_result;
  const score = aiResult?.confidence_score ?? 0;
  const scoreStyles = getScoreStyles(score);

  const getRecommendationText = (rec) => {
    switch (rec) {
      case "approve":
        return "تبدو هذه الشهادة أصلية ويوصى بقبولها.";
      case "reject":
        return "هذه الشهادة مشبوهة أو غير صالحة، يوصى برفضها.";
      default:
        return "تحتاج هذه الشهادة إلى مراجعة يدوية للتحقق من صحتها.";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 "
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain size={18} />
            <h3 className="text-xl font-bold">فحص الشهادة بالذكاء الاصطناعي</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100"
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-6">
          <p className="mb-2 text-sm text-slate-500">
            درجة ثقة الذكاء الاصطناعي
          </p>

          <div className="flex items-center gap-3">
            <Brain size={16} className={scoreStyles.icon} />

            <div className="h-2.5 flex-1 rounded-full bg-gray-200">
              <div
                className={`h-2.5 rounded-full ${scoreStyles.bar}`}
                style={{ width: `${score}%` }}
              />
            </div>

            <span className={`text-sm font-bold ${scoreStyles.text}`}>
              {score}%
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-gray-50 p-5">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-lg font-semibold">التحقق من الجهة المصدرة</h4>
              <FileSearch size={18} className="text-blue-600" />
            </div>

            <p className="text-sm text-slate-600">
              {aiResult?.issuer_known
                ? "تم التعرف على الجهة المصدرة ( " +
                  (aiResult?.extracted_info?.issuer || "معروفة") +
                  " ) ومطابقتها بنجاح."
                : "تعذر التعرف على الجهة المصدرة ضمن قواعد البيانات الخاصة بنا."}
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-lg font-semibold">
                ملاحظات الذكاء الاصطناعي
              </h4>
              <Brain size={18} className="text-purple-600" />
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {aiResult?.notes || "لم يتم تسجيل أي ملاحظات إضافية."}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h4 className="mb-2 text-lg font-semibold">
              توصية الذكاء الاصطناعي
            </h4>

            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-slate-700">
                {getRecommendationText(aiResult?.recommendation)}
              </p>
              <ShieldCheck size={18} className="mt-0.5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
