"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { NamePageContex } from "../../(JobSeekerModel)/context/NamePageContext";
import JobsToolbar from "./components/JobsToolbar";
import JobsTabs from "./components/JobsTabs";
import JobListingCard from "./components/JobListingCard";
import dynamic from "next/dynamic";
import { Profile } from "../callFunctionsForCompany";

const JobForm = dynamic(() => import("./components/JobForm"));

function getStatus(job) {
  return job?.Status ?? job?.status ?? "Draft";
}

function getJobId(job) {
  return job?.id ?? job?.JobAdID ?? job?.JobID;
}

function JobManagement() {
  const router = useRouter();
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);

  const [isPostJob, setPostJob] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [selectedJob, setSelectedJob] = useState(null);
  const [AllJobPost, setAllJobPost] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function fetchJobs() {
    setLoading(true);
    try {
      const data = await Profile("GetAllJobPosted");
      setAllJobPost(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setnameOfSideBar("إدارة الوظائف");
    setnumberOfSideBar(3);
    fetchJobs();
  }, [setnameOfSideBar, setnumberOfSideBar]);

  const tabs = useMemo(() => {
    const counts = AllJobPost.reduce((acc, job) => {
      acc[getStatus(job)] = (acc[getStatus(job)] || 0) + 1;
      return acc;
    }, {});

    return [
      { id: "all", label: "الكل", count: AllJobPost.length },
      { id: "open", label: "مفتوح", count: counts.Active || 0 },
      { id: "closed", label: "مغلق", count: counts.Closed || 0 },
      { id: "draft", label: "مسودات", count: counts.Draft || 0 },
    ];
  }, [AllJobPost]);

  const filteredJobs = useMemo(() => {
    const statusMap = { open: "Active", closed: "Closed", draft: "Draft" };
    const q = search.trim().toLowerCase();

    return AllJobPost.filter((job) => {
      const sameStatus =
        activeTab === "all" || getStatus(job) === statusMap[activeTab];

      const text = [
        job?.Title,
        job?.title,
        job?.Location,
        job?.location,
        job?.Description,
        job?.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return sameStatus && (!q || text.includes(q));
    });
  }, [AllJobPost, activeTab, search]);

  const openForm = (mode, job = null) => {
    setFormMode(mode);
    setSelectedJob(job);
    setPostJob(true);
  };

  const publishJob = async (job) => {
    await Profile("PublishJob", getJobId(job));
    await fetchJobs();
  };

  const closeJob = async (job) => {
    await Profile("CloseJob", getJobId(job));
    await fetchJobs();
  };

  const deleteJob = async () => {
    if (!deleteModal) return;

    setDeleteLoading(true);

    try {
      await Profile("DeleteJob", getJobId(deleteModal));
      setDeleteModal(null);
      await fetchJobs();
    } finally {
      setDeleteLoading(false);
    }
  };

  const viewApplicants = (job) => {
    router.push(`/dashBoard/candidates?jobId=${getJobId(job)}`);
  };

  return (
    <div className="mb-40">
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm">
          <div
            dir="rtl"
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500">
              🗑️
            </div>

            <h2 className="mt-4 text-center text-xl font-extrabold text-slate-900">
              حذف الوظيفة
            </h2>

            <p className="mt-3 text-center leading-7 text-slate-500">
              هل أنت متأكد من حذف وظيفة
              <span className="font-bold text-slate-800">
                {deleteModal?.Title ?? deleteModal?.title}
              </span>
              ؟ لا يمكن التراجع عن هذه العملية.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeleteModal(null)}
                disabled={deleteLoading}
                className="h-11 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-60"
              >
                إلغاء
              </button>

              <button
                type="button"
                onClick={deleteJob}
                disabled={deleteLoading}
                className="h-11 rounded-xl bg-red-500 text-white hover:bg-red-600 disabled:opacity-60"
              >
                {deleteLoading ? "جاري الحذف..." : "حذف"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isPostJob && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/20 p-4 backdrop-blur-sm">
          <JobForm
            setPostJob={setPostJob}
            mode={formMode}
            job={selectedJob}
            onSuccess={fetchJobs}
          />
        </div>
      )}

      <section className="w-[98%] mx-auto rounded-3xl mt-5 border border-slate-200 bg-white px-6 py-6">
        <JobsToolbar search={search} setSearch={setSearch} />

        <div className="my-5 h-px w-full bg-slate-200" />

        <JobsTabs
          setPostJob={() => openForm("create")}
          tabs={tabs}
          active={activeTab}
          setActive={setActiveTab}
        />
      </section>

      {loading ? (
        <div className="mt-8 text-center text-slate-500">
          جاري تحميل الوظائف...
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="mt-8 text-center text-slate-500">
          لا توجد وظائف مطابقة.
        </div>
      ) : (
        <div className="w-[98%] mx-auto gap-2 grid grid-cols-1 md:grid-cols-2">
          {filteredJobs.map((item) => (
            <JobListingCard
              key={getJobId(item)}
              job={item}
              onEdit={(job) => openForm("edit", job)}
              onView={(job) => openForm("view", job)}
              onPublish={publishJob}
              onCloseJob={closeJob}
              onDeleteJob={(job) => setDeleteModal(job)}
              onViewApplicants={viewApplicants}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default JobManagement;
