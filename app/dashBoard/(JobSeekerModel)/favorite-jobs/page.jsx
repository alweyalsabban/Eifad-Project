"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
import JobCard from "../search-job/components/JobCard";

function FavoritePage() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("الوظائف المفضلة");
    setnumberOfSideBar(10);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return (
    <div className="mb-40">
      <JobCard />
    </div>
  );
}

export default FavoritePage;
