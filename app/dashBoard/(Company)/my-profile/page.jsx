"use client";
import { useContext, useEffect } from "react";
import { NamePageContex } from "../../(JobSeekerModel)/context/NamePageContext";
import CompanyInfoForm from "./components/CompanyInfoForm";
import CompanyStatsCard from "./components/CompanyStatsCard";
import CompanyImageCard from "./components/CompanyImageCard";
import ProfileCompletionCard from "./components/ProfileCompletionCard";

function CompanyProfile() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);

  useEffect(() => {
    setnameOfSideBar("ملف الشركة");
    setnumberOfSideBar(2);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return (
    <div
      className="w-[98%] grid grid-cols-1 md:grid-cols-[70%_auto] 
    gap-2 mx-auto mb-40"
    >
      <CompanyInfoForm />

      <div>
        <CompanyStatsCard />
        <CompanyImageCard />
        <ProfileCompletionCard />
      </div>
    </div>
  );
}

export default CompanyProfile;
