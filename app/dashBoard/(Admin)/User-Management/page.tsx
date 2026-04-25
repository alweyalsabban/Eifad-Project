"use client";

import { useMemo, useState } from "react";
import UsersFiltersBar from "./components/UsersFiltersBar";
import UsersTable from "./components/UsersTable";
import TitlePage from "../controll/components/TitlePage";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
const usersData = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    role: "باحث عن عمل",
    verificationStatus: "موثق" as const,
    accountStatus: "نشط" as const,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Sara Ali",
    email: "sara@example.com",
    role: "باحث عن عمل",
    verificationStatus: "قيد الانتظار" as const,
    accountStatus: "نشط" as const,
    createdAt: "2024-02-10",
  },
  {
    id: 3,
    name: "Tech Solutions Ltd",
    email: "contact@techsolutions.com",
    role: "صاحب عمل",
    verificationStatus: "موثق" as const,
    accountStatus: "نشط" as const,
    createdAt: "2023-11-20",
  },
  {
    id: 4,
    name: "Mohamed Ibrahim",
    email: "mohamed@example.com",
    role: "باحث عن عمل",
    verificationStatus: "مرفوض" as const,
    accountStatus: "محظور" as const,
    createdAt: "2024-03-05",
  },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("q") || "";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch(q);
  }, [searchParams]);

  const filteredUsers = useMemo(() => {
    return usersData.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        !role ||
        (role === "job-seeker" && user.role === "باحث عن عمل") ||
        (role === "employer" && user.role === "صاحب عمل");

      const matchesStatus =
        !status ||
        (status === "active" && user.accountStatus === "نشط") ||
        (status === "blocked" && user.accountStatus === "محظور");

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [search, role, status]);

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <TitlePage title="إدارة المستخدمين" number={2} />

      <UsersFiltersBar
        search={search}
        role={role}
        status={status}
        onSearchChange={setSearch}
        onRoleChange={setRole}
        onStatusChange={setStatus}
      />

      <UsersTable users={filteredUsers} />
    </div>
  );
}
