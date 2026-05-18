"use client";

import StatusBadge from "./StatusBadge";
import ScoreBar from "./ScoreBar";
import RowActions from "./RowActions";



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
        </div>
      </td>

      <td className="px-4 py-3">
        <ScoreBar
          score={cert?.ExtractedData?.ai_result?.confidence_score ?? "--"}
        />
      </td>

      <td className="px-4 py-3">
        <RowActions
          showDecision={true}
          onView={() => onView(cert)}
          onAnalysis={() => onAnalysis(cert)}
          onAccept={() => onAccept(cert.CertificationID)}
          onReject={() => onReject(cert.CertificationID)}
        />
      </td>
    </tr>
  );
}
