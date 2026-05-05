"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Profile } from "../../callFunctionsForCompany";
import { FiMail, FiPhone, FiMapPin, FiBriefcase } from "react-icons/fi";

export default function EmployeeProfilePage() {
  const [Employee, setEmployee] = useState([]);

  const params = useParams();
  const employeeId = params?.employeeId;

  useEffect(() => {}, [employeeId]);
  return (
    <div dir="rtl" className="w-[98%] mx-auto mb-40">
      <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-8">
        <div className="flex items-start gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl text-white">
            👨‍💻
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">{name}</h1>
            <p className="mt-2 text-lg text-slate-600">{title}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <FiMail className="mb-2 text-blue-600" />
            <p className="text-xs text-slate-400">الإيميل</p>
            <p className="text-sm text-slate-700">{email}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <FiPhone className="mb-2 text-blue-600" />
            <p className="text-xs text-slate-400">الهاتف</p>
            <p className="text-sm text-slate-700">{phone}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <FiMapPin className="mb-2 text-blue-600" />
            <p className="text-xs text-slate-400">الموقع</p>
            <p className="text-sm text-slate-700">{location}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <FiBriefcase className="mb-2 text-blue-600" />
            <p className="text-xs text-slate-400">الخبرة</p>
            <p className="text-sm text-slate-700">{experience}</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 p-5">
          <h2 className="mb-3 text-xl font-bold text-slate-900">
            نبذة عن الموظف
          </h2>
          <p className="leading-8 text-slate-600">{summary}</p>
        </div>

        {skills.length > 0 && (
          <div className="mt-8 rounded-2xl border border-slate-200 p-5">
            <h2 className="mb-3 text-xl font-bold text-slate-900">المهارات</h2>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-xl bg-blue-50 px-4 py-2 text-blue-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
