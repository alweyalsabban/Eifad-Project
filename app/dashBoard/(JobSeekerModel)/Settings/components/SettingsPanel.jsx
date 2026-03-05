// components/SettingsPanel.jsx
"use client";

import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SettingsPanel({
  title,
  icon,
  iconBg = "bg-yellow-100",
  // للـ checkbox list
  items = [], // [{ key:'jobs', label:'توصيات الوظائف' }, ...]
  values = {}, // { jobs:true, updates:false, messages:false }
  onToggle, // (key, nextValue) => void

  // للـ select
  selectLabel,
  selectValue,
  selectOptions = [], // [{ value:'ar', label:'العربية' }, ...]
  onSelectChange, // (value) => void

  // أزرار
  primaryText = "حفظ التغييرات",
  onPrimary,
  secondaryText = "إلغاء",
  onSecondary,
  disabled = false,
}) {
  return (
    <div className="w-[98%] m-auto mt-5 space-y-6">
      {/* Card */}
      <div className="w-full rounded-2xl border border-gray-200 bg-white p-6">
        {/* header */}
        <div className="mb-6 flex  gap-2 items-center ">
          <div
            className={cn(
              "grid h-11 w-11 place-items-center rounded-xl",
              iconBg,
            )}
          >
            {icon}
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>

        {/* checkboxes */}
        <div className="space-y-7">
          {items.map((it) => {
            const checked = !!values[it.key];

            return (
              <div key={it.key} className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-800">
                  {it.label}
                </span>

                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  onChange={(e) => onToggle?.(it.key, e.target.checked)}
                  className="h-5 w-5 accent-blue-600"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Select Card */}
      <div className="w-full rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-6 flex gap-2 items-center ">
          {/* مكان الأيقونة (اختياري) - لو ما تبغى احذف هذا البلوك */}
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-purple-100">
            {/* ضع أيقونة إن رغبت */}
            <span className="text-purple-700 text-lg">🌐</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{selectLabel}</h2>
        </div>

        <select
          value={selectValue}
          disabled={disabled}
          onChange={(e) => onSelectChange?.(e.target.value)}
          className="h-14 w-full rounded-2xl border border-blue-500 bg-white px-4 text-lg outline-none
                     focus:ring-4 focus:ring-blue-100"
        >
          {selectOptions.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          disabled={disabled}
          onClick={onPrimary}
          className="h-14 flex-1 rounded-2xl bg-blue-600 text-lg font-semibold text-white
                     hover:bg-blue-700 transition disabled:opacity-60"
        >
          {primaryText}
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={onSecondary}
          className="h-14 w-40 rounded-2xl border border-gray-200 bg-white text-lg font-semibold
                     text-gray-800 hover:bg-gray-50 transition disabled:opacity-60"
        >
          {secondaryText}
        </button>
      </div>
    </div>
  );
}
