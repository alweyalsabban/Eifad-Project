"use client";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { Brain, Loader2 } from "lucide-react";

export default function RowActions({
  showDecision = true,
  onView,
  onAnalysis,
  onAccept,
  onReject,
}) {
  const [loadingAction, setLoadingAction] = useState(null);

  const handleAccept = async () => {
    setLoadingAction("accept");
    await onAccept();
    setLoadingAction(null);
  };

  const handleReject = async () => {
    setLoadingAction("reject");
    await onReject();
    setLoadingAction(null);
  };

  return (
    <div className="flex items-center gap-3">
      {showDecision && (
        <>
          <button
            type="button"
            onClick={handleReject}
            disabled={loadingAction !== null}
            className="text-red-500 transition hover:text-red-600 disabled:opacity-50"
            aria-label="رفض"
            title="رفض"
          >
            {loadingAction === "reject" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <FaXmark size={16} />
            )}
          </button>

          <button
            type="button"
            onClick={handleAccept}
            disabled={loadingAction !== null}
            className="text-green-600 transition hover:text-green-700 disabled:opacity-50"
            aria-label="قبول"
            title="قبول"
          >
            {loadingAction === "accept" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <FaCheck size={16} />
            )}
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
