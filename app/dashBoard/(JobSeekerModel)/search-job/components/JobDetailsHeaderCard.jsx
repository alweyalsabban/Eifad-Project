"use client";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";

import {
  HeartIcon,
  ShareIcon,
  MapPinIcon,
  BriefcaseIcon,
  ClockIcon,
  UserIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { JobApplication } from "../../callFunctionsForJobseeker";
import { useState, useEffect } from "react";

export default function JobDetailsHeaderCard({
  title,
  company,
  location,
  mode,
  workType,
  postedAgo,
  applicants,
  salaryFrom,
  salaryTo,
  currency,
  onApplyNow,
  JobAdID,
  CVID,
  isExpired,
}) {
  const [isFavoritJob, setFavoritJob] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const res = await JobApplication("favorites");
      res.dataResponse.data.forEach((item) => {
        if (item.JobAdID === JobAdID) {
          setFavoritJob(true);
        }
      });
    }
    fetchData();
  }, [JobAdID]);
  const onAutoApply = async () => {
    const res = await JobApplication("AutoAppleyJob", {
      JobID: JobAdID,
      CVID: CVID,
    });
    if (!res.false) toast.error(res.dataResponse.message);
  };

  const onFavoritJob = async () => {
    if (!isFavoritJob) {
      const res = await JobApplication("MakeFavoritJob", {
        jobId: JobAdID,
      });
      if (res.isSusses) {
        setFavoritJob(true);
        toast.success("تم إضافة الوظيفة إلى المفضلة");
      }
    } else {
      const res = await JobApplication("RemoveFavoritJob", {
        jobId: JobAdID,
      });
      if (res.isSusses) {
        setFavoritJob(false);
        toast.success("تم إزالة الوظيفة إلى المفضلة");
      }
    }
  };
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 mt-5">
      {/* Top row */}
      <div className="">
        <div className="grid grid-cols-[10%_70%_25%] items-center">
          <div className="space-x-5 text-slate-500">
            <button
              type="button"
              onClick={onFavoritJob}
              className="hover:text-red-500 hover:cursor-pointer scale-120"
              aria-label="حفظ"
              title="حفظ"
            >
              {isFavoritJob ? (
                <FaHeart className={`h-6 w-6 text-red-500`} />
              ) : (
                <HeartIcon className={`h-6 w-6 text-red-500`} />
              )}
            </button>

            {/*       <button
              type="button"
              onClick={onShare}
              className="hover:text-slate-700"
              aria-label="مشاركة"
              title="مشاركة"
            >
              <ShareIcon className="h-6 w-6" />
            </button> */}
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
            <p className="mt-1 text-sm text-slate-600">{company}</p>
          </div>

          <div className="grid sm:grid-cols-2 grid-cols-1 items-center gap-2">
            <div>
              {isExpired && (
                <h1 className="bg-red-500 text-white px-3 py-1 rounded-2xl w-fit">
                  مغلق
                </h1>
              )}
            </div>
            <div className="rounded-xl bg-blue-600 text-white text-lg font-bold px-5 py-3 w-fit">
              G
            </div>
          </div>
        </div>

        {/* Right content + logo */}
        <div className="flex flex-1 items-start justify-between gap-4">
          {/* Text */}
          <div className="text-right">
            {/* Meta row 1 */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1">
                <MapPinIcon className="h-4 w-4" />
                {location}
              </span>

              <span className="text-slate-300">•</span>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600">
                {mode}
              </span>

              <span className="text-slate-300">•</span>

              <span className="inline-flex items-center gap-1">
                <BriefcaseIcon className="h-4 w-4" />
                {workType}
              </span>
            </div>

            {/* Meta row 2 */}
            <div className="mt-4 flex flex-wrap items-center  gap-6 text-sm">
              <span className="inline-flex items-center gap-2 text-slate-500">
                <ClockIcon className="h-4 w-4" />
                {postedAgo}
              </span>

              <span className="inline-flex items-center gap-2 text-slate-500">
                <UserIcon className="h-4 w-4" />
                {applicants} متقدم
              </span>

              <span className="inline-flex items-center gap-2 font-semibold text-green-600">
                <span className="text-green-600">$</span>
                {salaryTo} - {salaryFrom} {currency}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 h-px w-full bg-slate-200" />

      {/* Buttons */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Apply Now */}
        <button
          type="button"
          onClick={onApplyNow}
          disabled={isExpired}
          className={`h-12 w-full rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 
            ${isExpired ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}`}
        >
          تقديم الآن
        </button>

        {/* Auto Apply */}
        <button
          disabled={isExpired}
          type="button"
          onClick={onAutoApply}
          className={`h-12 w-full rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 inline-flex 
          items-center justify-center gap-2   ${isExpired ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}`}
        >
          <SparklesIcon className="h-5 w-5" />
          تقديم تلقائي
        </button>
      </div>
    </section>
  );
}
