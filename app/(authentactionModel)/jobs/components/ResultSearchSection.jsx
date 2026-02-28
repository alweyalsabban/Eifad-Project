"use client";
import { useState, useEffect } from "react";
import FilterInput from "./FilterInput";
import AdsJob from "./AdsJob";
import DeatilsAdJobs from "./DeatilsAdJobs";
import Lottie from "lottie-react";
import animationData from "@/public/animations/animationData.json";

function ResultSearchSection({ keyword }) {
  const [isFilter, setFilter] = useState(false);
  const [isFoundJobs, setFoundJobs] = useState(true);
  const [allJobs, setAllJobs] = useState([]);
  const [IDJob, setIDJob] = useState(0);

  //Filter
  const [WorkplaceType, setWorkplaceType] = useState("");
  const [WorkWorkType, setWorkType] = useState("");
  const [Location, setLocation] = useState("");
  const [SalaryMin, setSalaryMin] = useState("");
  const [SalaryMax, setSalaryMax] = useState("");
  const [isClean, setClean] = useState(false);

  useEffect(() => {
    async function jobs() {
      const params = new URLSearchParams({
        keyword: keyword,
        location: Location,
        work_type: WorkWorkType,
        workplace_type: WorkplaceType,
        salary_min: SalaryMin,
        salary_max: SalaryMax,
        per_page: "30",
      });
      const response = await fetch(`/api/jobs?${params}`);
      const data = await response.json();
      setAllJobs(data.data);
      setFoundJobs(false);
    }
    jobs();
  }, [keyword, WorkplaceType, WorkWorkType, Location, SalaryMin, SalaryMax]);

  return (
    <div className="cusContaner  m-auto my-10 " dir="rtl">
      <div>
        <button
          className={`border border-secondColorBlack px-3 py-2 rounded-xl hover:cursor-pointer ${isFilter && "bg-blue-100"} hover:bg-blue-100`}
          onClick={() => {
            setFilter(!isFilter);
          }}
        >
          فلاتر متقدمة
          {isFilter && <span className="pr-4">X</span>}
        </button>
        {isFilter && (
          <div className="border border-auxiliaryColorGray my-4 px-10 py-4 rounded-xl flex flex-wrap gap-2 items-center justify-center">
            <FilterInput
              lableName="مكان الدوام"
              options={[
                { name: "الكل", value: "" },
                { name: "حضوري", value: "On-site" },
                { name: "عن بعد", value: "Remote" },
                { name: "هجين", value: "Hybri" },
              ]}
              setvalue={setWorkplaceType}
              isClean={isClean}
            />
            <FilterInput
              lableName="نوع الدوام"
              options={[
                { name: "الكل", value: "" },
                { name: "جزئي", value: "Part-time" },
                { name: "كلي", value: "Full-time" },
              ]}
              setvalue={setWorkType}
              isClean={isClean}
            />
            <div>
              <label className="block mb-2 text-sm font-medium">الموقع</label>
              <input
                type="text"
                value={Location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-right shadow-sm"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">اقل راتب</label>
              <input
                type="text"
                value={SalaryMin}
                onChange={(e) => {
                  setSalaryMin(e.target.value);
                }}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-right shadow-sm"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                أعلى راتب
              </label>
              <input
                type="text"
                value={SalaryMax}
                onChange={(e) => {
                  setSalaryMax(e.target.value);
                }}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-right shadow-sm"
              />
            </div>
            <h1
              className="bg-red-600 hover:cursor-pointer text-white px-4 py-2 rounded-xl"
              onClick={() => {
                setWorkplaceType("");
                setWorkType("");
                setLocation("");
                setSalaryMin("");
                setSalaryMax("");
                setClean(true);
                setTimeout(function () {
                  setClean(false);
                }, 1000);
              }}
            >
              مسح الفلترة
            </h1>
          </div>
        )}
        <h1 className="font-bold text-l mt-4">
          {allJobs.length > 0
            ? ` تم العثور على ${allJobs.length} وظيفة`
            : isFoundJobs
              ? `جاري البحث عن وظائف ...`
              : ""}
        </h1>
      </div>
      {/* Result Section */}
      {allJobs.length > 0 ? (
        <div className="flex gap-2">
          <div className=" mt-5 flex flex-col  gap-2 md:max-h-[70vh] md:overflow-y-auto px-3 ">
            {allJobs.map((a, index) => {
              return (
                <span
                  key={a.JobAdID}
                  onClick={() => {
                    setIDJob(index);
                  }}
                >
                  <AdsJob jobAds={allJobs[index]} />
                </span>
              );
            })}
          </div>

          <div className=" w-[65%] hidden md:block">
            <DeatilsAdJobs jobAds={allJobs[IDJob]} />
          </div>
        </div>
      ) : isFoundJobs ? (
        <div className="flex gap-2 w-full">
          <div className="w-[40%]">
            <div className="bg-gray-100  h-70 rounded-xl flex flex-col gap-3 px-10 py-4 mt-4 animate-pulse"></div>
            <div className="bg-gray-100  h-70 rounded-xl flex flex-col gap-3 px-10 py-4 mt-4 animate-pulse"></div>
          </div>

          <div
            dir="rtl"
            className="bg-gray-100 w-[60%] h-100 rounded-2xl p-6 mt-3 animate-pulse"
          ></div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="w-30 h-30">
            <Lottie animationData={animationData} loop={true} autoplay={true} />
          </div>
          لا يوجد وظائف
        </div>
      )}
    </div>
  );
}

export default ResultSearchSection;
