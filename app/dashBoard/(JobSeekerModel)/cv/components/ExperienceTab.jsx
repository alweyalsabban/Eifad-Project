"use client";

import React from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function ExperienceTab({
  objectexperience,
  setexperience,
  DeletedExperienceField,
  setDeletedExperienceField,
}) {
  const handleChange = (index, field, value) => {
    const updatedExperience = [...objectexperience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    setexperience(updatedExperience);
  };

  const handleCurrentWorkChange = (index, checked) => {
    const updatedExperience = [...objectexperience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      IsCurrent: checked,
      EndDate: checked ? "حالياً" : "",
    };
    setexperience(updatedExperience);
  };

  const formatMonthValue = (date) => {
    if (!date || date === "حالياً") return "";
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
        IsCurrent: false,
      },
    ]);
  };

  const removeRow = (index) => {
    const Deleted = objectexperience.filter((_, i) => i === index);
    setDeletedExperienceField((prev) => [...prev, ...Deleted]);

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
              className="rounded-2xl border border-secondGray p-4"
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
                className="h-12 w-full rounded-xl border border-secondGray px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[20%_20%_auto]">
                <input
                  type="month"
                  value={formatMonthValue(item.StartDate)}
                  onChange={(e) =>
                    handleChange(index, "StartDate", e.target.value)
                  }
                  placeholder="من"
                  className="h-12 w-full rounded-xl border border-secondGray px-4 text-center outline-none focus:ring-2 focus:ring-blue-500"
                />

                {item.IsCurrent ? (
                  <input
                    value="حالياً"
                    disabled
                    className="h-12 w-full rounded-xl border border-secondGray bg-slate-100 px-4 text-center text-slate-500 outline-none"
                  />
                ) : (
                  <input
                    type="month"
                    value={formatMonthValue(item.EndDate)}
                    onChange={(e) =>
                      handleChange(index, "EndDate", e.target.value)
                    }
                    placeholder="إلى"
                    className="h-12 w-full rounded-xl border border-secondGray px-4 text-center outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}

                <input
                  value={item.CompanyName}
                  onChange={(e) =>
                    handleChange(index, "CompanyName", e.target.value)
                  }
                  placeholder="الشركة"
                  className="h-12 w-full rounded-xl border border-secondGray px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <label className="mt-3 flex items-center justify-end gap-2 text-sm text-slate-700">
                <span>أعمل حالياً فيه</span>
                <input
                  type="checkbox"
                  checked={item.IsCurrent || false}
                  onChange={(e) =>
                    handleCurrentWorkChange(index, e.target.checked)
                  }
                  className="h-4 w-4"
                />
              </label>

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
