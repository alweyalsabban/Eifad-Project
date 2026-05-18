import CompanyInfoForm from "./components/CompanyInfoForm";
import CompanyStatsCard from "./components/CompanyStatsCard";
import CreateTitle from "../../(JobSeekerModel)/CreateTitle";
import { ApiFetchServer } from "../../../lib/ApiFetchServer";

async function CompanyProfile() {
  async function FetchProfileData() {
    const res = await ApiFetchServer("/profile");

    return res.dataResponse.data;
  }
  async function FetchMainData() {
    const res = await ApiFetchServer("/auth/me");

    return res.dataResponse.data;
  }
  const infoProfile = await FetchProfileData();
  const mainData = await FetchMainData();
  return (
    <div className="w-[98%]  mb-40">
      <CreateTitle title="ملف الشركة" number={2} />
      <CompanyInfoForm infoProfile={infoProfile} mainData={mainData} />
    </div>
  );
}

export default CompanyProfile;
