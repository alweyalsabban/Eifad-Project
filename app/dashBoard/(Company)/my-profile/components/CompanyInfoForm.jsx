"use client";
import {
  FiCheckCircle,
  FiUpload,
  FiGlobe,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Profile } from "../../callFunctionsForCompany";
import { Loader } from "lucide-react";
import LoaderTwo from "../../../(JobSeekerModel)/components/LoaderTwo";
import setNameCooies from "../../../../lib/setNameCooies";
import { uploadImage } from "../../../../lib/UploadImage";
import ProfileCompletionCard from "../components/ProfileCompletionCard";

export default function CompanyInfoForm({ infoProfile, mainData }) {
  const [ProfileData, setProfileData] = useState({
    logo_path: infoProfile?.LogoPath || "",
    company_name: infoProfile?.CompanyName || "",
    full_name: infoProfile?.CompanyName || "",
    field_of_work: infoProfile?.FieldOfWork || "",
    website_url: infoProfile?.WebsiteURL || "",
    address: infoProfile?.Address || "",
    description: infoProfile?.Description || "",
    phone: mainData?.phone || "",
  });
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  useEffect(() => {
    let filled = 0;

    Object.values(ProfileData).forEach((value) => {
      if (value !== "" && value !== null && value !== undefined) {
        filled += 12.5;
      }
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(filled);
  }, [ProfileData]);

  async function handleSubmit() {
    setLoading(true);
    const res = await Profile("EditProfile", ProfileData);
    console.log("===============");
    console.log(res);
    setNameCooies(ProfileData.full_name);
    setLoading(false);
  }
  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoadingImg(true);
    const url = await uploadImage(file);
    setProfileData((prev) => ({
      ...prev,
      logo_path: url,
    }));
    setLoadingImg(false);
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[70%_auto] 
        gap-2 mx-auto"
    >
      <div
        className="w-full mt-5 rounded-2xl border border-slate-200 
    bg-white p-4 "
      >
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <h2 className="text-xl font-extrabold text-slate-900">
            معلومات الشركة
          </h2>

          <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-600">
            {infoProfile?.IsCompanyVerified === typeof string ? (
              <div>
                <FiCheckCircle className="text-[13px]" />
                موثّق
              </div>
            ) : (
              "لم يتم التحقق"
            )}
          </div>
        </div>

        {/* Logo Upload */}
        <div className="mb-5 flex items-center gap-3">
          {ProfileData?.logo_path?.length > 20 ? (
            loadingImg ? (
              <div>
                <LoaderTwo />
              </div>
            ) : (
              <Image
                src={ProfileData.logo_path}
                width={400}
                height={400}
                alt="صورة الملف الشخصي"
                className="h-14 w-14 items-center justify-center object-cover rounded-xl"
              />
            )
          ) : loadingImg ? (
            <div>
              <LoaderTwo />
            </div>
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-[28px] font-bold text-white shadow-sm">
              G
            </div>
          )}

          <div className="flex-1 text-right">
            <input
              id="uploadFile"
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleUpload}
              className="hidden"
            />
            <label
              htmlFor="uploadFile"
              className=" inline-flex items-center gap-2 rounded-full border border-slate-200
             bg-white px-4 py-2 text-[12px] font-medium text-slate-600 hover:bg-slate-50 hover:cursor-pointer"
            >
              إختر شعار الشركة
            </label>

            <p className="mt-2 text-[10px] text-slate-400">PNG, JPG &lt; 2MB</p>
          </div>
        </div>

        <form className="space-y-4">
          {/* Company Name */}
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-slate-500">
              اسم الشركة
            </label>
            <input
              type="text"
              value={ProfileData.company_name}
              onChange={(e) => {
                setProfileData({
                  ...ProfileData,
                  company_name: e.target.value,
                });
              }}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-[13px] text-slate-700 outline-none placeholder:text-slate-300 focus:border-blue-500"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-slate-500">
              الصناعة
            </label>
            <input
              type="text"
              value={ProfileData.field_of_work}
              onChange={(e) => {
                setProfileData({
                  ...ProfileData,
                  field_of_work: e.target.value,
                });
              }}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-[13px] text-slate-700 outline-none placeholder:text-slate-300 focus:border-blue-500"
            />
          </div>

          {/* Website */}
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-slate-500">
              الموقع الإلكتروني
            </label>
            <div className="relative">
              <FiGlobe className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[15px] text-slate-400" />
              <input
                type="text"
                value={ProfileData.website_url}
                onChange={(e) => {
                  setProfileData({
                    ...ProfileData,
                    website_url: e.target.value,
                  });
                }}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pr-11 pl-4 text-[13px] text-slate-700 outline-none placeholder:text-slate-300 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-slate-500">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <FiMail className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[15px] text-slate-400" />
              <input
                type="email"
                readOnly
                value={mainData?.email}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pr-11 pl-4 text-[13px] text-slate-700 outline-none placeholder:text-slate-300 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-slate-500">
              رقم الهاتف
            </label>
            <div className="relative">
              <FiPhone className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[15px] text-slate-400" />
              <input
                type="text"
                value={ProfileData.phone}
                onChange={(e) => {
                  setProfileData({ ...ProfileData, phone: e.target.value });
                }}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pr-11 pl-4 text-[13px] text-slate-700 outline-none placeholder:text-slate-300 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-slate-500">
              العنوان
            </label>
            <div className="relative">
              <FiMapPin className="pointer-events-none absolute right-4 top-4 text-[15px] text-slate-400" />
              <input
                type="text"
                value={ProfileData.address}
                onChange={(e) => {
                  setProfileData({ ...ProfileData, address: e.target.value });
                }}
                className="w-full rounded-xl border border-slate-200 bg-white pr-11 pl-4 py-3 text-[13px] text-slate-700 outline-none placeholder:text-slate-300 focus:border-blue-500"
              />
            </div>
          </div>

          {/* About */}
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-slate-500">
              عن الشركة
            </label>
            <textarea
              rows={5}
              value={ProfileData.description}
              onChange={(e) => {
                setProfileData({ ...ProfileData, description: e.target.value });
              }}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] text-slate-700 outline-none placeholder:text-slate-300 focus:border-blue-500"
            />
            <p className="mt-1 text-[10px] text-slate-400">
              وصف مختصر عن شركتك ونشاطها
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              className="h-11 min-w-20 rounded-xl border border-slate-200 bg-white px-5 text-[13px] font-medium text-slate-600 hover:bg-slate-50"
            >
              إلغاء
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className={`h-11 flex-1 rounded-xl bg-blue-600 px-5 text-[13px] font-semibold text-white
               hover:bg-blue-700  ${loading ? "hover:cursor-not-allowed opacity-40" : "hover:cursor-pointer"}`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <LoaderTwo />
                </div>
              ) : (
                " حفظ التغييرات"
              )}
            </button>
          </div>
        </form>
      </div>
      <ProfileCompletionCard progress={progress} />
    </div>
  );
}
