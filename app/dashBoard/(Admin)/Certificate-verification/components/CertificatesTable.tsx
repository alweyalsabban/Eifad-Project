"use client";

import { useMemo, useState } from "react";
import CertificateRow from "./CertificateRow";
import CertificatePreviewModal from "./CertificatePreviewModal";
import CertificateAnalysisModal from "./CertificateAnalysisModal";
import type { CertificateDecision, CertificateItem } from "../../TypeAdmin";

type Props = {
  data: CertificateItem[];
};

export default function CertificatesTable({ data }: Props) {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(
    null,
  );
  const [openPreview, setOpenPreview] = useState(false);
  const [openAnalysis, setOpenAnalysis] = useState(false);

  const [decisions, setDecisions] = useState<
    Record<number, CertificateDecision>
  >(
    () =>
      Object.fromEntries(data.map((item) => [item.id, "pending"])) as Record<
        number,
        CertificateDecision
      >,
  );

  const selectedDecision = useMemo(() => {
    if (!selectedCert) return "pending";
    return decisions[selectedCert.id] ?? "pending";
  }, [selectedCert, decisions]);

  function handleView(cert: CertificateItem) {
    setSelectedCert(cert);
    setOpenPreview(true);
  }

  function handleAnalysis(cert: CertificateItem) {
    setSelectedCert(cert);
    setOpenAnalysis(true);
  }

  function handleAccept(id: number) {
    setDecisions((prev) => ({ ...prev, [id]: "accepted" }));
  }

  function handleReject(id: number) {
    setDecisions((prev) => ({ ...prev, [id]: "rejected" }));
  }

  function handleUndo() {
    if (!selectedCert) return;
    setDecisions((prev) => ({ ...prev, [selectedCert.id]: "pending" }));
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border bg-white">
        <table className="w-full text-right">
          <thead className="bg-gray-50 text-sm font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-3">المستخدم</th>
              <th className="px-4 py-3">اسم الشهادة</th>
              <th className="px-4 py-3">الجهة المصدرة</th>
              <th className="px-4 py-3">تاريخ الرفع</th>
              <th className="px-4 py-3">الحالة</th>
              <th className="px-4 py-3">درجة ثقة الذكاء الاصطناعي</th>
              <th className="px-4 py-3">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {data.map((cert) => (
              <CertificateRow
                key={cert.id}
                cert={cert}
                decision={decisions[cert.id] ?? "pending"}
                onView={handleView}
                onAnalysis={handleAnalysis}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            ))}
          </tbody>
        </table>
      </div>

      <CertificatePreviewModal
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        certificate={selectedCert}
        decision={selectedDecision}
        onAccept={() => selectedCert && handleAccept(selectedCert.id)}
        onReject={() => selectedCert && handleReject(selectedCert.id)}
        onUndo={handleUndo}
      />

      <CertificateAnalysisModal
        open={openAnalysis}
        onClose={() => setOpenAnalysis(false)}
        certificate={selectedCert}
      />
    </>
  );
}
