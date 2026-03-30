"use client";

import { FiCheckCircle } from "react-icons/fi";
import { Badge } from "../profileData";
import { Field } from "./Field";
import { useState } from "react";
import Image from "next/image";
import { HiMiniArrowUpTray } from "react-icons/hi2";
import { FiMapPin } from "react-icons/fi";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

/* import {
  ArrowUpTrayIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/"; */

export default function BasicInfoCard() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    email: "",
    phone: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const okType = ["image/jpeg", "image/png"].includes(file.type);
    const okSize = file.size <= 2 * 1024 * 1024;
    if (!okType || !okSize) {
      // add pop
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
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
            {profileImage && (
              <Image
                src={profileImage}
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
          {Badge.map((b) => (
            <span
              key={b.id}
              className="inline-flex items-center gap-2 rounded-[10px] bg-green-100 px-3 py-1 text-sm text-green-700"
            >
              {b.icon ? (
                <FiCheckCircle className="h-4 w-4 text-green-700" />
              ) : null}
              {b.label}
            </span>
          ))}
        </div>
      </div>

      <form className="mt-5 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="الاسم الأول"
            value={formData.firstName}
            onChange={(v) => setFormData({ ...formData, firstName: v })}
            inputProps={{ id: "first-name", type: "name" }}
          />
          <Field
            label="اسم العائلة"
            value={formData.lastName}
            onChange={(v) => setFormData({ ...formData, lastName: v })}
            inputProps={{ id: "last-name", type: "name" }}
          />
        </div>

        <Field
          label="الموقع"
          value={formData.location}
          onChange={(v) => setFormData({ ...formData, location: v })}
          icon={<FiMapPin className="h-5 w-5" />}
          inputProps={{ id: "location" }}
        />

        <Field
          label="البريد الإلكتروني"
          value={formData.email}
          onChange={(v) => setFormData({ ...formData, email: v })}
          icon={<FaRegEnvelope className="h-5 w-5" />}
          inputProps={{ id: "email", type: "email" }}
        />

        <Field
          label="رقم الهاتف"
          value={formData.phone}
          onChange={(v) => setFormData({ ...formData, phone: v })}
          icon={<FaPhoneAlt className="h-5 w-5" />}
          inputProps={{ id: "phone", type: "tel" }}
        />
      </form>
    </section>
  );
}
