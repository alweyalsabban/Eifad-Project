"use client";

import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { JobApplication } from "../../callFunctionsForJobseeker";
import {
  HeartIcon,
  MapPinIcon,
  ClockIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "./Loader ";

export default function JobCard({
  CVId,
  JobAdID,
  title,
  company,
  location,
  workType,
  mode,
  postedAgo,
  ExpiryDate,
  salaryFrom,
  salaryTo,
  currency,
  onQuickApply,
  logoPath,
}) {
  const router = useRouter();
  const expiry = new Date(ExpiryDate);
  const now = new Date();

  const isExpired = expiry < now;
  const [saved, setSaved] = useState(false);
  const [match, setMatch] = useState(null);

  async function onToggleSave() {
    if (!saved) {
      const res = await JobApplication("MakeFavoritJob", {
        jobId: JobAdID,
      });
      router.refresh();
      if (res.isSusses) {
        setSaved(true);
        toast.success("تم إضافة الوظيفة إلى المفضلة");
      }
    } else {
      const res = await JobApplication("RemoveFavoritJob", {
        jobId: JobAdID,
      });
      router.refresh();
      if (res.isSusses) {
        setSaved(false);
        toast.success("تم إزالة الوظيفة إلى المفضلة");
      }
    }
  }
  useEffect(() => {
    async function fetchData() {
      const res = await JobApplication("favorites");
      res.dataResponse.data.forEach((item) => {
        if (item.JobAdID === JobAdID) {
          setSaved(true);
        }
      });
    }
    async function calMathc() {
      const res = await JobApplication("CalMatchAiJob", {
        jobId: JobAdID,
        CvId: CVId,
      });
      setMatch(res.dataResponse.data);
    }

    fetchData();
    calMathc();
  }, [JobAdID, CVId]);
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 mt-5">
      {/* Logo  */}
      <div className="">
        <div className=" w-full flex justify-between items-center">
          <div className="flex gap-2">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl
         bg-blue-600 text-white font-bold"
            >
              G
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">{title}</h3>

              {/* company name under title (like image) */}
              <p className="mt-1 text-sm text-slate-600">{company}</p>
            </div>
          </div>
          {/* LEFT: heart + match */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2">
              {isExpired && (
                <h1 className="bg-red-500 text-white px-3 py-1 rounded-2xl">
                  مغلق
                </h1>
              )}

              <button
                type="button"
                onClick={onToggleSave}
                className="text-slate-400 hover:text-red-500 hover:cursor-pointer"
                aria-label="حفظ الوظيفة"
              >
                {saved ? (
                  <FaHeart className={`h-6 w-6  text-red-500`} />
                ) : (
                  <HeartIcon className={`h-6 w-6  text-red-500`} />
                )}
              </button>
            </div>

            <div className="inline-flex h-10 items-center gap-2 rounded-xl bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white text-xs">
                ◎
              </span>
              {match === null ? (
                <div className="scale-50">
                  <Loader />
                </div>
              ) : (
                `${match?.match_score}%`
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: content + logo */}
        <div className="flex flex-wrap w-full justify-between gap-4  px-3">
          {/* Text */}
          <div>
            {/* meta row */}
            <div className="mt-3 flex flex-wrap items-center  gap-3 text-sm text-slate-500 ">
              <span className="inline-flex items-center gap-1">
                <MapPinIcon className="h-4 w-4" />
                {location}
              </span>

              <span className="text-slate-300">•</span>

              <span className="inline-flex items-center gap-1">
                <BriefcaseIcon className="h-4 w-4" />
                {workType}
              </span>

              <span className="text-slate-300">•</span>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600">
                {mode}
              </span>
            </div>

            {/* second row: time + salary */}
            <div className="mt-3 flex items-center justify-end gap-6">
              {/* salary on the far right */}
              <div className="inline-flex items-center gap-2 text-green-600 font-semibold">
                <CurrencyDollarIcon className="h-5 w-5" />
                <span>
                  {salaryTo} - {salaryFrom} {currency}
                </span>
              </div>

              {/* time (a bit left) */}
              <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                <ClockIcon className="h-4 w-4" />
                <span>
                  {postedAgo} إلى{" "}
                  {expiry.toLocaleDateString("ar-EG", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-4 mt-5">
        {/* big blue button */}
        <Link
          href={`/dashBoard/search-job/${JobAdID}`}
          className="h-12 flex flex-1 rounded-2xl bg-blue-600 text-white font-medium 
          hover:bg-blue-700 hover:cursor-pointer items-center justify-center "
        >
          عرض التفاصيل
        </Link>

        {/* left small button */}
        <button
          type="button"
          disabled={isExpired}
          onClick={onQuickApply}
          className={`h-12 rounded-xl border  font-medium px-8
             ${isExpired ? "opacity-50 border-red-600 text-red-700 hover:cursor-not-allowed " : "border-green-500  text-green-600 hover:bg-green-50 hover:cursor-pointer"} `}
        >
          تقديم سريع
        </button>
      </div>
    </section>
  );
}
