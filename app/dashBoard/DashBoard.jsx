"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { personInformation } from "./data";

export default function DashBoard() {
  const router = useRouter();

  function setInformaion(data) {
    personInformation.name = data.data.full_name;
    personInformation.gmail = data.data.email;
    personInformation.role = data.data.role;
    personInformation.gender = data.data.gender;
    localStorage.setItem("name", data.data.full_name);
    localStorage.setItem("gmail", data.data.email);
    localStorage.setItem("role", data.data.role);
    localStorage.setItem("gender", data.data.gender);
  }

  useEffect(() => {
    async function fetc() {
      const res = await fetch("/api/user");
      const data = await res.json();
      setInformaion(data);
      if (res.ok) {
        if (data.data.role === "JobSeeker") {
          router.replace("/dashBoard/main");
        } else if (data.data.role === "Employer") {
          router.replace("/dashBoard/panale");
        } else if (data.data.role === "Admin") {
          router.replace("/dashBoard/controll");
        } else {
          alert("Error In data fetch");
        }
      }
    }
    fetc();
  }, []);

  return;
}
