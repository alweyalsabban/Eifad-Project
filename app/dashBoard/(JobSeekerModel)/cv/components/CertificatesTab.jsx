"use client";

import React, { useState } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function CertificatesTab() {
  const [form, setForm] = useState({
    certificate: "",
    place: "",
    verified: true,
  });

  const onAdd = () => {
    console.log("Add Certificate:", form);
  };

  return (
    <section
      dir="rtl"
      className="w-full rounded-2xl border border-secondGray bg-auxiliaryColorWhite p-6 mt-5"
    >
      <h3 className="text-right text-lg font-semibold text-slate-900">
        الدورات والشهادات
      </h3>

      <div className="mt-5 space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_110px] items-center">
          {/* الشهادة العلمية */}
          <input
            value={form.certificate}
            onChange={(e) => setForm({ ...form, certificate: e.target.value })}
            placeholder="الشهادة العلمية"
            className="h-12 w-full rounded-xl border border-secondGray bg-white px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* المكان التعليمي */}
          <input
            value={form.place}
            onChange={(e) => setForm({ ...form, place: e.target.value })}
            placeholder="المكان التعليمي"
            className="h-12 w-full rounded-xl border border-secondGray bg-white px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Badge (موثق) */}
          <div className="flex items-center justify-center gap-2 rounded-xl bg-green-100 px-3 py-2 text-sm text-green-700">
            <span>موثق</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white">
              <CheckIcon className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Add button */}
        <button
          type="button"
          onClick={onAdd}
          className="flex h-12 w-full items-center justify-center rounded-xl border border-dashed border-slate-300 text-slate-500 hover:bg-slate-50"
          aria-label="إضافة شهادة"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
