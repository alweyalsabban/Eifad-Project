"use client";
import { useState } from "react";
import TopSkillsDemandCard from "./components/TopSkillsDemandCard";
import SearchFieldBar from "./components/SearchFieldBar";
import TrendingJobs from "./components/TrendingJobs";
import { FiDownload } from "react-icons/fi";
import CreateTitle from "../CreateTitle";
function MarketTrend() {
  const [field, setField] = useState("");

  const skills = [
    { name: "React", percent: 95 },
    { name: "Node.js", percent: 88 },
    { name: "Python", percent: 85 },
    { name: "AWS", percent: 82 },
    { name: "Docker", percent: 78 },
  ];
  return (
    <div className="mb-40">
      <CreateTitle title="إتجاهات السوق" number={9} />

      <SearchFieldBar
        value={field}
        onChange={setField}
        onSearch={() => console.log("search:", field)}
      />
      <TopSkillsDemandCard items={skills} />
      <TrendingJobs />

      <button
        className="flex w-full items-center justify-center gap-2 rounded-xl
        bg-blue-600 py-3 text-sm font-semibold text-white
        transition hover:bg-blue-700"
      >
        <FiDownload size={18} />
        تحميل تقرير سوق العمل (PDF)
      </button>
    </div>
  );
}

export default MarketTrend;
