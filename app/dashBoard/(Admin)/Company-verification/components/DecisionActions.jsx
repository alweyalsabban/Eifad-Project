import { FaCheck, FaXmark } from "react-icons/fa6";
import { Undo2 } from "lucide-react";

export default function DecisionActions({
  decision,
  onAccept,
  onReject,
  onUndo,
}) {
  if (decision === "Verified" || decision === "Rejected") {
    return (
      <button
        type="button"
        onClick={onUndo}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-gray-50"
      >
        <Undo2 size={16} />
        <span>تراجع</span>
      </button>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onAccept}
        className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
      >
        <FaCheck size={14} />
        <span>قبول</span>
      </button>

      <button
        type="button"
        onClick={onReject}
        className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
      >
        <FaXmark size={14} />
        <span>رفض</span>
      </button>
    </div>
  );
}
