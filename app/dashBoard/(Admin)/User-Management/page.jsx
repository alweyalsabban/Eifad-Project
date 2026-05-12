"use client";

import { useMemo, useState } from "react";
import UsersFiltersBar from "./components/UsersFiltersBar";
import UsersTable from "./components/UsersTable";
import TitlePage from "../controll/components/TitlePage";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { UseManagmentAPI } from "../CallApiForAdmin";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [AllUser, setUser] = useState([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    async function GetAllUser() {
      const user = await UseManagmentAPI("GetAllUser", {
        search,
        role,
        status,
      });
      setUser(user.dataResponse.data);
    }

    const q = searchParams.get("q") || search;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch(q);
    GetAllUser();
  }, [searchParams, search, role, status]);

  return (
    <div className="space-y-6 p-6  mb-40" dir="rtl">
      <TitlePage title="إدارة المستخدمين" number={2} />

      <UsersFiltersBar
        search={search}
        role={role}
        status={status}
        onSearchChange={setSearch}
        onRoleChange={setRole}
        onStatusChange={setStatus}
      />

      <UsersTable users={AllUser} search={search} setSearch={setSearch} />
    </div>
  );
}
