"use client";

import { FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi2";

function getStatusText(status, uploaded) {
  if (!uploaded) return "لم يتم رفع الملف";
  if (status === "verified") return "تم التحقق";
  if (status === "rejected") return "تم الرفض - إرفع ملف حقيقي";
  return "جاري التحقق";
}

export default function RequiredDocumentsCard({
  title = "المستندات المطلوبة",
  documents = [],
  onUpload,
}) {
  function viewFile(doc) {
    if (!doc.fileUrl && !doc.url && !doc.file_url) {
      alert("الملف غير موجود");
      return;
    }

    window.open(doc.fileUrl ?? doc.url ?? doc.file_url, "_blank");
  }

  return (
    <div
      dir="rtl"
      className="rounded-[20px] border border-slate-200 bg-white px-4 py-5"
    >
      <h3 className="mb-5 text-right text-[18px] font-extrabold text-slate-900">
        {title}
      </h3>

      <div className="space-y-4">
        {documents.map((doc) => {
          const uploaded = Boolean(
            doc.uploaded || doc.fileUrl || doc.url || doc.file_url,
          );
          const isOk = uploaded && doc.status === "verified";

          return (
            <div
              key={doc.id}
              className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <HiOutlineDocumentText className="text-[22px]" />
                </div>

                <div className="text-right">
                  <h4 className="text-[16px] font-bold text-slate-900">
                    {doc.name}
                  </h4>
                  <p className="text-[12px] text-slate-500">
                    {getStatusText(doc.status, uploaded)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {uploaded ? (
                  <FiCheckCircle className="text-[20px] text-emerald-500" />
                ) : (
                  <FiAlertTriangle className="text-[20px] text-yellow-500" />
                )}

                <label className="h-9 cursor-pointer rounded-xl border border-blue-300 bg-white px-4 leading-9 text-[13px] font-medium text-blue-600 hover:bg-blue-50">
                  رفع الملف
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => onUpload(doc.id, e.target.files?.[0])}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => viewFile(doc)}
                  className="h-9 rounded-xl border border-slate-300 bg-white px-4 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
                >
                  عرض
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
