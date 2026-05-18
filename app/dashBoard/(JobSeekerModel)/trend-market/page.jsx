"use client";
import { useEffect, useState } from "react";
import TopSkillsDemandCard from "./components/TopSkillsDemandCard";
import SearchFieldBar from "./components/SearchFieldBar";
import TrendingJobs from "./components/TrendingJobs";
import { FiDownload } from "react-icons/fi";
import CreateTitle from "../CreateTitle";
import { MarketTrendFunction } from "../callFunctionsForJobseeker";
function MarketTrend() {
  const [field, setField] = useState("");
  const [Major, setMajor] = useState(null);
  const [SelectedMajor, setSelectedMajor] = useState(3);
  const [Skills, setSkills] = useState(null);
  const [Jobs, setJobs] = useState(null);
  const [salary, setSalary] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await MarketTrendFunction("GetAllSectionMajor");
      setMajor(res);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/immutability
    GetInfoForMarket();
  }, [SelectedMajor]);

  async function GetInfoForMarket() {
    const res = await MarketTrendFunction("GetInfoForMaeket", {
      id: SelectedMajor,
    });
    setSkills(res.in_demand_skills.labels);
    setJobs(res.trending_jobs.labels);
    setSalary(res.trending_jobs.salaries);
  }

  return (
    <div className="mb-40">
      <CreateTitle title="إتجاهات السوق" number={9} />

      <SearchFieldBar
        value={Major}
        setSelectedMajor={setSelectedMajor}
        onSearch={GetInfoForMarket}
      />
      <TopSkillsDemandCard items={Skills} />
      <TrendingJobs jobs={Jobs} salary={salary} />

      {/*   <button
        className="flex w-full items-center justify-center gap-2 rounded-xl
        bg-blue-600 py-3 text-sm font-semibold text-white
        transition hover:bg-blue-700"
      >
        <FiDownload size={18} />
        تحميل تقرير سوق العمل (PDF)
      </button> */}
    </div>
  );
}

export default MarketTrend;
