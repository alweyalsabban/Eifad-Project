"use client";

import { Brain } from "lucide-react";
import ModalShell from "./ModalShell";

type Analysis = {
  score: number;
  missingInfo: string[];
  riskLevel: string;
  aiRecommendation: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  company: {
    analysis: Analysis;
  };
};

function getColor(score: number) {
  if (score >= 80) return { text: "text-green-600", bar: "bg-green-600" };
  if (score >= 60) return { text: "text-yellow-600", bar: "bg-yellow-500" };
  return { text: "text-red-600", bar: "bg-red-600" };
}

export default function CompanyAnalysisModal({
  open,
  onClose,
  company,
}: Props) {
  const styles = getColor(company.analysis.score);

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="تحليل المستندات"
      icon={<Brain size={18} />}
    >
      {/* Score */}
      <div className="mb-6">
        <p className="mb-2 text-sm text-gray-500">درجة الأصالة</p>

        <div className="flex items-center gap-3">
          <div className="h-2 flex-1 rounded-full bg-gray-200">
            <div
              className={`h-2 rounded-full ${styles.bar}`}
              style={{ width: `${company.analysis.score}%` }}
            />
          </div>

          <span className={`text-sm font-bold ${styles.text}`}>
            {company.analysis.score}%
          </span>
        </div>
      </div>

      {/* Missing */}
      <div className="mb-6">
        <p className="mb-2 text-sm text-gray-500">معلومات مفقودة</p>

        {company.analysis.missingInfo.length ? (
          <ul className="space-y-1">
            {company.analysis.missingInfo.map((item) => (
              <li key={item} className="text-sm text-orange-600">
                • {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">لا يوجد</p>
        )}
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
        <div>
          <p className="text-xs text-gray-500">المخاطر</p>
          <span className="text-sm font-semibold text-green-600">
            {company.analysis.riskLevel}
          </span>
        </div>

        <div>
          <p className="text-xs text-gray-500">توصية AI</p>
          <span className="text-sm font-semibold text-green-600">
            {company.analysis.aiRecommendation}
          </span>
        </div>
      </div>
    </ModalShell>
  );
}
