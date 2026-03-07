"use client";
import CandidateTab from "./components/candidateTab";
import { useContext, useEffect, useState } from "react";
import { NamePageContex } from "../../(JobSeekerModel)/context/NamePageContext";
import JobSelect from "./components/JobSelect";
import CandidateCard from "./components/CandidateCard";

function Candidates() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  const [jobId, setJobId] = useState("");

  const jobs = [
    { id: 1, title: "مهندس برمجيات" },
    { id: 2, title: "مصمم واجهات المستخدم" },
    { id: 3, title: "مدير منتجات" },
  ];
  const [active, setActive] = useState("all");

  useEffect(() => {
    setnameOfSideBar("إدارة المرشحين");
    setnumberOfSideBar(4);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  const tabs = [
    { id: "all", label: "الكل", count: 5 },
    { id: "new", label: "جديد", count: 3 },
    { id: "review", label: "مراجع", count: 1 },
    { id: "candidate", label: "مرشح بـ (AI)", count: 1 },
    { id: "selected", label: "مختار", count: 1 },
    { id: "unacceptable", label: "مرفوض", count: 1 },
    { id: "Accepted", label: "المقبولين", count: 1 },
  ];
  return (
    <div className="w-[98%] mx-auto mb-40">
      <div
        className="p-6 w-full border 
      border-slate-200 rounded-2xl mt-5"
      >
        <JobSelect
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          jobs={jobs}
        />
      </div>
      <CandidateTab tabs={tabs} active={active} setActive={setActive} />
      {active === "candidate" && (
        <button
          className="rounded-xl bg-green-500 px-8 py-3 text-white font-semibold
        hover:bg-green-600 transition mt-5 hover:cursor-pointer"
        >
          قبول الكل
        </button>
      )}

      {active === "Accepted" ? (
        <CandidateCard status="accepted" />
      ) : (
        <CandidateCard status="pending" />
      )}
    </div>
  );
}

export default Candidates;
