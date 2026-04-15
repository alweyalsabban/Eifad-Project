"use client";

import { X, Brain, Award, Undo2 } from "lucide-react";
import { FaCheck, FaXmark } from "react-icons/fa6";

export type CertificateDecision = "pending" | "accepted" | "rejected";
export type CertificateStatus = "موثق" | "قيد الانتظار";

export type CertificateItem = {
  id: number;
  user: string;
  name: string;
  provider: string;
  date: string;
  status: CertificateStatus;
  score: number;
  certificateId?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  certificate: CertificateItem | null;
  decision: CertificateDecision;
  onAccept: () => void;
  onReject: () => void;
  onUndo: () => void;
};

function getScoreStyles(score: number) {
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

function Badge({
  text,
  variant,
}: {
  text: string;
  variant: "success" | "warning" | "danger";
}) {
  const styles = {
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles[variant]}`}
    >
      {text}
    </span>
  );
}

export default function CertificatePreviewModal({
  open,
  onClose,
  certificate,
  decision,
  onAccept,
  onReject,
  onUndo,
}: Props) {
  if (!open || !certificate) return null;

  const scoreStyles = getScoreStyles(certificate.score);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        dir="rtl"
        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100"
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2">
            <Award size={18} />
            <h3 className="text-xl font-bold">عرض الشهادة</h3>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-blue-500/90 bg-slate-50 p-6 text-center">
          <Award size={56} className="mx-auto mb-5 text-blue-600" />

          <h2 className="text-2xl font-bold text-slate-900">
            {certificate.name}
          </h2>

          <p className="mt-4 text-xl text-slate-600">Awarded to</p>

          <p className="mt-3 text-2xl font-bold text-blue-600">
            {certificate.user}
          </p>

          <div className="my-5 border-t border-gray-200" />

          <div className="space-y-1 text-base text-slate-700">
            <p>Issued by: {certificate.provider}</p>
            <p>Date: {certificate.date}</p>
            <p>ID: {certificate.certificateId ?? `CERT-${certificate.id}`}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="text-right">
            <p className="mb-1 text-sm text-slate-500">المستخدم</p>
            <p className="text-2xl font-semibold">{certificate.user}</p>
          </div>

          <div className="text-right">
            <p className="mb-1 text-sm text-slate-500">تاريخ الرفع</p>
            <p className="text-2xl font-semibold">{certificate.date}</p>
          </div>

          <div className="text-right">
            <p className="mb-2 text-sm text-slate-500">الحالة</p>

            <div className="flex flex-wrap justify-end gap-2">
              <Badge
                text={certificate.status}
                variant={certificate.status === "موثق" ? "success" : "warning"}
              />

              {decision === "accepted" && (
                <Badge text="مقبول" variant="success" />
              )}

              {decision === "rejected" && (
                <Badge text="مرفوض" variant="danger" />
              )}
            </div>
          </div>

          <div className="text-right">
            <p className="mb-2 text-sm text-slate-500">
              درجة ثقة الذكاء الاصطناعي
            </p>

            <div className="flex items-center gap-2">
              <Brain size={16} className={scoreStyles.icon} />
              <div className="h-2.5 flex-1 rounded-full bg-gray-200">
                <div
                  className={`h-2.5 rounded-full ${scoreStyles.bar}`}
                  style={{ width: `${certificate.score}%` }}
                />
              </div>
              <span className={`text-sm font-bold ${scoreStyles.text}`}>
                {certificate.score}%
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-5">
          {decision === "pending" && (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onAccept}
                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-green-700"
              >
                <FaCheck size={14} />
                <span>قبول</span>
              </button>

              <button
                type="button"
                onClick={onReject}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-base font-semibold text-red-600 transition hover:bg-red-50"
              >
                <FaXmark size={14} />
                <span>رفض</span>
              </button>
            </div>
          )}

          {decision !== "pending" && (
            <button
              type="button"
              onClick={onUndo}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-gray-50"
            >
              <Undo2 size={16} />
              <span>تراجع</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
