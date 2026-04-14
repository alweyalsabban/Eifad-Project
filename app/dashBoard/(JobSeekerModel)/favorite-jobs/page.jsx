import JobCard from "../search-job/components/JobCard";
import CreateTitle from "../CreateTitle";
import { ApiFetchServer } from "../../../lib/ApiFetchServer";

async function FavoritePage() {
  const FavortJob = await ApiFetchServer("/favorites");

  return (
    <div className="mb-40">
      <CreateTitle title="الوظائف المفضلة" number={10} />
      {FavortJob.dataResponse.data.map((job) => {
        return (
          <JobCard
            key={job?.FavoriteID}
            JobAdID={job?.JobAdID}
            title={job?.job_ad?.Title}
            company={job?.job_ad?.company?.CompanyName}
            location={job?.job_ad?.Location}
            workType={job?.job_ad?.WorkType}
            mode={job?.job_ad?.WorkplaceType}
            postedAgo={new Date(job?.job_ad?.PostedAt ?? "").toLocaleDateString(
              "ar-EG",
              {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              },
            )}
            ExpiryDate={job?.job_ad?.ExpiryDate}
            salaryFrom={job?.job_ad?.SalaryMin}
            salaryTo={job?.job_ad?.SalaryMax}
            currency={job?.job_ad?.Currency}
          />
        );
      })}
    </div>
  );
}

export default FavoritePage;
