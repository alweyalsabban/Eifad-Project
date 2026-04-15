import { FiEye } from "react-icons/fi";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { Brain } from "lucide-react";

type Props = {
  showDecision?: boolean;
  onView?: () => void;
  onAnalysis?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
};

export default function RowActions({
  showDecision = true,
  onView,
  onAnalysis,
  onAccept,
  onReject,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      {showDecision && (
        <>
          <button
            type="button"
            onClick={onReject}
            className="text-red-500 transition hover:text-red-600"
            aria-label="رفض"
            title="رفض"
          >
            <FaXmark size={16} />
          </button>

          <button
            type="button"
            onClick={onAccept}
            className="text-green-600 transition hover:text-green-700"
            aria-label="قبول"
            title="قبول"
          >
            <FaCheck size={16} />
          </button>
        </>
      )}

      <button
        type="button"
        onClick={onAnalysis}
        className="text-gray-700 transition hover:text-black"
        aria-label="تحليل"
        title="تحليل"
      >
        <Brain size={16} />
      </button>

      <button
        type="button"
        onClick={onView}
        className="text-gray-700 transition hover:text-black"
        aria-label="عرض"
        title="عرض"
      >
        <FiEye size={16} />
      </button>
    </div>
  );
}
