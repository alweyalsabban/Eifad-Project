"use client";

import { useMemo, useState } from "react";
import CertificateRow from "./CertificateRow";
import CertificatePreviewModal from "./CertificatePreviewModal";
import CertificateAnalysisModal from "./CertificateAnalysisModal";
import { ApiFetchServer } from "@/app/lib/ApiFetchServer";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CertificatesTable({ data }) {
  const router = useRouter();
  const [selectedCert, setSelectedCert] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);
  const [openAnalysis, setOpenAnalysis] = useState(false);
  const [loader, setLoader] = useState(false);
  const [rejectLoader, setRejectLoader] = useState(false);

  const [decisions, setDecisions] = useState(() =>
    Object.fromEntries(data.map((item) => [item.id, "pending"])),
  );

  const selectedDecision = useMemo(() => {
    if (!selectedCert) return "pending";
    return decisions[selectedCert.id] ?? "pending";
  }, [selectedCert, decisions]);

  function handleView(cert) {
    setSelectedCert(cert);
    setOpenPreview(true);
  }

  function handleAnalysis(cert) {
    setSelectedCert(cert);
    setOpenAnalysis(true);
  }

  async function handleAccept(id) {
    setLoader(true);
    const res = await ApiFetchServer(`/admin/certificates/${id}/verify`, "PUT");
    toast.success("تم قبول الشهادة بنجاح");
    router.refresh();
    setLoader(false);
  }

  async function handleReject(id) {
    setRejectLoader(true);
    const res = await ApiFetchServer(
      `/admin/certificates/${id}/reject`,
      "PUT",
      { reason: "الشهادة غير صالحة أو مزورة" },
    );
    toast.success("تم رفض الشهادة بنجاح");
    router.refresh();
    setRejectLoader(false);
  }

  function handleUndo() {
    if (!selectedCert) return;
    setDecisions((prev) => ({ ...prev, [selectedCert.id]: "pending" }));
  }

  return (
    <>
      <div className=" rounded-2xl border bg-white overflow-x-auto">
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
                key={cert.CertificationID}
                cert={cert}
                decision={decisions[cert.VerificationStatus] ?? "pending"}
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
        loader={loader}
        rejectLoader={rejectLoader}
        onAccept={() =>
          selectedCert && handleAccept(selectedCert.CertificationID)
        }
        onReject={() =>
          selectedCert && handleReject(selectedCert.CertificationID)
        }
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
