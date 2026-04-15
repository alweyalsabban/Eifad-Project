"use client";

import TitlePage from "../controll/components/TitlePage";
import CompanyVerificationCard from "./components/CompanyVerificationCard";

const companies = [
  {
    id: 1,
    name: "Tech Solutions Ltd",
    registrationNumber: "CR-2023-001234",
    industry: "Technology",
    employees: "50-100",
    website: "https://www.techsolutions.com",
    verificationStatus: "قيد الانتظار" as const,
    decisionStatus: "pending" as const,
    icon: "🏢",
    analysisScore: 85,
    documents: [
      { id: 1, name: "Commercial Registration" },
      { id: 2, name: "Tax Certificate" },
      { id: 3, name: "Business License" },
    ],
    analysis: {
      score: 85,
      missingInfo: ["Tax ID verification"],
      riskLevel: "منخفض" as const,
      aiRecommendation: "قبول" as const,
    },
  },
  {
    id: 2,
    name: "Digital Marketing Agency",
    registrationNumber: "CR-2024-005678",
    industry: "Marketing",
    employees: "10-50",
    website: "https://www.digitalagency.com",
    verificationStatus: "موثق" as const,
    decisionStatus: "pending" as const,
    icon: "🧮",
    analysisScore: 92,
    documents: [
      { id: 1, name: "Commercial Registration" },
      { id: 2, name: "Tax Certificate" },
      { id: 3, name: "Business License" },
    ],
    analysis: {
      score: 92,
      missingInfo: [],
      riskLevel: "منخفض" as const,
      aiRecommendation: "قبول" as const,
    },
  },
  {
    id: 3,
    name: "Construction Co.",
    registrationNumber: "CR-2024-009876",
    industry: "Construction",
    employees: "+100",
    website: "https://www.constructionco.com",
    verificationStatus: "قيد الانتظار" as const,
    decisionStatus: "pending" as const,
    icon: "🏗️",
    analysisScore: 45,
    documents: [
      { id: 1, name: "Commercial Registration" },
      { id: 2, name: "Tax Certificate" },
      { id: 3, name: "Business License" },
    ],
    analysis: {
      score: 45,
      missingInfo: ["Tax ID verification"],
      riskLevel: "مرتفع" as const,
      aiRecommendation: "مراجعة" as const,
    },
  },
];

export default function Page() {
  return (
    <div className="p-6" dir="rtl">
      <TitlePage title="التحقق من الشركات" number={3} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {companies.map((company) => (
          <CompanyVerificationCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}
