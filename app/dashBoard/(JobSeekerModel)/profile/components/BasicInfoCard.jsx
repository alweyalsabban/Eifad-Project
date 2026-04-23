"use client";

import { FiCheckCircle } from "react-icons/fi";
import { Field } from "./Field";
import { useEffect, useState } from "react";
import Image from "next/image";
import { HiMiniArrowUpTray } from "react-icons/hi2";
import { FiMapPin } from "react-icons/fi";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { Profile } from "../../callFunctionsForJobseeker";
import Bio from "./Bio";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { PersentProfileContext } from "../../context/PersentProfileContext";
import SetCookies from "../../../../lib/setNameCooies";
import { uploadImage } from "../../../../lib/UploadImage";
import LoaderTwo from "../../components/LoaderTwo";

export default function BasicInfoCard({ dataProfile, anathorData }) {
  const { numberOfPersent, setnumberOfPersent } = useContext(
    PersentProfileContext,
  );
  const [formData, setFormData] = useState({
    fullName: anathorData.full_name || "",
    location: dataProfile.Location || "",
    email: anathorData.email || "",
    phone: anathorData.phone || "",
    bio: dataProfile.ProfileSummary || "",
  });

  const router = useRouter();
  const [backUpData, setbackUpData] = useState(formData);
  const [image, setImage] = useState(dataProfile?.PersonalPhoto ?? null);
  const [loadingImage, setLoadingImage] = useState(false);

  const [number] = useState([0, 0, 0, 0, 0]);
  const [isLoading, setLoading] = useState(false);
  const handleImageUpload = async (e) => {
    setLoadingImage(true);
    const file = e.target.files?.[0];
    const url = await uploadImage(file);
    setImage(url);
    setLoadingImage(false);
    if (!file) return;

    const okType = ["image/jpeg", "image/png"].includes(file.type);
    const okSize = file.size <= 2 * 1024 * 1024;
    if (!okType || !okSize) {
      // add pop
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await Profile("EditProfile", { personalPhoto: String(reader.result) });
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = async () => {
    setLoading(true);
    await Profile("EditProfile", {
      name: formData.fullName,
      phone: formData.phone,
      location: formData.location,
      profile_summary: formData.bio,
      personal_photo: image,
    });
    SetCookies(formData.fullName);
    calPersent();
    setbackUpData(formData);
    //router.replace("/dashBoard");
    setLoading(false);
  };

  function calPersent() {
    Object.entries(formData).forEach(([, value], index) => {
      if (value !== "") number[index] = 20;
    });
    const sum = number.reduce((a, b) => a + b, 0);
    setnumberOfPersent(sum);
  }

  useEffect(() => {
    calPersent();
  }, []);

  return (
    <>
      <section
        dir="rtl"
        className="w-full  rounded-2xl border border-slate-200 bg-white p-6"
      >
        <h2 className="text-xl font-bold text-secondColorBlack">
          المعلومات الأساسية
        </h2>

        <div className="mt-4 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-18 w-18 overflow-hidden rounded-full border border-slate-300 bg-secondGray">
              {loadingImage && (
                <div className="flex items-center justify-center mt-5">
                  <LoaderTwo colorLoading="fill-gray-400" />
                </div>
              )}
              {image && (
                <Image
                  src={image}
                  width={74}
                  height={74}
                  alt="صورة الملف الشخصي"
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="flex flex-col items-start">
              <label
                htmlFor="profile-image-upload"
                className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 hover:bg-slate-50"
              >
                <HiMiniArrowUpTray className="h-4 w-4" />
                تحميل صورة
              </label>

              <input
                id="profile-image-upload"
                type="file"
                accept="image/jpeg,image/png"
                className="sr-only"
                onChange={handleImageUpload}
              />

              <p className="mt-2 text-xs text-slate-500">JPG, PNG حتى 2MB</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-[10px] bg-green-100 px-3 py-1 text-sm text-green-700">
              <FiCheckCircle className="h-4 w-4 text-green-700" />
              {anathorData.is_verified ? "موثوق" : "لم يتحقق"}
            </span>
            <span className="inline-flex items-center gap-2 rounded-[10px] bg-green-100 px-3 py-1 text-sm text-green-700">
              {anathorData.is_verified ? "وضع الباحث" : "مطلع"}
            </span>
          </div>
        </div>

        <form className="mt-5 space-y-4">
          <Field
            label="الاسم كامل"
            placeholder={"أدخل اسمك الكامل"}
            value={formData.fullName}
            onChange={(v) => setFormData({ ...formData, fullName: v })}
            inputProps={{ id: "first-name", type: "name" }}
          />

          <Field
            label="الموقع"
            placeholder={"أكتب موقعك الحالي"}
            value={formData.location}
            onChange={(v) => setFormData({ ...formData, location: v })}
            icon={<FiMapPin className="h-5 w-5" />}
            inputProps={{ id: "location" }}
          />

          <Field
            label="البريد الإلكتروني"
            placeholder="أدخل البريد الإلكتروني"
            isRead={true}
            value={formData.email}
            icon={<FaRegEnvelope className="h-5 w-5" />}
            inputProps={{ id: "email", type: "email" }}
          />

          <Field
            label="رقم الهاتف"
            placeholder="أدخل رقم الهاتف"
            value={formData.phone}
            onChange={(v) => setFormData({ ...formData, phone: v })}
            icon={<FaPhoneAlt className="h-5 w-5" />}
            inputProps={{ id: "phone", type: "tel" }}
          />
        </form>
      </section>
      <Bio formData={formData} setFormData={setFormData} />
      <div className="flex items-center gap-3 mt-6 mb-15">
        <button
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit}
          className={`flex-1 h-12 rounded-xl bg-primaryBlue text-white font-medium
             hover:bg-blue-800 hover:cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed pointer-events-none" : "opacity-100"}`}
        >
          {isLoading ? "......" : "  حفظ التغييرات"}
        </button>
        <button
          onClick={() => {
            setFormData(backUpData);
          }}
          className="px-6 h-12 rounded-xl border border-secondGray text-secondColorBlack hover:bg-secondGray hover:cursor-pointer"
        >
          إلغاء
        </button>
      </div>
    </>
  );
}
