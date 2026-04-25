"use client";

import CandidateTab from "./components/candidateTab";
import { useContext, useEffect, useMemo, useState } from "react";
import { NamePageContex } from "../../(JobSeekerModel)/context/NamePageContext";
import JobSelect from "./components/JobSelect";
import CandidateCard from "./components/CandidateCard";
import { Profile } from "../callFunctionsForCompany";
import { FiZap } from "react-icons/fi";

function getJobId(job) {
  return job?.id ?? job?.JobAdID ?? job?.JobID;
}

function getJobTitle(job) {
  return job?.Title ?? job?.title ?? "وظيفة بدون عنوان";
}

function getAppStatus(app) {
  return app?.Status ?? app?.status ?? "Pending";
}

function Candidates() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  const [jobId, setJobId] = useState("");
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    setnameOfSideBar("إدارة المرشحين");
    setnumberOfSideBar(4);

    const idFromUrl = new URLSearchParams(window.location.search).get("jobId");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (idFromUrl) setJobId(idFromUrl);
  }, [setnameOfSideBar, setnumberOfSideBar]);

  useEffect(() => {
    Profile("GetAllJobPosted")
      .then((data) => setJobs(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!jobId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setApplications([]);
      return;
    }

    setLoading(true);

    Profile("GetJobApplications", jobId)
      .then((data) => setApplications(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [jobId]);

  function nominateByAi() {
    setAiLoading(true);

    // مؤقتًا إلى أن تضيف API الخاص بالترشيح
    console.log("AI nomination clicked for job:", jobId);

    setTimeout(() => {
      setAiLoading(false);
      setActive("candidate");
    }, 500);
  }

  const filteredApplications = useMemo(() => {
    if (active === "all") return applications;

    const statusMap = {
      new: "Pending",
      review: "Reviewed",
      selected: "Shortlisted",
      unacceptable: "Rejected",
      Accepted: "Hired",
      candidate: "Shortlisted",
    };

    return applications.filter(
      (app) => getAppStatus(app) === statusMap[active],
    );
  }, [applications, active]);

  const tabs = [
    { id: "all", label: "الكل", count: applications.length },
    {
      id: "new",
      label: "جديد",
      count: applications.filter((a) => getAppStatus(a) === "Pending").length,
    },
    {
      id: "review",
      label: "مراجع",
      count: applications.filter((a) => getAppStatus(a) === "Reviewed").length,
    },
    {
      id: "candidate",
      label: "مرشح بـ (AI)",
      count: applications.filter((a) => getAppStatus(a) === "Shortlisted")
        .length,
    },
    {
      id: "selected",
      label: "مختار",
      count: applications.filter((a) => getAppStatus(a) === "Shortlisted")
        .length,
    },
    {
      id: "unacceptable",
      label: "مرفوض",
      count: applications.filter((a) => getAppStatus(a) === "Rejected").length,
    },
    {
      id: "Accepted",
      label: "المقبولين",
      count: applications.filter((a) => getAppStatus(a) === "Hired").length,
    },
  ];

  return (
    <div className="w-[98%] mx-auto mb-40">
      <div className="p-6 w-full border border-slate-200 rounded-2xl mt-5">
        <JobSelect
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          jobs={jobs.map((job) => ({
            id: getJobId(job),
            title: getJobTitle(job),
          }))}
        />

        <button
          type="button"
          onClick={nominateByAi}
          className="mt-5 rounded-xl bg-purple-600 px-8 py-3 text-white font-semibold hover:bg-purple-700 transition hover:cursor-pointer"
        >
          <FiZap className="inline ml-2" />
          {aiLoading ? "جاري الترشيح..." : "ترشيح الوظيفة بـ AI"}
        </button>
      </div>

      <CandidateTab tabs={tabs} active={active} setActive={setActive} />

      {active === "candidate" && (
        <button className="rounded-xl bg-green-500 px-8 py-3 text-white font-semibold hover:bg-green-600 transition mt-5 hover:cursor-pointer">
          قبول الكل
        </button>
      )}

      {!jobId ? (
        <div className="mt-6 text-center text-slate-500">
          اختر وظيفة لعرض المتقدمين.
        </div>
      ) : loading ? (
        <div className="mt-6 text-center text-slate-500">
          جاري تحميل المتقدمين...
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="mt-6 text-center text-slate-500">
          لا يوجد متقدمون لهذه الوظيفة.
        </div>
      ) : (
        filteredApplications.map((application, index) => (
          <CandidateCard
            key={application?.id ?? application?.ApplicationID ?? index}
            application={application}
            status={active === "Accepted" ? "accepted" : "pending"}
          />
        ))
      )}
    </div>
  );
}

export default Candidates;
