"use client";
import { useContext, useEffect, useState } from "react";
import { NamePageContex } from "../../(JobSeekerModel)/context/NamePageContext";
import JobsToolbar from "./components/JobsToolbar";
import JobsTabs from "./components/JobsTabs";
import JobListingCard from "./components/JobListingCard";
import JobForm from "./components/JobForm";

function JobManagement() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  const [isPostJob, setPostJob] = useState(false);
  useEffect(() => {
    setnameOfSideBar("إدارة الوظائف");
    setnumberOfSideBar(3);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return (
    <div className="mb-40">
      <div
        className={`absolute top-8  z-50 backdrop-blur rounded-2xl p-3 w-[90%] left-2 
      flex items-center justify-center ${isPostJob ? "block" : "hidden"}`}
      >
        <JobForm setPostJob={setPostJob} />
      </div>
      <section
        className="w-[98%] mx-auto rounded-3xl mt-5 border 
      border-slate-200 bg-white px-6 py-6 "
      >
        <JobsToolbar />
        <div className="my-5 h-px w-full bg-slate-200" />
        <JobsTabs setPostJob={setPostJob} />
      </section>
      <div className="w-[98%] mx-auto gap-2 grid grid-cols-1 md:grid-cols-2 ">
        <JobListingCard
          title="مصمم واجهات المستخدم"
          location="جدة"
          jobType="دوام كامل"
          status="مفتوح"
          applicants={35}
          views={521}
          salary="18,000 $"
          publishedAt="2024-01-28"
          expiresAt="2024-02-28"
          onViewApplicants={() => console.log("عرض المتقدمين")}
          onCloseJob={() => console.log("إغلاق")}
          onMenuClick={() => console.log("القائمة")}
        />
      </div>
    </div>
  );
}

export default JobManagement;
