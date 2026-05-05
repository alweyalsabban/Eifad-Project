"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import ResumePage from "../../../(JobSeekerModel)/cv/components/CVPDF";
import { Profile } from "../../callFunctionsForCompany";

export default function CandidateSimpleCard({ employee }) {
  const [showPreview, setShowPreview] = useState(false);
  const [CVInfo, setCVInfo] = useState([]);
  const [ProfileUser, setProfile] = useState({
    FullName: "",
    Phone: "",
    Email: "",
    Location: "",
  });

  useEffect(() => {
    async function GetData() {
      const Detail = await Profile("ProfileDetil", employee?.user?.UserID);
      setCVInfo(Detail.cv);
      setProfile({
        FullName: Detail?.FullName,
        Phone: Detail?.Phone,
        email: Detail?.Email,
        Location: Detail?.Location,
      });
    }
    GetData();
  }, [employee?.user?.UserID]);

  return (
    <div
      dir="rtl"
      className="w-full rounded-3xl mt-5 border border-slate-200 bg-white p-6"
    >
      {showPreview && (
        <div className="fixed inset-0  z-50 bg-black/60 print:hidden">
          <button
            type="button"
            onClick={() => {
              setShowPreview(false);
            }}
            className="fixed top-4 left-1/2 z-100 -translate-x-1/2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow hover:bg-slate-100"
          >
            إغلاق المعاينة
          </button>

          <div className="h-screen overflow-y-auto overflow-x-hidden pt-20">
            <div className="mx-auto w-full max-w-[230mm] px-4 md:px-6">
              <ResumePage CVInfo={CVInfo} Profile={ProfileUser} />
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-[10%_auto] flex-wrap gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl text-white">
          {employee?.PersonalPhoto?.length > 20 ? (
            <Image
              alt="profile photo"
              src={employee?.PersonalPhoto ?? ""}
              width={200}
              height={200}
              className=" h-16 w-16  rounded-full object-cover"
            />
          ) : (
            "E"
          )}
        </div>

        <div>
          <h3 className="text-[20px] font-extrabold text-slate-900">
            {employee?.user?.FullName}
          </h3>

          <p className="mt-1 text-[16px] text-slate-600 ">
            {employee?.ProfileSummary}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-[15px] text-slate-500">
            <div className="flex items-center gap-1">
              <FiPhone />
              {employee?.user?.Phone}
            </div>

            <div className="flex items-center gap-1">
              <FiMail />
              {employee?.user?.Email}
            </div>

            <div className="flex items-center gap-1">
              <FiMapPin className="text-[15px]" />
              <span>{employee?.Location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5 h-px w-full bg-slate-200" />

      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            setShowPreview(true);
          }}
          /*           href={`/dashBoard/search-employee/${employee.JobSeekerID}`}
           */ className="h-11 flex-1 rounded-xl bg-blue-600 px-6 text-[16px] font-medium 
          text-white transition hover:bg-blue-700 justify-center items-center flex hover:cursor-pointer"
        >
          عرض السيرة الذاتية
        </button>

        {/* <button
          type="button"
          className="h-11 rounded-xl border border-slate-300 bg-white px-6 text-[16px] font-medium text-slate-700 transition hover:bg-slate-50"
        >
          تواصل
        </button> */}
      </div>
    </div>
  );
}
