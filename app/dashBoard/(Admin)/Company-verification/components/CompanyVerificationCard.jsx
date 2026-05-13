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
import { toast } from "react-toastify";
import { ApiFetchServer } from "@/app/lib/ApiFetchServer";

export default function CompanyVerificationCard({ company }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [decision, setDecision] = useState(
    company.VerificationStatus ?? "Pending",
  );

  /// functions

  const handleVerified = async (action) => {
    console.log(action);
    const res = await ApiFetchServer(
      `/admin/companies/${company.CompanyID}/verify`,
      "PUT",
      {
        status: action,
      },
    );
    toast.success(res.dataResponse.message);
    setDecision(action);
  };

  return (
    <>
      <div
        dir="rtl"
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
      >
        <CompanyCardHeader
          name={company.CompanyName}
          registrationNumber={20327535637890}
          logoPath={company.LogoPath}
          verificationStatus={company.IsCompanyVerified}
          decision={decision}
        />

        <CompanyInfoList
          industry={company.FieldOfWork}
          employees={company.EmployeeCount}
        />

        {/*  <div className="mt-4">
          <AnalysisScoreBar score={company.analysisScore} />
        </div> */}

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
            onAccept={() => handleVerified("Verified")}
            onReject={() => handleVerified("Rejected")}
            onUndo={() => setDecision("Pending")}
          />
        </div>
      </div>

      <CompanyProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        company={company}
      />

      {/*    <CompanyAnalysisModal
        open={analysisOpen}
        onClose={() => setAnalysisOpen(false)}
        company={company}
      /> */}
    </>
  );
}
