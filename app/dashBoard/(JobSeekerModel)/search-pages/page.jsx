"use client";

import { useState, useEffect } from "react";
import PageSearch from "./components/PageSearch";
import CompanyCard from "./components/CompanyCard";
import CreateTitle from "../CreateTitle";
import { Companies } from "../callFunctionsForJobseeker";
import LoaderTwo from "../components/LoaderTwo";
function SearchPages() {
  const [active, setActive] = useState("search");
  const [AllConmpnies, setAllConmpnies] = useState(null);
  const [AllFollowPage, setAllFollowPage] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [params, setParams] = useState({
    name: "",
    location: "",
    field: "",
  });

  useEffect(() => {
    async function Fetch() {
      setLoading(true);
      const res = await Companies("GetAllCompanies", params);
      const resFollowPage = await Companies("GetAllFollwPage");
      setAllFollowPage(resFollowPage);
      setAllConmpnies(res);
      setLoading(false);
    }
    Fetch();
  }, [params]);
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
            الصفحات التي أتابعها
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
      {active === "search" && (
        <PageSearch params={params} setParams={setParams} />
      )}
      {isLoading ? (
        <div className="items-center justify-center flex mt-30">
          <LoaderTwo />
        </div>
      ) : active === "search" ? (
        AllConmpnies?.map((item, index) => {
          return (
            <CompanyCard
              key={index}
              name={item?.CompanyName}
              city={item?.Address}
              companyId={item?.CompanyID}
              AllFollowPage={AllFollowPage}
              setAllFollowPage={setAllFollowPage}
              AllConmpnies={AllConmpnies}
              UrlImage={item.LogoPath}
            />
          );
        })
      ) : AllFollowPage.length > 0 ? (
        AllFollowPage?.map((item, index) => {
          return (
            <CompanyCard
              key={index}
              name={item?.company?.CompanyName}
              city={item?.company?.Address}
              companyId={item?.CompanyID}
              AllFollowPage={AllFollowPage}
              setAllFollowPage={setAllFollowPage}
              AllConmpnies={AllConmpnies}
              UrlImage={item?.company?.LogoPath}
            />
          );
        })
      ) : (
        <h1 className="flex items-center justify-center mt-10">
          {" "}
          لا توجد صفحات تمت متابعتها
        </h1>
      )}
    </div>
  );
}

export default SearchPages;
