"use client";

import JobDetailsHeaderCard from "../components/JobDetailsHeaderCard";
import CompanyAboutCard from "../components/CompanyAboutCard";
import AiMatchCard from "../components/AiMatchCard";
import JobDescriptionCard from "../components/JobDescriptionCard";
import JobRequirementsCard from "../components/JobRequirementsCard";
import { JobApplication } from "../../callFunctionsForJobseeker";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CreateTitle from "../../CreateTitle";

function DeatilJob() {
  const path = useParams();
  const [JobDetials, setJobDetials] = useState(null);
  const [CVInfo, setCVInfo] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      setJobDetials(await JobApplication("GetDeatilJob", path.detailJob));
      setCVInfo(await JobApplication("GetCVInfo"));
    }
    fetchJobs();
  }, [, path]);

  return (
    <>
      <CreateTitle title="تفاصيل الوظيفة" number={5} />

      <JobDetailsHeaderCard
        title={JobDetials?.Title}
        company={JobDetials?.company?.CompanyName}
        location={JobDetials?.Location}
        mode={JobDetials?.WorkplaceType}
        workType={JobDetials?.WorkType}
        postedAgo={
          new Date(JobDetials?.PostedAt).toLocaleDateString("ar-EG", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          }) +
          " إلى " +
          new Date(JobDetials?.ExpiryDate).toLocaleDateString("ar-EG", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        }
        applicants={JobDetials?.applications_count}
        salaryFrom={JobDetials?.SalaryMin}
        salaryTo={JobDetials?.SalaryMax}
        currency={JobDetials?.Currency}
        JobAdID={JobDetials?.JobAdID}
        CVID={CVInfo?.CVID}
        isExpired={new Date(JobDetials?.ExpiryDate) < new Date()}
      />
      <CompanyAboutCard
        companyName={JobDetials?.company?.CompanyName}
        category={JobDetials?.company?.FieldOfWork}
        description={JobDetials?.company?.Description}
        employees={JobDetials?.company?.EmployeeCount}
        city={JobDetials?.company.Address}
        email="غير موجود"
        phone="غير موجود"
      />
      <AiMatchCard
        score={92}
        reasons={[
          "مهاراتك في React و Node.js تتطابق تماماً مع متطلبات الوظيفة",
          "لديك خبرة تزيد عن 5 سنوات ذات صلة",
          "موقعك يتطابق مع موقع الوظيفة (الرياض)",
          "خبرتك في تقنيات السحابة تتوافق مع الاحتياجات",
        ]}
      />

      <JobDescriptionCard
        title={" الوصف الوظيفي"}
        description={JobDetials?.Description}
      />

      <div className="grid grid-cols-1 mb-50 md:grid-cols-2 gap-2 mt-10">
        <JobRequirementsCard
          title={"المتطلبات"}
          requirements={JobDetials?.Requirements}
        />

        <JobRequirementsCard
          title={"المسؤوليات"}
          requirements={JobDetials?.Responsibilities}
        />
      </div>
    </>
  );
}

export default DeatilJob;
