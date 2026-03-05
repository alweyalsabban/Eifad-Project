import CompanyAboutCard from "../../search-job/components/CompanyAboutCard";
import JobCard from "../../search-job/components/JobCard";

function page() {
  return (
    <>
      <CompanyAboutCard />
      <h1 className="font-bold text-2xl mt-15 mr-5">الوظائف المنشورة</h1>
      <div className="mt-10">
        <JobCard />
      </div>
    </>
  );
}

export default page;
