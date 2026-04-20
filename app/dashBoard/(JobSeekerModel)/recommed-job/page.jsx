"use client";
import { useState, useEffect } from "react";
import JobCard from "../search-job/components/JobCard";
import SmartRecommendationsBanner from "./components/SmartRecommendationsBanner";
import CreateTitle from "../CreateTitle";
function RecommedJob() {
  const [isLoading, setLoading] = useState(false);
  const [allRecommendJob, setRecommendJob] = useState(null);
  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        /*   const data = await JobApplication("GetAllJob");
        const cvInfo = await JobApplication("GetCVInfo");
        setCvInfo(cvInfo);
        setAllJob(data); */
        setLoading(false);
      } catch (error) {}
    }

    fetchJobs();
  }, []);
  return (
    <>
      <CreateTitle title="الوظائف الموصى بها" number={6} />

      <SmartRecommendationsBanner />
      <div className="mb-40">
        {isLoading ? (
          <div role="status" className="items-center justify-center flex mt-30">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-neutral-tertiary animate-spin fill-blue-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            <div className="mb-40">
              {allRecommendJob?.map((item, index) => {
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
                    postedAgo={new Date(
                      item?.PostedAt ?? "",
                    ).toLocaleDateString("ar-EG", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
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
      </div>
    </>
  );
}

export default RecommedJob;
