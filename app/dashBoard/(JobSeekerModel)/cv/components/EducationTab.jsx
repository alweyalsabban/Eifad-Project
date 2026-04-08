"use client";

import React from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function EducationTab({ objectEducation, setObjectEducation }) {
  const onAdd = () => {
    setObjectEducation([
      ...objectEducation,
      {
        DegreeName: "",
        Institution: "",
        Major: "",
        GraduationYear: "",
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updatedEducation = [...objectEducation];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    setObjectEducation(updatedEducation);
  };

  const removeRow = (index) => {
    const updated = objectEducation.filter((_, i) => i !== index);
    setObjectEducation(updated);
  };

  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 mt-5">
      <h3 className="text-right text-lg font-semibold text-slate-900">
        التعليم
      </h3>

      <div className="mt-5 space-y-4">
        {objectEducation.map((item, index) => {
          return (
            <div
              className="grid grid-cols-1 gap-3 sm:grid-cols-[30%_30%_15%_15%_5%]"
              key={index}
            >
              <input
                value={item.DegreeName || ""}
                onChange={(e) =>
                  handleChange(index, "DegreeName", e.target.value)
                }
                placeholder="الشهادة العلمية"
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                value={item.Institution || ""}
                onChange={(e) =>
                  handleChange(index, "Institution", e.target.value)
                }
                placeholder="المكان التعليمي"
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                value={item.Major || ""}
                onChange={(e) => handleChange(index, "Major", e.target.value)}
                placeholder="التخصص"
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                value={item.GraduationYear || ""}
                onChange={(e) =>
                  handleChange(index, "GraduationYear", e.target.value)
                }
                placeholder="سنة التخرج"
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
              />
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
