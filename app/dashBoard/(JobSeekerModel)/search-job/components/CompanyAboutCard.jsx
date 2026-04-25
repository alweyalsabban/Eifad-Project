"use client";

import React from "react";
import { MapPinIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { FiMail, FiPhone } from "react-icons/fi";
import Image from "next/image";

export default function CompanyAboutCard({
  title,
  companyName,
  category,
  description,
  employees,
  city,
  email,
  phone,
  UrlImage,
}) {
  console.log(UrlImage);
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 mt-5">
      {/* Top row */}
      <div className="grid grid-cols-1 sm:grid-cols-[30%_auto]">
        <div>
          <h3 className="text-md font-semibold text-slate-900">{title}</h3>

          <div className="mt-2 flex gap-3 items-center">
            {/* Logo */}
            {UrlImage?.length > 40 ? (
              <div className=" h-12 w-12 rounded-xl border p-1 border-gray-500">
                <Image
                  src={UrlImage}
                  width={300}
                  height={200}
                  alt="LogoImage"
                />
              </div>
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                G
              </div>
            )}

            <div className="text-right">
              <div className="text-sm font-semibold text-slate-900">
                {companyName}
              </div>
              <div className="text-xs text-slate-500">{category}</div>
            </div>
          </div>
        </div>

        {/* Middle: description */}
        <p className=" text-sm leading-6 text-slate-600 mt-7">{description}</p>
      </div>

      {/* Bottom meta */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-4 items-center  gap-6 text-sm text-slate-500">
        <span className="inline-flex items-center gap-2">
          <BuildingOffice2Icon className="h-4 w-4" />
          {employees} موظف
        </span>

        <span className="inline-flex items-center gap-2">
          <MapPinIcon className="h-4 w-4" />
          {city}
        </span>
        {/* email */}
        <div className="flex items-center gap-2">
          <FiMail className="text-gray-400" size={18} />
          <span>{email}</span>
        </div>

        {/* phone */}
        <div className="flex items-center gap-2">
          <FiPhone className="text-gray-400" size={18} />
          <span>{phone}</span>
        </div>
      </div>
    </section>
  );
}
