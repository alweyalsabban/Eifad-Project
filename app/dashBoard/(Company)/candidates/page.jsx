"use client";

import CandidateTab from "./components/candidateTab";
import { useContext, useEffect, useMemo, useState } from "react";
import { NamePageContex } from "../../(JobSeekerModel)/context/NamePageContext";
import JobSelect from "./components/JobSelect";
import CandidateCard from "./components/CandidateCard";
import { Employer, Profile } from "../callFunctionsForCompany";
import { FiZap } from "react-icons/fi";
import { toast } from "react-toastify";
import ResumePage from "../../(JobSeekerModel)/cv/components/CVPDF";

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
  const [applicationAI, setapplicationAI] = useState([]);
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [CVInfo, setCVInfo] = useState([]);
  const [ProfileUser, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
  });

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

  async function nominateByAi() {
    setAiLoading(true);
    const res = await Employer("MakeCandidateForJob", {
      jobId: jobId,
    });
    toast.success(res.message);

    const resApplication = await Employer("GetAllAiAplications", {
      idJob: jobId,
    });
    setapplicationAI(resApplication);
    setAiLoading(false);
    setActive("candidate");
  }

  const filteredApplications = useMemo(() => {
    if (active === "all") return applications;
    if (active === "candidate") return applicationAI;

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
  }, [applications, active, applicationAI]);

  const tabs = [
    { id: "all", label: "الكل", count: applications.length },
    /*     {
      id: "new",
      label: "جديد",
      count: applications.filter((a) => getAppStatus(a) === "Pending").length,
    }, */
    /*     {
      id: "review",
      label: "مراجع",
      count: applications.filter((a) => getAppStatus(a) === "Reviewed").length,
    }, */
    {
      id: "candidate",
      label: "مرشح بـ (AI)",
      count: applicationAI.length,
    },
    /* {
      id: "selected",
      label: "مختار",
      count: applications.filter((a) => getAppStatus(a) === "Shortlisted")
        .length,
    }, */
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
      {showPreview && (
        <div className="fixed inset-0  z-50 bg-black/60 print:hidden">
          <button
            type="button"
            onClick={() => {
              setShowPreview(false);
            }}
            className="fixed top-4 left-1/2 z-100 -translate-x-1/2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow hover:bg-slate-100"
          >
            إغلاق المعاينة
          </button>

          <div className="h-screen overflow-y-auto overflow-x-hidden pt-20">
            <div className="mx-auto w-full max-w-[230mm] px-4 md:px-6">
              <ResumePage CVInfo={CVInfo} Profile={ProfileUser} />
            </div>
          </div>
        </div>
      )}

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
          disabled={applications.length > 0 ? false : true}
          onClick={nominateByAi}
          className="mt-5 rounded-xl bg-purple-600 px-8 py-3 text-white font-semibold hover:bg-purple-700 transition hover:cursor-pointer"
        >
          <FiZap className="inline ml-2" />

          {aiLoading ? "جاري الترشيح..." : "ترشيح الوظيفة بـ AI"}
        </button>
      </div>
      <CandidateTab tabs={tabs} active={active} setActive={setActive} />
      {/*   {
        active === "candidate" && (
          <button className="rounded-xl bg-green-500 px-8 py-3 text-white font-semibold hover:bg-green-600 transition mt-5 hover:cursor-pointer">
            قبول الكل
          </button>
        )
      } */}
      {!jobId ? (
        <div className="mt-6 text-center text-slate-500">
          اختر وظيفة لعرض المتقدمين.
        </div>
      ) : loading ? (
        <div className="mt-6 text-center text-slate-500">
          جاري تحميل المتقدمين...
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="mt-6 text-center text-slate-500">لا يوجد متقدمون.</div>
      ) : (
        filteredApplications.map((application, index) => {
          return (
            <CandidateCard
              key={application?.id ?? application?.ApplicationID ?? index}
              application={application}
              status={active === "Accepted" ? "accepted" : "pending"}
              setApplications={setApplications}
              onViewProfile={() => {
                setCVInfo(application?.cv_details);
                setProfile({
                  FullName: application?.job_seeker?.user?.FullName,
                  Phone: application?.JobSeekerPhone,
                  Email: application?.job_seeker?.user?.Email,
                  Location: application?.job_seeker?.Location,
                });
                setShowPreview(true);
              }}
            />
          );
        })
      )}
    </div>
  );
}

export default Candidates;
