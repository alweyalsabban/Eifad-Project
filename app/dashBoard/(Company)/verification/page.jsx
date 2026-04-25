"use client";

import VerificationAlert from "./components/VerificationAlert";
import RequiredDocumentsCard from "./components/RequiredDocumentsCard";
import ActivityTimelineCard from "./components/ActivityTimelineCard";
import { useContext, useEffect, useState } from "react";
import { NamePageContex } from "../../(JobSeekerModel)/context/NamePageContext";
import { Profile } from "../callFunctionsForCompany";

const defaultDocuments = [
  {
    id: "commercial_record",
    name: "السجل التجاري",
    fileUrl: "",
    status: "pending",
  },
  {
    id: "tax_certificate",
    name: "شهادة الضريبة",
    fileUrl: "",
    status: "pending",
  },
  {
    id: "company_license",
    name: "رخصة الشركة",
    fileUrl: "",
    status: "pending",
  },
];

export default function Verification() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);

  const [isVerified, setIsVerified] = useState(false);
  const [documents, setDocuments] = useState(defaultDocuments);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setnameOfSideBar("حالة التحقق");
    setnumberOfSideBar(7);
  }, [setnameOfSideBar, setnumberOfSideBar]);

  useEffect(() => {
    async function loadData() {
      try {
        const me = await Profile("GetMe");
        setIsVerified(
          Boolean(me?.is_verified ?? me?.isVerified ?? me?.IsVerified),
        );

        const docs = await Profile("GetVerificationDocuments");

        if (Array.isArray(docs?.documents)) {
          setDocuments(docs.documents);
        }

        if (Array.isArray(docs?.activities)) {
          setActivities(docs.activities);
        }
      } catch {
        setDocuments(defaultDocuments);
      }
    }

    loadData();
  }, []);

  async function uploadDocument(type, file) {
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("ارفع ملف PDF فقط");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await Profile("UploadVerificationDocument", {
        type,
        formData,
      });

      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === type
            ? {
                ...doc,
                uploaded: true,
                status: "under_review",
                fileUrl: URL.createObjectURL(file),
              }
            : doc,
        ),
      );

      setActivities((prev) => [
        {
          id: Date.now(),
          title: "تم رفع مستند",
          date: new Date().toLocaleString("ar"),
        },
        ...prev,
      ]);
    } catch {
      alert("حدث خطأ أثناء رفع الملف");
    }
  }

  return (
    <section className="mx-auto w-[98%] space-y-5 mb-40">
      <VerificationAlert isVerified={isVerified} />

      <RequiredDocumentsCard documents={documents} onUpload={uploadDocument} />

      <ActivityTimelineCard activities={activities} />
    </section>
  );
}
