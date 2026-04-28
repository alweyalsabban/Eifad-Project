"use client";
import TaskProgressCard from "./components/TaskProgressCard";
import CreateTitle from "../CreateTitle";
import { RoadMapFuncation } from "../callFunctionsForJobseeker";
import { JobApplication } from "../callFunctionsForJobseeker";
import LoaderTwo from "../components/LoaderTwo";
import { useEffect, useState } from "react";
function RoadMap() {
  const [loading, setLoading] = useState(false);
  const [isFillTarget, setTarget] = useState(false);
  const [isTargetTrue, setisTargetTrue] = useState(false);
  const [target, setTargetTitle] = useState("");
  const [RoadMap, setRoadMap] = useState(null);
  const [cvId, setCvId] = useState(null);
  useEffect(() => {
    async function FetchData() {
      setLoading(true);
      const res = await RoadMapFuncation("GetPreRoadMap");
      const resCVInfo = await JobApplication("GetCVInfo");
      setCvId(resCVInfo.CVID);
      setRoadMap(res);
      setLoading(false);
    }
    FetchData();
  }, []);

  async function CreateRoadMap() {
    setLoading(true);
    const res = await RoadMapFuncation("CreateNewRoadMap", {
      title: target,
      idCV: cvId,
    });
    setRoadMap(res);
    setLoading(false);
  }

  async function handelCreateRoad() {
    if (target.length > 10) {
      await CreateRoadMap();
      setTarget(false);
    } else {
      setisTargetTrue(true);
    }
  }
  return (
    <>
      {isFillTarget && (
        <div className="w-[90%] mx-auto mt-8 mb-6">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-4 md:p-6">
            <label className="block text-sm font-bold text-slate-700 mb-3">
              حدد هدفك المهني
            </label>

            <div className="flex flex-col md:flex-row items-stretch gap-3">
              <input
                type="text"
                placeholder="ما هو هدفك الذي تريد أن تصل إليه؟"
                value={target}
                onChange={(e) => {
                  setTargetTitle(e.target.value);
                }}
                className="
          flex-1 rounded-2xl border border-slate-300 bg-slate-50
          px-5 py-3 text-right text-slate-800 placeholder:text-slate-400
          outline-none transition duration-300
          focus:border-primaryBlue focus:bg-white focus:ring-4 focus:ring-blue-100
        "
              />

              <button
                className="
          bg-primaryBlue px-8 py-3 rounded-2xl text-white font-bold
          shadow-md shadow-blue-100
          hover:scale-105 hover:shadow-lg
          active:scale-95 duration-300
          hover:cursor-pointer
        "
                onClick={handelCreateRoad}
              >
                أنشئ
              </button>

              <button
                className="
          bg-red-600 px-8 py-3 rounded-2xl text-white font-bold
          shadow-md shadow-blue-100
          hover:scale-105 hover:shadow-lg
          active:scale-95 duration-300
          hover:cursor-pointer
        "
                onClick={() => {
                  setTarget(false);
                }}
              >
                إلغاء
              </button>
            </div>
            {isTargetTrue && (
              <p className="text-red-600 font-bold text-[14px] mr-2 mt-2">
                *أكتب هدف صحيح
              </p>
            )}

            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              اكتب الهدف الذي تطمح للوصول إليه، وسيتم بناء خارطة طريق مهنية
              مناسبة لك.
            </p>
          </div>
        </div>
      )}
      <CreateTitle title="خارطة الطريق المهنية" number={8} />
      <button
        className="bg-primaryBlue px-4 py-2 rounded-2xl text-auxiliaryColorWhite hover:cursor-pointer 
      hover:scale-110 duration-500 mt-10"
        onClick={() => {
          setTarget(true);
        }}
      >
        {RoadMap !== null ? "أنشئ خريطة جديدة" : "إنشاء سيرة ذاتية"}
      </button>
      <div className="w-[90%] mx-auto my-6">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 md:p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            معلومات الخطة
          </h2>

          <div className="space-y-4">
            <div className="flex gap-3 items-center bg-slate-50 rounded-2xl px-4 py-3">
              <span className="text-slate-500 text-sm">موقعك الحالي</span>
              <span className="font-semibold text-slate-800">
                {RoadMap?.current_level}
              </span>
            </div>

            <div className="flex gap-3 items-center bg-slate-50 rounded-2xl px-4 py-3">
              <span className="text-slate-500 text-sm">هدفك</span>
              <span className="font-semibold text-primaryBlue">
                {RoadMap?.target_level}
              </span>
            </div>

            <div className="flex gap-3 items-center bg-slate-50 rounded-2xl px-4 py-3">
              <span className="text-slate-500 text-sm">مدة الخطة</span>
              <span className="font-semibold text-slate-800">
                {RoadMap?.total_estimated_time}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-40">
        <h1 className="text-xl font-bold mt-3">الخطوات التفصيلية للخريطة :</h1>
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <LoaderTwo />
          </div>
        ) : (
          RoadMap?.milestones?.map((item, index) => {
            return (
              <TaskProgressCard
                key={index}
                title={item.title}
                duration={item.duration}
                index={index + 1}
              />
            );
          })
        )}
      </div>
    </>
  );
}

export default RoadMap;
