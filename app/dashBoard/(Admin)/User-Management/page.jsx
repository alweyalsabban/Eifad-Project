"use client";

import { useState, useEffect } from "react";
import UsersFiltersBar from "./components/UsersFiltersBar";
import UsersTable from "./components/UsersTable";
import TitlePage from "../controll/components/TitlePage";
import { useSearchParams } from "next/navigation";
import { UseManagmentAPI } from "../CallApiForAdmin";
import { Users } from "lucide-react";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [verificationStatus, onVerificationStatusChange] = useState("");
  const [AllUser, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    async function GetAllUser() {
      setLoading(true);
      const user = await UseManagmentAPI("GetAllUser", {
        search,
        role,
        status,
        verificationStatus,
      });
      setUser(user.dataResponse.data ?? []);
      setLoading(false);
    }

    const q = searchParams.get("q") || search;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch(q);
    GetAllUser();
  }, [searchParams, search, role, status, verificationStatus]);

  return (
    <div className="space-y-6 p-6 mb-40" dir="rtl">
      <TitlePage title="إدارة المستخدمين" number={2} />

      <UsersFiltersBar
        search={search}
        role={role}
        status={status}
        onStatusChange={setStatus}
        onSearchChange={setSearch}
        onRoleChange={setRole}
        verificationStatus={verificationStatus}
        onVerificationStatusChange={onVerificationStatusChange}
      />

      {/* ── Loader ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-slate-500 text-sm">جارٍ تحميل المستخدمين…</p>
        </div>
      ) : AllUser.length === 0 ? (
        /* ── Empty state ── */
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <Users size={32} className="text-slate-400" />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-700">
              لا يوجد مستخدمون
            </p>
            <p className="text-sm text-slate-400 mt-1">
              لم يتم العثور على أي مستخدم يطابق البحث الحالي
            </p>
          </div>
        </div>
      ) : (
        <UsersTable users={AllUser} search={search} setSearch={setSearch} />
      )}
    </div>
  );
}
