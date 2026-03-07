"use client";

import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function EducationTab() {
  const [form, setForm] = useState({
    degree: "",
    place: "",
    graduationYear: "",
  });

  const onAdd = () => {
    // هنا تربطه مع إضافة عنصر جديد/قائمة تعليم
    console.log("Add Education:", form);
  };

  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 mt-5">
      <h3 className="text-right text-lg font-semibold text-slate-900">
        التعليم
      </h3>

      <div className="mt-5 space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <input
            value={form.degree}
            onChange={(e) => setForm({ ...form, degree: e.target.value })}
            placeholder="الشهادة العلمية"
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            value={form.place}
            onChange={(e) => setForm({ ...form, place: e.target.value })}
            placeholder="المكان التعليمي"
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            value={form.graduationYear}
            onChange={(e) =>
              setForm({ ...form, graduationYear: e.target.value })
            }
            placeholder="سنة التخرج"
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
