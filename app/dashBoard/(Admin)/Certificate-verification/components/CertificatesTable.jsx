"use client";

import { useMemo, useState, useEffect } from "react";
import CertificateRow from "./CertificateRow";
import CertificatePreviewModal from "./CertificatePreviewModal";
import CertificateAnalysisModal from "./CertificateAnalysisModal";
import { ApiFetchServer } from "@/app/lib/ApiFetchServer";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CertificatesTable({ data }) {
  const router = useRouter();
  const [localData, setLocalData] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);
  const [openAnalysis, setOpenAnalysis] = useState(false);
  const [loader, setLoader] = useState(false);
  const [rejectLoader, setRejectLoader] = useState(false);

  // Sync prop data to local state
  useEffect(() => {
    setLocalData(data || []);
  }, [data]);

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
    const res = await ApiFetchServer(
      `/admin/certificates/${id}/verify`,
      "PUT",
      { notes: "تم التحقق يدويا" },
    );
    if (res.isSusses) {
      toast.success("تم قبول الشهادة بنجاح");
      setLocalData((prev) =>
        prev.map((c) =>
          c.CertificationID === id ? { ...c, VerificationStatus: "verified" } : c
        )
      );
      if (selectedCert?.CertificationID === id) {
        setSelectedCert(prev => ({ ...prev, VerificationStatus: "verified" }));
      }
    } else {
      toast.error("حدث خطأ أثناء قبول الشهادة");
    }
    setLoader(false);
  }

  async function handleReject(id) {
    setRejectLoader(true);
    const res = await ApiFetchServer(
      `/admin/certificates/${id}/reject`,
      "PUT",
      { reason: "الشهادة غير صالحة أو مزورة" },
    );
    if (res.isSusses) {
      toast.success("تم رفض الشهادة بنجاح");
      setLocalData((prev) =>
        prev.map((c) =>
          c.CertificationID === id ? { ...c, VerificationStatus: "rejected" } : c
        )
      );
      if (selectedCert?.CertificationID === id) {
        setSelectedCert(prev => ({ ...prev, VerificationStatus: "rejected" }));
      }
    } else {
      toast.error("حدث خطأ أثناء رفض الشهادة");
    }
    setRejectLoader(false);
  }

  return (
    <>
      <div className=" rounded-2xl border bg-white overflow-x-auto mt-3">
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
            {localData.map((cert) => (
              <CertificateRow
                key={cert.CertificationID}
                cert={cert}
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
        decision={selectedCert?.VerificationStatus ?? "pending"}
        loader={loader}
        rejectLoader={rejectLoader}
        onAccept={() =>
          selectedCert && handleAccept(selectedCert.CertificationID)
        }
        onReject={() =>
          selectedCert && handleReject(selectedCert.CertificationID)
        }
      />

      <CertificateAnalysisModal
        open={openAnalysis}
        onClose={() => setOpenAnalysis(false)}
        certificate={selectedCert}
      />
    </>
  );
}
