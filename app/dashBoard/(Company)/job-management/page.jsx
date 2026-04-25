"use client";
import { useContext, useEffect, useState } from "react";
import { NamePageContex } from "../../(JobSeekerModel)/context/NamePageContext";
import JobsToolbar from "./components/JobsToolbar";
import JobsTabs from "./components/JobsTabs";
import JobListingCard from "./components/JobListingCard";
import dynamic from "next/dynamic";
import { Profile } from "../callFunctionsForCompany";

const JobForm = dynamic(() => import("./components/JobForm"));
const tabs = [
  { id: "all", label: "الكل", count: 5 },
  { id: "open", label: "مفتوح", count: 3 },
  { id: "closed", label: "مغلق", count: 1 },
  { id: "draft", label: "مسودات", count: 1 },
];

function JobManagement() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  const [isPostJob, setPostJob] = useState(false);
  const [AllJobPost, setAllJobPost] = useState([]);
  useEffect(() => {
    async function FetchData() {
      setAllJobPost(await Profile("GetAllJobPosted"));
    }
    setnameOfSideBar("إدارة الوظائف");
    setnumberOfSideBar(3);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    FetchData();
    console.log(AllJobPost);
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
        <JobsTabs setPostJob={setPostJob} tabs={tabs} />
      </section>
      <div className="w-[98%] mx-auto gap-2 grid grid-cols-1 md:grid-cols-2 ">
        {AllJobPost?.map((item, index) => {
          return (
            <JobListingCard
              key={index}
              title={item?.Title}
              location={item?.Location}
              jobType={item?.WorkType}
              status={item?.Status}
              applicants={item?.applications_count}
              views={"لا يوجد"}
              salary={`${item?.SalaryMin} - ${item?.SalaryMax} ${item?.Currency}`}
              publishedAt={item?.PostedAt?.slice(0, 10)}
              expiresAt={item?.ExpiryDate?.slice(0, 10)}
              onViewApplicants={() => console.log("عرض المتقدمين")}
              onCloseJob={() => console.log("إغلاق")}
              onMenuClick={() => console.log("القائمة")}
            />
          );
        })}
      </div>
    </div>
  );
}

export default JobManagement;
