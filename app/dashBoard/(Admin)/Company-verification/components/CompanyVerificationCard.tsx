"use client";

import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { Brain } from "lucide-react";
import CompanyCardHeader from "./CompanyCardHeader";
import CompanyInfoList from "./CompanyInfoList";
import AnalysisScoreBar from "./AnalysisScoreBar";
import DecisionActions from "./DecisionActions";
import CompanyProfileModal from "./CompanyProfileModal";
import CompanyAnalysisModal from "./CompanyAnalysisModal";

type VerificationStatus = "موثق" | "قيد الانتظار";
type DecisionStatus = "pending" | "accepted" | "rejected";

type CompanyDocument = {
  id: number;
  name: string;
};

type Company = {
  id: number;
  name: string;
  registrationNumber: string;
  industry: string;
  employees: string;
  website: string;
  verificationStatus: VerificationStatus;
  decisionStatus?: DecisionStatus;
  icon?: string;
  analysisScore: number;
  documents: CompanyDocument[];
  analysis: {
    score: number;
    missingInfo: string[];
    riskLevel: "منخفض" | "متوسط" | "مرتفع";
    aiRecommendation: "قبول" | "مراجعة" | "رفض";
  };
};

type Props = {
  company: Company;
};

export default function CompanyVerificationCard({ company }: Props) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [decision, setDecision] = useState<DecisionStatus>(
    company.decisionStatus ?? "pending",
  );

  return (
    <>
      <div
        dir="rtl"
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
      >
        <CompanyCardHeader
          name={company.name}
          registrationNumber={company.registrationNumber}
          icon={company.icon}
          verificationStatus={company.verificationStatus}
          decision={decision}
        />

        <CompanyInfoList
          industry={company.industry}
          employees={company.employees}
        />

        <div className="mt-4">
          <AnalysisScoreBar score={company.analysisScore} />
        </div>

        <div className="mt-5 space-y-3">
          <button
            type="button"
            onClick={() => setProfileOpen(true)}
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-50"
          >
            <FiEye size={16} />
            <span>عرض الملف الشخصي</span>
          </button>

          <button
            type="button"
            onClick={() => setAnalysisOpen(true)}
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-50"
          >
            <Brain size={16} />
            <span>تحليل المستندات بالذكاء الاصطناعي</span>
          </button>
        </div>

        <div className="mt-5">
          <DecisionActions
            decision={decision}
            onAccept={() => setDecision("accepted")}
            onReject={() => setDecision("rejected")}
            onUndo={() => setDecision("pending")}
          />
        </div>
      </div>

      <CompanyProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        company={company}
      />

      <CompanyAnalysisModal
        open={analysisOpen}
        onClose={() => setAnalysisOpen(false)}
        company={company}
      />
    </>
  );
}
