"use client";

import { useState, useEffect } from "react";
import PageSearch from "./components/PageSearch";
import CompanyCard from "./components/CompanyCard";
import CreateTitle from "../CreateTitle";
import { Companies } from "../callFunctionsForJobseeker";
function SearchPages() {
  const [active, setActive] = useState("search");
  const [AllPageFollow, setAllPageFollow] = useState(null);

  useEffect(() => {
    async function Fetch() {
      const res = await Companies("GetAllCompanies");
      console.log(res);
      setAllPageFollow(res);
    }
    Fetch();
  }, []);
  return (
    <div className="mb-40">
      <CreateTitle title="الصفحات" number={11} />

      <div className="w-[98%] m-auto rounded-2xl border border-gray-200 p-2 mt-5 ">
        <div className="flex gap-2">
          <button
            onClick={() => setActive("my")}
            className={`flex-1 rounded-xl py-3 text-sm font-medium transition hover:cursor-pointer
          ${
            active === "my"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          >
            صفحتي
          </button>
          <button
            onClick={() => setActive("search")}
            className={`flex-1 rounded-xl py-3 text-sm font-medium transition hover:cursor-pointer
          ${
            active === "search"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          >
            البحث عن صفحات
          </button>
        </div>
      </div>
      {active === "search" && <PageSearch />}
      {AllPageFollow?.map((item, index) => {
        return (
          <CompanyCard
            key={index}
            name={item.CompanyName}
            city={item.Address}
            companyId={item.CompanyID}
          />
        );
      })}
    </div>
  );
}

export default SearchPages;
