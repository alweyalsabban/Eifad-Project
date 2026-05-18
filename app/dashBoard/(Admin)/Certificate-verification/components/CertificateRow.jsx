"use client";

import StatusBadge from "./StatusBadge";
import ScoreBar from "./ScoreBar";
import RowActions from "./RowActions";

function DecisionBadge({ decision }) {
  if (decision === "accepted") {
    return (
      <span className="inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
        مقبول
      </span>
    );
  }

  if (decision === "rejected") {
    return (
      <span className="inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
        مرفوض
      </span>
    );
  }

  return null;
}

export default function CertificateRow({
  cert,
  decision,
  onView,
  onAnalysis,
  onAccept,
  onReject,
}) {
  return (
    <tr className="border-t text-sm transition hover:bg-gray-50">
      <td className="px-4 py-3 whitespace-nowrap">
        {cert.cv.job_seeker.user.FullName}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">{cert.CertificateName}</td>
      <td className="px-4 py-3 whitespace-nowrap">
        {cert.IssuingOrganization}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        {cert.updated_at.slice(0, 10)}
      </td>

      <td className="px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={cert.VerificationStatus} />
          <DecisionBadge decision={cert.VerificationStatus} />
        </div>
      </td>

      <td className="px-4 py-3">
        <ScoreBar
          score={cert?.ExtractedData?.ai_result?.confidence_score ?? "--"}
        />
      </td>

      <td className="px-4 py-3">
        <RowActions
          showDecision={decision === "pending"}
          onView={() => onView(cert)}
          onAnalysis={() => onAnalysis(cert)}
          onAccept={() => onAccept(cert.id)}
          onReject={() => onReject(cert.id)}
        />
      </td>
    </tr>
  );
}
