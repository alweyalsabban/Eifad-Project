import { FiCheckCircle } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi2";

export default function RequiredDocumentsCard({
  title = "المستندات المطلوبة",
  documents = [],
}) {
  return (
    <div
      dir="rtl"
      className="rounded-[20px] border border-slate-200 bg-white px-4 py-5"
    >
      <h3 className="mb-5 text-right text-[18px] font-extrabold text-slate-900">
        {title}
      </h3>

      <div className="space-y-4">
        {documents.map((doc) => (
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
                <p className="text-[12px] text-slate-500">{doc.statusText}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-[20px] text-emerald-500" />

              <button
                type="button"
                className="h-9 rounded-xl border border-slate-300 bg-white px-4 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
              >
                عرض
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
