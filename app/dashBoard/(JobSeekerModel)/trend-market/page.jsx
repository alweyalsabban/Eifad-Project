"use client";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect, useState, useContext } from "react";
import TopSkillsDemandCard from "./components/TopSkillsDemandCard";
import SearchFieldBar from "./components/SearchFieldBar";
import TrendingJobs from "./components/TrendingJobs";
import { FiDownload } from "react-icons/fi";

function MarketTrend() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  const [field, setField] = useState("");

  useEffect(() => {
    setnameOfSideBar("إتجاهات السوق");
    setnumberOfSideBar(9);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  const skills = [
    { name: "React", percent: 95 },
    { name: "Node.js", percent: 88 },
    { name: "Python", percent: 85 },
    { name: "AWS", percent: 82 },
    { name: "Docker", percent: 78 },
  ];
  return (
    <div className="mb-40">
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
