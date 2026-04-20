"use client";

import { useParams } from "next/navigation";
import CompanyAboutCard from "../../search-job/components/CompanyAboutCard";
import JobCard from "../../search-job/components/JobCard";
import { useEffect, useState } from "react";
import { Companies } from "../../callFunctionsForJobseeker";

function DetailCompany() {
  const path = useParams();
  const [DeatilCompany, setDeatilCompany] = useState(null);
  const [AllJobForCompany, setAllJobForCompany] = useState(null);
  useEffect(() => {
    async function Fetch() {
      const res = await Companies("CompanyDeatils", { id: path.detailCompany });
      setDeatilCompany(res);
      setAllJobForCompany(res.job_ads);
      console.log(res);
    }
    Fetch();
  }, [path.detailCompany]);

  return (
    <>
      <CompanyAboutCard
        title={DeatilCompany?.CompanyName}
        companyName={DeatilCompany?.CompanyName}
        category={DeatilCompany?.FieldOfWork}
        description={DeatilCompany?.Description}
        employees={DeatilCompany?.EmployeeCount}
        city={DeatilCompany?.Address}
        email={DeatilCompany?.email ?? "لا يوجد"}
        phone={DeatilCompany?.phone ?? "لا يوجد"}
      />
      <h1 className="font-bold text-2xl mt-15 mr-5">الوظائف المنشورة</h1>
      <div className="mt-10">
        {AllJobForCompany?.map((item, index) => {
          return (
            <JobCard
              key={index}
              CVId={6}
              JobAdID={item?.JobAdID}
              title={item?.Title}
              company={DeatilCompany?.CompanyName}
              location={DeatilCompany?.Address}
              workType={item?.WorkType}
              mode={item?.WorkplaceType}
              postedAgo={item?.PostedAt}
              ExpiryDate={item?.ExpiryDate}
              salaryFrom={item?.SalaryMin}
              salaryTo={item?.SalaryMax}
              currency={item?.Currency}
            />
          );
        })}
      </div>
    </>
  );
}

export default DetailCompany;
