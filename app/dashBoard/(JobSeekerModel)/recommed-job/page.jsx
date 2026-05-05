"use client";
import { useState, useEffect } from "react";
import JobCard from "../search-job/components/JobCard";
import SmartRecommendationsBanner from "./components/SmartRecommendationsBanner";
import CreateTitle from "../CreateTitle";
import LoaderTwo from "../components/LoaderTwo";
import { JobApplication } from "../callFunctionsForJobseeker";
function RecommedJob() {
  const [isLoading, setLoading] = useState(true);
  const [allRecommendJob, setRecommendJob] = useState(null);
  const [CvInfo, setCvInfo] = useState(null);
  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const data = await JobApplication("GetAllSuggestJob");
        setRecommendJob(data.dataResponse.data);
        const cvInfo = await JobApplication("GetCVInfo");
        setCvInfo(cvInfo);
        setLoading(false);
      } catch (error) {}
    }

    fetchJobs();
  }, []);
  return (
    <>
      <CreateTitle title="الوظائف الموصى بها" number={6} />

      {/*  <SmartRecommendationsBanner /> */}
      <div className="mb-40">
        {isLoading ? (
          <div className="flex justify-center items-center mt-10">
            <LoaderTwo />
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

        {allRecommendJob?.length === 0 && (
          <div className="flex justify-center items-center mt-10 ">
            لا يوجد وظائف مرشحه لك .{" "}
          </div>
        )}
      </div>
    </>
  );
}

export default RecommedJob;
