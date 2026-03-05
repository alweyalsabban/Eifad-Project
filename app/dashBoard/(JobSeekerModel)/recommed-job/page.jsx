"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
import JobCard from "../search-job/components/JobCard";
import SmartRecommendationsBanner from "./components/SmartRecommendationsBanner";
function RecommedJob() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("الوظائف الموصى بها");
    setnumberOfSideBar(6);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return (
    <>
      <SmartRecommendationsBanner />
      <div className="mb-40">
        <JobCard />
      </div>
    </>
  );
}

export default RecommedJob;
