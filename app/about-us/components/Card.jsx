import React from "react";

export default function Card({ whoWe }) {
  return (
    <div
      dir="rtl"
      className="w-full max-w-sm rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
    >
      <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-violet-500">
        {whoWe.icon}
      </div>

      <div className="mt-5 space-y-2">
        <h3 className="text-lg font-extrabold text-slate-900">{whoWe.title}</h3>
        <p className="text-sm leading-7 text-slate-600">{whoWe.decrption}</p>
      </div>
    </div>
  );
}
