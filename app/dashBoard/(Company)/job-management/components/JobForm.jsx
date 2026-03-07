"use client";

import { useState } from "react";
import { basicFields, detailsFields } from "../../companyData";

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  icon: Icon,
  type = "text",
  textarea = false,
  rows = 4,
}) {
  const baseClass =
    "w-full rounded-xl border border-slate-200 bg-white text-[14px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500";

  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        {Icon ? (
          <Icon
            className={`pointer-events-none absolute right-4 text-[16px] text-slate-400 ${
              textarea ? "top-4" : "top-1/2 -translate-y-1/2"
            }`}
          />
        ) : null}

        {textarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`${baseClass} px-4 py-3 ${Icon ? "pr-11" : ""}`}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${baseClass} h-12 px-4 ${Icon ? "pr-11" : ""}`}
          />
        )}
      </div>
    </div>
  );
}

export default function JobForm({ setPostJob }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "الرياض",
    workType: "كامل",
    experienceLevel: "أول",
    employmentType: "دوام كامل",
    salaryMin: "",
    salaryMax: "",
    description: "",
    requirements: "",
    responsibilities: "",
    skills: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-[70%] space-y-4 mb-20">
      <div className="rounded-[20px] border border-slate-200 bg-white p-4 sm:p-5">
        <h2 className="mb-4 text-[22px] font-extrabold text-slate-900">
          المعلومات الأساسية
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {basicFields.map((field) => (
            <div key={field.name} className={field.colSpan || ""}>
              <FormField
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                icon={field.icon}
                type={field.type}
                textarea={field.textarea}
                rows={field.rows}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[20px] border border-slate-200 bg-white p-4 sm:p-5">
        <h2 className="mb-4 text-[22px] font-extrabold text-slate-900">
          تفاصيل الوظيفة
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {detailsFields.map((field) => (
            <div
              key={field.name}
              className={
                field.textarea || field.name === "skills" ? "sm:col-span-2" : ""
              }
            >
              <FormField
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                icon={field.icon}
                type={field.type}
                textarea={field.textarea}
                rows={field.rows}
              />
            </div>
          ))}
        </div>

        <p className="mt-2 text-[12px] text-blue-500">
          يتم إنشاء ذلك تلقائيًا بالذكاء الاصطناعي
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[60%_20%_20%] gap-3 justify-between w-[97%] ">
        <button
          type="submit"
          className="h-11 w-full rounded-xl bg-blue-600 px-6 text-[14px] font-semibold text-white"
        >
          نشر الوظيفة
        </button>

        <button
          type="button"
          className="h-11  w-full rounded-xl border border-slate-200 bg-white px-5 text-[14px] text-slate-700"
        >
          حفظ كمسودة
        </button>
        <button
          type="button"
          onClick={() => {
            setPostJob(false);
          }}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-5 text-[14px] text-slate-700"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}
