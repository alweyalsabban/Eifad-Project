"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { personInformation } from "./data";
import { ApiFetchServer } from "@/app/lib/ApiFetchServer";

export default function DashBoard() {
  const router = useRouter();

  function setInformaion(data) {
    personInformation.name = data?.data?.full_name;
    personInformation.gmail = data?.data?.email;
    personInformation.role = data?.data?.role;
    personInformation.gender = data?.data?.gender;
    localStorage.setItem("name", data?.data?.full_name);
    localStorage.setItem("gmail", data?.data?.email);
    localStorage.setItem("role", data?.data?.role);
    localStorage.setItem("gender", data?.data?.gender);
  }

  useEffect(() => {
    async function fetc() {
      const res = await ApiFetchServer("/auth/me");
      setInformaion(res.dataResponse);

      if (res.isSusses) {
        if (res?.dataResponse?.data?.role === "JobSeeker") {
          router.replace("/dashBoard/main");
        } else if (res?.dataResponse?.data?.role === "Employer") {
          router.replace("/dashBoard/panale");
        } else if (res?.dataResponse?.data?.role === "Admin") {
          router.replace("/dashBoard/controll");
        } else {
          alert("Error In data fetch");
        }
      }
    }
    fetc();
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="text-slate-600 text-lg font-medium">
          جاري توجيهك إلى لوحة التحكم...
        </p>
      </div>
    </div>
  );
}
