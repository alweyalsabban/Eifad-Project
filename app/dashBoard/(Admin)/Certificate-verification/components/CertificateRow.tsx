"use client";

import StatusBadge from "./StatusBadge";
import ScoreBar from "./ScoreBar";
import RowActions from "./RowActions";
import type { CertificateDecision, CertificateItem } from "../../TypeAdmin";

type Props = {
  cert: CertificateItem;
  decision: CertificateDecision;
  onView: (cert: CertificateItem) => void;
  onAnalysis: (cert: CertificateItem) => void;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
};

function DecisionBadge({ decision }: { decision: CertificateDecision }) {
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
}: Props) {
  return (
    <tr className="border-t text-sm transition hover:bg-gray-50">
      <td className="px-4 py-3 whitespace-nowrap">{cert.user}</td>
      <td className="px-4 py-3 whitespace-nowrap">{cert.name}</td>
      <td className="px-4 py-3 whitespace-nowrap">{cert.provider}</td>
      <td className="px-4 py-3 whitespace-nowrap">{cert.date}</td>

      <td className="px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={cert.status} />
          <DecisionBadge decision={decision} />
        </div>
      </td>

      <td className="px-4 py-3">
        <ScoreBar score={cert.score} />
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
