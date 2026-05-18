"use client";

import { X, Brain, Award, Undo2 } from "lucide-react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { Loader2 } from "lucide-react";

import StatusBadge from "./StatusBadge";

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

export default function CertificatePreviewModal({
  open,
  onClose,
  certificate,
  decision,
  onAccept,
  onReject,
  onUndo,
  loader,
  rejectLoader,
}) {
  if (!open || !certificate) return null;

  const scoreStyles = getScoreStyles(
    certificate?.ExtractedData?.ai_result?.confidence_score,
  );
  const score = certificate?.ExtractedData?.ai_result?.confidence_score;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl scale-80 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award size={18} />
            <h3 className="text-xl font-bold">عرض الشهادة</h3>
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

        {certificate?.ExtractedData !== null ||
        certificate.FilePath !== null ? (
          <div className="">
            {/*          <Award size={56} className="mx-auto mb-5 text-blue-600" />

            <h2 className="text-2xl font-bold text-slate-900">
              {certificate.name}
            </h2>

            <p className="mt-4 text-xl text-slate-600">Awarded to</p>

            <p className="mt-3 text-2xl font-bold text-blue-600">
              {certificate.cv?.job_seeker?.user?.FullName ?? "لا يوجد اسم مدخل"}
            </p>

            <div className="my-5 border-t border-gray-200" />

            <div className="space-y-1 text-base text-slate-700" dir="ltr">
              <p>
                Issued by:
                <span className="mx-2">
                  {certificate.ExtractedData?.ai_result?.extracted_info
                    ?.issuer ?? "مجهول"}
                </span>
              </p>
              <p>
                Date:{" "}
                <span className="mx-2">
                  {certificate.ExtractedData?.ai_result?.extracted_info?.date ??
                    "لا يوجد"}
                </span>
              </p>
              <p>
                ID:{" "}
                <span className="mx-2">
                  {certificate.ExtractedData?.ai_result?.extracted_info
                    ?.credential_id ?? "لا يوجد"}
                </span>
              </p>
            </div>
            <button
              onClick={() => window.open(certificate?.FilePath, "_blank")}
              className="mt-2 bg-primaryBlue rounded-2xl p-2 text-white hover:cursor-pointer 
          hover:bg-blue-800 duration-500"
            >
              رؤية الشهادة
            </button> */}
            {certificate?.FilePath === null ? (
              <p className="text-red-600 ">لم يرفع صورة للشهادة</p>
            ) : (
              <>
                <iframe
                  src={`${certificate?.FilePath}`}
                  className="h-100 w-full rounded-2xl border-2 border-blue-500/90 bg-slate-50 text-center"
                />
                <button
                  onClick={() => window.open(certificate?.FilePath, "_blank")}
                  className="mt-2 bg-primaryBlue rounded-2xl p-2 text-white hover:cursor-pointer 
          hover:bg-blue-800 duration-500"
                >
                  رؤية الشهادة
                </button>
              </>
            )}
          </div>
        ) : (
          "لا يوجد شهادة مرفوعة"
        )}

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="text-right">
            <p className="mb-1 text-sm text-slate-500">المستخدم</p>
            <p className="text-2xl font-semibold">
              {certificate.cv.job_seeker.user.FullName}
            </p>
          </div>

          <div className="text-right">
            <p className="mb-1 text-sm text-slate-500">تاريخ الرفع</p>
            <p className="text-2xl font-semibold">
              {certificate.created_at.slice(0, 10)}
            </p>
          </div>

          <div className="text-right">
            <p className="mb-2 text-sm text-slate-500">الحالة</p>

            <div className="flex flex-wrap gap-2">
              <StatusBadge status={certificate.VerificationStatus} />
            </div>
          </div>

          <div className="text-right">
            <p className="mb-2 text-sm text-slate-500">
              درجة ثقة الذكاء الاصطناعي
            </p>

            {certificate?.ExtractedData?.ai_result?.confidence_score ? (
              <div className="flex items-center gap-2">
                <Brain size={16} className={scoreStyles.icon} />

                <div className="h-2.5 flex-1 rounded-full bg-gray-200">
                  <div
                    className={`h-2.5 rounded-full ${scoreStyles.bar}`}
                    style={{
                      width: `${certificate?.ExtractedData?.ai_result?.confidence_score}%`,
                    }}
                  />
                </div>

                <span className={`text-sm font-bold ${scoreStyles.text}`}>
                  {certificate?.ExtractedData?.ai_result?.confidence_score}%
                </span>
              </div>
            ) : (
              <p className="text-xl font-semibold">لا يوجد</p>
            )}
          </div>
        </div>

        <div className="mt-6 border-t pt-5">
          <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onAccept}
                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-green-700"
              >
                {loader ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <FaCheck size={14} />
                    <span>قبول</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onReject}
                disabled={rejectLoader}
                className={`flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 
                text-base font-semibold text-red-600 transition hover:bg-red-50 ${rejectLoader ? "cursor-not-allowed opacity-20" : "hover:cursor-pointer opacity-100"}`}
              >
                {rejectLoader ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <FaXmark size={14} />
                    <span>رفض</span>
                  </>
                )}
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
