// components/SettingsCard.jsx
import React from "react";

export default function SettingsCard({
  title,
  icon,
  iconBg = "bg-blue-100",
  label,
}) {
  return (
    <div className="w-[98%] m-auto rounded-2xl border border-gray-200 p-6 bg-white mt-5">
      {/* header */}
      <div className="flex items-center gap-2 mb-6">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}
        >
          {icon}
        </div>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>

      {/* content */}
      <div>
        <label className="text-sm text-gray-500 mb-2 block">{label}</label>
        <input
          type="email"
          className="w-full rounded-xl border border-gray-200 p-3 outline-none"
        />
      </div>
    </div>
  );
}
