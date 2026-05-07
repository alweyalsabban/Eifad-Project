"use client";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import LoaderTwo from "../../components/LoaderTwo";
import Image from "next/image";
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
  JobAdID,
  CVID,
  isExpired,
}) {
  const [isFavoritJob, setFavoritJob] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [loadingForAutoApplay, setLoadingAuto] = useState(false);
  const [loadingSaveManule, setLoadingSaveManule] = useState(false);
  const [OpenForm, setOpenForm] = useState(false);
  const [form, setForm] = useState({
    JobSeekerName: "",
    JobSeekerEmail: "",
    JobSeekerPhone: "",
    JobSeekerAddress: "",
    AboutMe: "",
    notes: "",
    job_id: JobAdID,
    cv: null,
  });

  useEffect(() => {
    async function fetchData() {
      const res = await JobApplication("favorites");
      res.dataResponse.data.forEach((item) => {
        if (item.JobAdID === JobAdID) {
          setFavoritJob(true);
        }
      });
      if (CVID > 0) {
        setLoading(false);
      }
    }
    fetchData();
  }, [JobAdID, isExpired, CVID]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };
  const onAutoApply = async () => {
    setLoadingAuto(true);
    const res = await JobApplication("AutoAppleyJob", {
      JobID: JobAdID,
      CVID: CVID,
    });
    if (!res.isSusses) toast.error(res.dataResponse.message);
    if (res.isSusses) toast.success("تم التقديم بنجاح");
    setLoadingAuto(false);
  };
  /*   const onApplyNow = async (e) => {
    e.preventDefault();
    console.log(JobAdID);
    setLoadingSaveManule(true);
    const res = await JobApplication("ManualAppleyJob", form);
    console.log(res);
    if (!res.isSusses) toast.error(res.dataResponse.message);
    if (res.isSusses) toast.success("تم التقديم بنجاح");
    setLoadingSaveManule(false);
  }; */

  const onApplyNow = async (e) => {
    e.preventDefault();

    setLoadingSaveManule(true);

    const formData = new FormData();

    formData.append("job_id", JobAdID);

    if (form.cv) {
      formData.append("cv", form.cv);
    }

    formData.append("JobSeekerName", form.JobSeekerName);
    formData.append("JobSeekerEmail", form.JobSeekerEmail);
    formData.append("JobSeekerPhone", form.JobSeekerPhone);
    formData.append("JobSeekerAddress", form.JobSeekerAddress);
    formData.append("AboutMe", form.AboutMe);
    formData.append("notes", form.notes);

    const res = await JobApplication("ManualAppleyJob", formData);

    if (!res.isSusses) {
      toast.error(res.dataResponse.message);
    }

    if (res.isSusses) {
      toast.success("تم التقديم بنجاح");
    }
    setOpenForm(false);
    setLoadingSaveManule(false);
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
    <>
      {OpenForm && (
        <div className="fixed z-50 inset-0  bg-black/50 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl scale-95 ">
            <h2 className="text-2xl font-bold mb-6">التقدم للوظيفة</h2>

            <form onSubmit={onApplyNow} className="space-y-4">
              <input
                type="text"
                name="JobSeekerName"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg"
                onChange={handleChange}
              />

              <input
                type="email"
                name="JobSeekerEmail"
                placeholder="Email"
                className="w-full p-3 border rounded-lg"
                onChange={handleChange}
              />

              <input
                type="text"
                name="JobSeekerPhone"
                placeholder="Phone"
                className="w-full p-3 border rounded-lg"
                onChange={handleChange}
              />

              <input
                type="text"
                name="JobSeekerAddress"
                placeholder="Address"
                className="w-full p-3 border rounded-lg"
                onChange={handleChange}
              />

              <textarea
                name="AboutMe"
                placeholder="About Me"
                className="w-full p-3 border rounded-lg"
                onChange={handleChange}
              />

              <textarea
                name="notes"
                placeholder="Notes"
                className="w-full p-3 border rounded-lg"
                onChange={handleChange}
              />

              <input
                type="file"
                accept="application/pdf"
                id="pdf"
                name="cv"
                className="hidden"
                onChange={handleChange}
              />
              {/* Upload PDF */}
              <div className="w-full">
                <label
                  htmlFor="pdf"
                  className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed 
                rounded-2xl cursor-pointerhover:border-blue-500 hover:bg-blue-50 transition hover:cursor-pointer"
                >
                  <p className="text-sm text-gray-500 mt-2">
                    Upload your CV (PDF)
                  </p>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loadingSaveManule}
                  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition hover:cursor-pointer"
                >
                  {loadingSaveManule ? (
                    <div className="flex items-center justify-center">
                      <LoaderTwo />
                    </div>
                  ) : (
                    "تقديم الآن"
                  )}
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    setOpenForm(false);
                  }}
                  className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition hover:cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 mt-5">
        {/* Top row */}
        <div className="">
          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
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
                <h1 className="text-2xl font-semibold text-slate-900">
                  {title}
                </h1>
                <p className="mt-1 text-sm text-slate-600">{company}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 grid-cols-1 items-center gap-2">
              <div>
                {isExpired && (
                  <h1 className="bg-red-500 text-white px-3 py-1 rounded-2xl w-fit">
                    مغلق
                  </h1>
                )}
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
            onClick={() => {
              setOpenForm(true);
            }}
            disabled={isExpired || isLoading}
            className={`h-12 w-full rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 
            ${isExpired || isLoading ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}`}
          >
            تقديم الآن
          </button>

          {/* Auto Apply */}
          <button
            disabled={isExpired || isLoading || loadingForAutoApplay}
            type="button"
            onClick={onAutoApply}
            className={`h-12 w-full rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 inline-flex 
          items-center justify-center gap-2   ${isExpired || isLoading || loadingForAutoApplay ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}`}
          >
            {loadingForAutoApplay ? (
              <div>
                <LoaderTwo colorLoading="fill-green-400" />
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <SparklesIcon className="h-5 w-5" />
                <h1> تقديم تلقائي</h1>{" "}
              </div>
            )}
          </button>
        </div>
      </section>
    </>
  );
}
