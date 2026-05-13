"use client";
import TitlePage from "../controll/components/TitlePage";
import JobsTable from "./components/JobsTable";
import SearchJobs from "./components/SearchJobs";
import { useState, useEffect } from "react";
import { ApiFetchServer } from "@/app/lib/ApiFetchServer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BriefcaseBusiness } from "lucide-react";

function JobPostingManagement() {
  const [Jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [allCompany, setAllcompany] = useState([]);

  useEffect(() => {
    const getAllComapny = async () => {
      const res = await ApiFetchServer(`/admin/companies`);
      setAllcompany(res.dataResponse.data);
    };

    const FetchData = async () => {
      setLoading(true);
      const res = await ApiFetchServer(
        `/admin/jobs?status=${status}&search=${search}&company_id=${companyId}`,
      );
      setJobs(res.dataResponse.data ?? []);
      setLoading(false);
    };

    FetchData();
    getAllComapny();
  }, [search, status, companyId]);

  return (
    <div className="p-6" dir="rtl">
      <TitlePage title="إدارة الإعلانات الوظيفية" number={5} />
      <ToastContainer
        position="top-left"
        autoClose={3000}
        rtl
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <SearchJobs
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        allCompany={allCompany}
        companyId={companyId}
        setCompanyId={setCompanyId}
      />

      {/* ── Loader ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-slate-500 text-sm">جارٍ تحميل الوظائف…</p>
        </div>
      ) : Jobs.length === 0 ? (
        /* ── Empty state ── */
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <BriefcaseBusiness size={32} className="text-slate-400" />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-700">
              لا توجد وظائف
            </p>
            <p className="text-sm text-slate-400 mt-1">
              لم يتم العثور على أي إعلانات وظيفية تطابق البحث الحالي
            </p>
          </div>
        </div>
      ) : (
        <JobsTable data={Jobs} />
      )}
    </div>
  );
}

export default JobPostingManagement;
