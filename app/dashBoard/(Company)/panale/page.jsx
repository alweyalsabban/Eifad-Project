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

async function CompanyPage() {
  async function FetchData() {
    const res = await ApiFetchServer("/profile/statistics");
    return res.dataResponse.data;
  }
  const data = await FetchData();
  return (
    <div className="mb-40">
      <CreateTitle title="لوحة التحكم" number={1} />

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

      <RecommedAI
        title={"توصيات الذكاء الاصطناعي "}
        description={`لديك 12 مرشح ذو مطابقة عالية (90%+) للوظائف المفتوحة`}
        textBtn={"عرض المرشحين"}
      />

      <div className="grid grid-cols-1  md:grid-cols-3  gap-2 mt-5 justify-between mr-3 flex-wrap w-full">
        {InfoCardActionCompany.map((i) => {
          return <ActionCard key={i.id} icons={i.icons} name={i.name} />;
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mx-auto ">
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
      </div>
    </div>
  );
}

export default CompanyPage;
