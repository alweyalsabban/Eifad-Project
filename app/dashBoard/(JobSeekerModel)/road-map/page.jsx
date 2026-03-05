"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
import TaskProgressCard from "./components/TaskProgressCard";
import SmartRecommendationsBanner from "../recommed-job/components/SmartRecommendationsBanner";
function RoadMap() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("خارطة الطريق المهنية");
    setnumberOfSideBar(8);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return (
    <>
      <div className="w-[98%] m-auto">
        <SmartRecommendationsBanner />
      </div>
      <div className="mb-40">
        <TaskProgressCard />
      </div>
    </>
  );
}

export default RoadMap;
