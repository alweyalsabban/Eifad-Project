"use client";
import { ApiFetchServer } from "@/app/lib/ApiFetchServer";
import TitlePage from "../controll/components/TitlePage";
import CertificatesTable from "./components/CertificatesTable";
import CertiSearch from "./components/CertiSearch";
import { useState, useEffect } from "react";

function Certificateverification() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const res = await ApiFetchServer("/admin/certificates");
        console.log(res.dataResponse.data);

        setCertificates(res.dataResponse.data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  return (
    <div className="p-6" dir="rtl">
      <TitlePage title="التحقق من الشهادات" number={4} />
      <CertiSearch
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      <CertificatesTable data={certificates} />
    </div>
  );
}

export default Certificateverification;
