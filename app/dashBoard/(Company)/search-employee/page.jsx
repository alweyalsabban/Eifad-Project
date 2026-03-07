"use client";
import JobSearchBar from "./components/JobSearchBar";
import { useContext, useEffect } from "react";
import { NamePageContex } from "../../(JobSeekerModel)/context/NamePageContext";
import CandidateSimpleCard from "./components/CandidateSimpleCard";

function SearchEmployee() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("البحث عن موظفين");
    setnumberOfSideBar(5);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return (
    <div className="w-[98%] mx-auto">
      <JobSearchBar />
      <div>
        <CandidateSimpleCard
          name="محمد عبدالله"
          title="مطور ويب متكامل"
          experience="4 سنوات"
          location="الرياض"
          status="متاح"
          skills={["React", "Node.js", "MongoDB"]}
          onViewProfile={() => console.log("عرض الملف")}
          onContact={() => console.log("تواصل")}
        />
      </div>
    </div>
  );
}

export default SearchEmployee;
