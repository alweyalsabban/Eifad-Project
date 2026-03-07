"use client";
import { useContext, useEffect, useState } from "react";
import { NamePageContex } from "../context/NamePageContext";
import PageSearch from "./components/PageSearch";
import CompanyCard from "./components/CompanyCard";
function SearchPages() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  const [active, setActive] = useState("search");

  useEffect(() => {
    setnameOfSideBar("الصفحات");
    setnumberOfSideBar(11);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return (
    <div className="mb-40">
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

      <CompanyCard />
    </div>
  );
}

export default SearchPages;
