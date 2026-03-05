"use client";

import React, { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

export default function LanguagesTab() {
  const [rows, setRows] = useState([
    { id: 1, language: "English", level: "expert" },
    { id: 2, language: "Arabic", level: "expert" },
  ]);

  const updateRow = (id, key, value) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)),
    );
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { id: Date.now(), language: "", level: "expert" },
    ]);
  };

  const removeRow = (id) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <section className="w-full rounded-2xl border border-secondGray bg-auxiliaryColorWhite p-6 mt-5">
      <h3 className="text-right text-lg font-semibold text-slate-900">
        اللغات
      </h3>

      <div className="mt-5 space-y-4">
        <div className="rounded-2xl border border-secondGray p-4">
          <div className="space-y-4">
            {rows.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-[1fr_140px_28px] items-center gap-3"
              >
                {/* Input اللغة */}
                <input
                  value={row.language}
                  onChange={(e) =>
                    updateRow(row.id, "language", e.target.value)
                  }
                  placeholder="أضف لغة"
                  className="h-12 w-full rounded-xl border border-secondGray bg-white px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Dropdown المستوى */}
                <select
                  value={row.level}
                  onChange={(e) => updateRow(row.id, "level", e.target.value)}
                  className="h-12 w-full rounded-xl border border-secondGray bg-white px-3 text-center outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {LEVELS.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>

                {/* حذف */}
                <button
                  type="button"
                  onClick={() => removeRow(row.id)}
                  className="flex h-8 w-8 items-center justify-center text-red-500 hover:text-red-600"
                  aria-label="حذف"
                  title="حذف"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* زر الإضافة */}
        <button
          type="button"
          onClick={addRow}
          className="flex h-12 w-full items-center justify-center rounded-xl border border-dashed border-slate-300 text-slate-500 hover:bg-slate-50"
          aria-label="إضافة لغة"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
