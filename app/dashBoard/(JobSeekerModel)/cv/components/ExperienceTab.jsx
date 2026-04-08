"use client";

import React from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function ExperienceTab({ objectexperience, setexperience }) {
  const handleChange = (index, field, value) => {
    const updatedEducation = [...objectexperience];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    setexperience(updatedEducation);
  };

  const formatMonthValue = (date) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 7);
  };

  const onAdd = () => {
    setexperience([
      ...objectexperience,
      {
        JobTitle: "",
        CompanyName: "",
        StartDate: "",
        EndDate: "",
        Responsibilities: "",
      },
    ]);
  };

  const removeRow = (index) => {
    const updated = objectexperience.filter((_, i) => i !== index);
    setexperience(updated);
  };

  return (
    <section className="w-full rounded-2xl border border-secondGray bg-auxiliaryColorWhite p-6 mt-5">
      <h3 className="text-right text-lg font-semibold text-slate-900">
        الخبرات
      </h3>

      <div className="mt-5 space-y-4">
        {objectexperience.map((item, index) => {
          return (
            <div
              className="rounded-2xl border border-secondGray  p-4"
              key={index}
            >
              <div className="mb-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  className="flex h-8 w-8 items-center justify-center text-red-500 hover:text-red-600"
                  aria-label="حذف"
                  title="حذف"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
              <input
                value={item.JobTitle}
                onChange={(e) =>
                  handleChange(index, "JobTitle", e.target.value)
                }
                placeholder="المسمى الوظيفي"
                className="h-12 w-full rounded-xl border border-secondGray  px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[160px_100px_1fr]">
                <input
                  value={formatMonthValue(item.StartDate)}
                  onChange={(e) =>
                    handleChange(index, "StartDate", e.target.value)
                  }
                  placeholder="من"
                  className="h-12 w-full rounded-xl border border-secondGray  px-4 text-center outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  value={formatMonthValue(item.EndDate)}
                  onChange={(e) =>
                    handleChange(index, "EndDate", e.target.value)
                  }
                  placeholder="إلى"
                  className="h-12 w-full rounded-xl border border-secondGray  px-4 text-center outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  value={item.CompanyName}
                  onChange={(e) =>
                    handleChange(index, "CompanyName", e.target.value)
                  }
                  placeholder="الشركة"
                  className="h-12 w-full rounded-xl border border-secondGray px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <textarea
                value={item.Responsibilities}
                onChange={(e) =>
                  handleChange(index, "Responsibilities", e.target.value)
                }
                placeholder="المسؤوليات و تفاصيل أخرى"
                className="mt-3 h-32 w-full resize-none rounded-2xl border border-secondGray p-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          );
        })}

        <button
          type="button"
          onClick={onAdd}
          className="flex h-12 w-full items-center justify-center rounded-xl border border-dashed border-slate-300 text-slate-500 hover:bg-slate-50"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
