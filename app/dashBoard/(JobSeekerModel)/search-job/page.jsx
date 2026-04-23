"use client";

import JobSearchBar from "./components/JobSearchBar";
import JobCard from "./components/JobCard";
import CreateTitle from "../CreateTitle";
import { useEffect, useState } from "react";
import { JobApplication } from "../callFunctionsForJobseeker";
import LoaderTwo from "../components/LoaderTwo";

function JobSearchPage() {
  const [allJob, setAllJob] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [params, setParams] = useState({
    search: "",
    location: "",
    work_type: "",
    workplace_type: "",
    salary_min: "",
    salary_max: "",
    company_id: "",
    skill_ids: "",
    industry: "",
    sort: "",
    per_page: "",
  });
  const [CvInfo, setCvInfo] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const data = await JobApplication("GetAllJob", params);
        const cvInfo = await JobApplication("GetCVInfo");
        setCvInfo(cvInfo);
        setAllJob(data);
        setLoading(false);
      } catch (error) {}
    }

    fetchJobs();
  }, [params]);

  return (
    <>
      <CreateTitle title="البحث عن وظائف" number={5} />

      <JobSearchBar params={params} setParams={setParams} />
      <div className="flex justify-between items-center mt-5">
        <h1 className="w-[95%] m-auto mt-5 font-bold ">
          تم العثور على {allJob.length ?? "0"} وظائف
        </h1>

        <div dir="rtl" className="w-56 ">
          <select
            value={params.sort}
            onChange={(e) => setParams({ ...params, sort: e.target.value })}
            className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-right text-slate-900
                   outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 hover:cursor-pointer"
          >
            <option value="popular">الأكثر طلبا</option>
            <option value="latest">الأحدث</option>
            <option value="salary_desc">الراتب: من الأعلى للأدنى</option>
            <option value="salary_asc">الراتب: من الأدنى إلى الأعلى</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <div className="items-center justify-center flex mt-30">
          <LoaderTwo />
        </div>
      ) : (
        <>
          <div className="mb-40">
            {allJob.map((item, index) => {
              return (
                <JobCard
                  CVId={CvInfo.CVID}
                  JobAdID={item.JobAdID}
                  key={index}
                  title={item?.Title}
                  company={item?.company?.CompanyName ?? ""}
                  location={item?.Location ?? ""}
                  workType={item?.WorkType ?? ""}
                  mode={item?.WorkplaceType ?? ""}
                  postedAgo={new Date(item?.PostedAt ?? "").toLocaleDateString(
                    "ar-EG",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                  ExpiryDate={item?.ExpiryDate}
                  salaryFrom={item?.SalaryMin ?? ""}
                  salaryTo={item?.SalaryMax ?? ""}
                  currency={item?.Currency ?? ""}
                  logoPath={item?.company?.LogoPath}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default JobSearchPage;
