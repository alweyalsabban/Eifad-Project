"use client";

import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ExperienceTab() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    startYear: "",
    endYear: "",
    description: "",
  });

  const onAdd = () => {
    console.log("Add Experience:", form);
  };

  return (
    <section className="w-full rounded-2xl border border-secondGray bg-auxiliaryColorWhite p-6 mt-5">
      <h3 className="text-right text-lg font-semibold text-slate-900">
        الخبرات
      </h3>

      <div className="mt-5 space-y-4">
        <div className="rounded-2xl border border-secondGray  p-4">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="المسمى الوظيفي"
            className="h-12 w-full rounded-xl border border-secondGray  px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[160px_100px_1fr]">
            <input
              value={form.startYear}
              onChange={(e) => setForm({ ...form, startYear: e.target.value })}
              placeholder="من"
              className="h-12 w-full rounded-xl border border-secondGray  px-4 text-center outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={form.endYear}
              onChange={(e) => setForm({ ...form, endYear: e.target.value })}
              placeholder="إلى"
              className="h-12 w-full rounded-xl border border-secondGray  px-4 text-center outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="الشركة"
              className="h-12 w-full rounded-xl border border-secondGray px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="الوصف"
            className="mt-3 h-32 w-full resize-none rounded-2xl border border-secondGray p-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
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
