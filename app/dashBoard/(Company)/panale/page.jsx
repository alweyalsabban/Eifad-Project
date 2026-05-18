import InfoCard from "../../(JobSeekerModel)/main/components/InfoCard";
import RecommedAI from "../../(JobSeekerModel)/main/components/RecommedAI";
import ActionCard from "../../(JobSeekerModel)/main/components/ActionCard";
import { InfoMainCard } from "../companyData";
import { InfoCardActionCompany } from "../companyData";
import ActiveJobsSection from "./components/ActiveJobsSection";
import JobCard from "./components/JobCard";
import { jobs } from "../companyData";
import CandidateCard from "./components/CandidateCard";
import CreateTitle from "../../(JobSeekerModel)/CreateTitle";
import { ApiFetchServer } from "../../../lib/ApiFetchServer";
import Link from "next/link";

async function CompanyPage() {
  async function FetchData() {
    const res = await ApiFetchServer("/profile/statistics");
    return res.dataResponse.data;
  }
  const data = await FetchData();
  return (
    <div className="mb-40">
      <CreateTitle title="الواجهة الرئيسية" number={1} />

      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  
      gap-2 mt-5  justify-between mr-3 flex-wrap w-[98%] "
      >
        {InfoMainCard(data).map((i) => {
          return (
            <InfoCard
              key={i.id}
              icons={i.icons}
              number={i.number}
              name={i.name}
            />
          );
        })}
      </div>

      <hr className="mt-5 text-auxiliaryColorGray w-[98%]" />

      <div className="grid grid-cols-1  md:grid-cols-2  gap-2 mt-5 justify-between mr-3 flex-wrap w-[98%]">
        {InfoCardActionCompany.map((i) => {
          return (
            <Link key={i.id} href={i.hr}>
              <ActionCard icons={i.icons} name={i.name} />
            </Link>
          );
        })}
      </div>
      {/*  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mx-auto ">
        <ActiveJobsSection title={"الوظائف النشطة"}>
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              applicants={job.applicants}
              views={job.views}
              daysAgo={job.daysAgo}
            />
          ))}
        </ActiveJobsSection>

        <ActiveJobsSection title={"أحدث المتقدمين"}>
          <CandidateCard />
        </ActiveJobsSection>
      </div> */}
    </div>
  );
}

export default CompanyPage;
