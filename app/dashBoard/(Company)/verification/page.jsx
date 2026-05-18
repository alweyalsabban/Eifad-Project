"use client";

import VerificationAlert from "./components/VerificationAlert";
import RequiredDocumentsCard from "./components/RequiredDocumentsCard";
import ActivityTimelineCard from "./components/ActivityTimelineCard";
import { useContext, useEffect, useState } from "react";
import { NamePageContex } from "../../(JobSeekerModel)/context/NamePageContext";
import { Profile } from "../callFunctionsForCompany";
import { uploadPdf } from "../callFunctionsForCompany";
import { toast } from "react-toastify";
import { ApiFetchServer } from "../../../lib/ApiFetchServer";

export default function Verification() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);

  const [isVerified, setIsVerified] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setnameOfSideBar("حالة التحقق");
    setnumberOfSideBar(7);
  }, [setnameOfSideBar, setnumberOfSideBar]);

  useEffect(() => {
    async function IsVerified() {
      const res = await ApiFetchServer("/auth/me");
      setIsVerified(res.dataResponse.data.company_profile.IsCompanyVerified);
    }
    IsVerified();
    async function loadData() {
      try {
        const res = await ApiFetchServer(
          "/employer/verify/documents",
          "Post",
          {},
        );
        const defaultDocuments = [
          {
            id: 0,
            name: "السجل التجاري",
            fileUrl: res.dataResponse.data.documents[0].url,
            status: "pending",
          },
          {
            id: 1,
            name: "شهادة الضريبة",
            fileUrl: res.dataResponse.data.documents[1].url,
            status: "pending",
          },
          {
            id: 2,
            name: "رخصة الشركة",
            fileUrl: res.dataResponse.data.documents[2].url,
            status: "pending",
          },
        ];

        setDocuments(defaultDocuments);
      } catch {
        setDocuments([
          {
            id: 0,
            name: "السجل التجاري",
            fileUrl: "",
            status: "pending",
          },
          {
            id: 1,
            name: "شهادة الضريبة",
            fileUrl: "",
            status: "pending",
          },
          {
            id: 2,
            name: "رخصة الشركة",
            fileUrl: "",
            status: "pending",
          },
        ]);
      }
    }
    loadData();
  }, [loading]);

  async function uploadDocument(e, index) {
    if (e.type !== "application/pdf") {
      toast.error("ارفع ملف PDF فقط");
      return;
    }
    setLoading(true);

    const url = await uploadPdf(e);
    await ApiFetchServer("/employer/verify/documents", "POST", {
      document_urls: {
        [index]: url,
      },
      document_names: {
        [index]: e.name,
      },
    });

    if (url) {
      toast.success("تم رفع الملف");
    }
    setLoading(false);
  }

  return (
    <section className="mx-auto w-[98%] space-y-5 mb-40">
      <VerificationAlert isVerified={isVerified} />
      {loading && (
        <div className="fixed top-1/2 left-1/2 z-50 bg-black p-4 rounded-2xl text-white">
          جاري الرفع ...
        </div>
      )}
      <RequiredDocumentsCard documents={documents} onUpload={uploadDocument} />
      {/*       <ActivityTimelineCard activities={activities} />
       */}
    </section>
  );
}
