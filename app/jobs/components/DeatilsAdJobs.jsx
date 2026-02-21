"use client";
import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsBriefcase, BsCurrencyDollar } from "react-icons/bs";

export default function JobDetailsCard({ jobAds }) {
  const tabs = [
    { key: "company", label: "الشركة" },
    { key: "benefits", label: "المزايا" },
    { key: "requirements", label: "المتطلبات" },
    { key: "desc", label: "الوصف" },
  ];
  const [activeTab, setActiveTab] = useState("requirements");

  return (
    <div
      dir="rtl"
      className="w-full bg-white border border-slate-200 rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">{jobAds.title}</h1>

          <div className="flex items-center gap-2 text-slate-600">
            <span className="text-sm inline-flex items-center gap-2">
              <BsBriefcase className="text-slate-500" />
              {jobAds.company}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-700">
            <span className="inline-flex items-center gap-2">
              <IoLocationOutline className="text-sky-600" />
              {jobAds.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <BsBriefcase className="text-sky-600" />
              {jobAds.type}
            </span>
            <span className="inline-flex items-center gap-2">
              <BsCurrencyDollar className="text-sky-600" />
              {jobAds.salary.min.toLocaleString()} -{" "}
              {jobAds.salary.max.toLocaleString()} {jobAds.salary.currency}
            </span>
            <span className="inline-flex items-center gap-2">
              <FaRegCalendarAlt className="text-sky-600" />
              {jobAds.data}
            </span>
          </div>
        </div>

        {/* Actions */}

        <button className="px-5 py-2 rounded-xl text-white font-semibold bg-linear-to-r from-sky-600 to-violet-500 hover:opacity-95 transition hover:cursor-pointer">
          قدم الآن
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-6 bg-slate-100 rounded-full p-1 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={[
              "flex-1 py-2 rounded-full text-sm font-semibold transition",
              activeTab === t.key
                ? "bg-white shadow-sm text-slate-900"
                : "text-slate-600 hover:text-slate-900",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-5">
        {activeTab === "requirements" && (
          <div className="space-y-3">
            {jobAds.requirements.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1 w-5 h-5 rounded-full border-2 border-sky-600 flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                </span>
                <p className="leading-7">{item}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "desc" && (
          <p className="text-slate-700 leading-8">{jobAds.description}</p>
        )}

        {activeTab === "benefits" && (
          <div className="flex flex-wrap gap-2">
            {jobAds.benefits.map((b) => (
              <span
                key={b}
                className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100 text-sm font-semibold"
              >
                {b}
              </span>
            ))}
          </div>
        )}

        {activeTab === "company" && (
          <p className="text-slate-700 leading-8">{jobAds.companyInfo}</p>
        )}
      </div>
    </div>
  );
}
