"use client";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect, useState, useContext } from "react";
import JobSearchBar from "./components/JobSearchBar";
import JobCard from "./components/JobCard";

function JobSearchPage() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    setnameOfSideBar("البحث عن وظائف");
    setnumberOfSideBar(5);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return (
    <>
      <JobSearchBar />
      <div className="flex justify-between items-center mt-5">
        <h1 className="w-[95%] m-auto mt-5 font-bold ">
          تم العثور على 5 وظائف
        </h1>

        <div dir="rtl" className="w-56 ">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-right text-slate-900
                   outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 hover:cursor-pointer"
          >
            <option value="best">الأعلى مطابقة</option>
            <option value="latest">الأحدث</option>
            <option value="salary">الراتب: من الأعلى للأدنى</option>
          </select>
        </div>
      </div>
      <div className="mb-40">
        <JobCard />
      </div>
    </>
  );
}

export default JobSearchPage;
