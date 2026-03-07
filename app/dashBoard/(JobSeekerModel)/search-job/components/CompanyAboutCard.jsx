"use client";

import React from "react";
import { MapPinIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { FiMail, FiPhone } from "react-icons/fi";

export default function CompanyAboutCard({
  title = "عن الشركة",
  companyName = "Google",
  category = "التقنية",
  description = "جوجل هي شركة تقنية رائدة عالمياً تركز على الابتكار وتطوير الحلول التي تخدم المستخدمين حول العالم.",
  employees = "500-1000 موظف",
  city = "الرياض",
  email = "alwimoo@gmail.com",
  phone = "774114540",
}) {
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 mt-5">
      {/* Top row */}
      <div className="flex items-start justify-between gap-6">
        {/* Right: title + company block */}
        <div className="flex items-start gap-4">
          {/* Company small text + name */}
          <div className="text-right">
            <h3 className="text-sm font-semibold text-slate-900">{title}</h3>

            <div className="mt-2 flex items-center gap-3 justify-end">
              {/* Logo */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white text-lg font-bold">
                G
              </div>

              <div className="text-right">
                <div className="text-sm font-semibold text-slate-900">
                  {companyName}
                </div>
                <div className="text-xs text-slate-500">{category}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: description */}
        <p className="flex-1 text-right text-sm leading-6 text-slate-600 mt-7">
          {description}
        </p>
      </div>

      {/* Bottom meta */}
      <div className="mt-5 flex items-center  gap-6 text-sm text-slate-500">
        <span className="inline-flex items-center gap-2">
          <BuildingOffice2Icon className="h-4 w-4" />
          {employees}
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
