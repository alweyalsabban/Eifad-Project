"use client";

import { ApiFetchServer } from "@/app/lib/ApiFetchServer";
import TitlePage from "../controll/components/TitlePage";
import CompanyVerificationCard from "./components/CompanyVerificationCard";
import SearchCompany from "./components/SearchCompany";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Building2 } from "lucide-react";

export default function Page() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const FetchData = async () => {
      setLoading(true);
      const res = await ApiFetchServer(
        `/admin/companies?status=${status}&search=${search}`,
      );
      setCompanies(res.dataResponse.data ?? []);
      setLoading(false);
    };
    FetchData();
  }, [search, status]);

  return (
    <div className="space-y-6 p-6 mb-40" dir="rtl">
      <TitlePage title="التحقق من الشركات" number={3} />

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

      <SearchCompany
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      {/* ── Loader ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-slate-500 text-sm">جارٍّ تحميل الشركات…</p>
        </div>
      ) : companies.length === 0 ? (
        /* ── Empty state ── */
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <Building2 size={32} className="text-slate-400" />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-700">
              لا توجد شركات
            </p>
            <p className="text-sm text-slate-400 mt-1">
              لم يتم العثور على أي شركة تطابق البحث الحالي
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {companies.map((company, index) => (
            <CompanyVerificationCard key={index} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}
