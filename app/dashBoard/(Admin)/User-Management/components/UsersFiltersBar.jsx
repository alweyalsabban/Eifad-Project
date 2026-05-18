"use client";

import { FiChevronDown, FiSearch } from "react-icons/fi";

export default function UsersFiltersBar({
  search,
  role = "",
  status = "",
  onSearchChange,
  onRoleChange,
  onStatusChange,
  verificationStatus = "",
  onVerificationStatusChange,
}) {
  return (
    <div
      className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:flex-row md:items-end"
      dir="rtl"
    >
      {/* ── بحث ── */}
      <div className="flex flex-col gap-1.5 w-full md:flex-1">
        <label className="text-xs font-semibold text-gray-500 px-1">
          البحث
        </label>
        <div className="relative">
          <FiSearch className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
          <input
            type="text"
            value={search ?? ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="ابحث عن مستخدم..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-[#f7f7f8] pr-10 pl-4 text-right text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:bg-white"
          />
        </div>
      </div>

      {/* ── الدور ── */}
      <div className="flex flex-col gap-1.5 w-full md:w-48">
        <label className="text-xs font-semibold text-gray-500 px-1">
          الدور
        </label>
        <div className="relative">
          <select
            value={role}
            onChange={(e) => onRoleChange?.(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-[#f7f7f8] px-4 text-right text-sm outline-none transition focus:border-blue-400 focus:bg-white"
          >
            <option value="">جميع الأدوار</option>
            <option value="JobSeeker">باحث عن عمل</option>
            <option value="Employer">صاحب عمل</option>
          </select>
          <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* ── الحالة ── */}
      <div className="flex flex-col gap-1.5 w-full md:w-44">
        <label className="text-xs font-semibold text-gray-500 px-1">
          الحالة الحساب
        </label>
        <div className="relative">
          <select
            value={status}
            onChange={(e) => onStatusChange?.(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-[#f7f7f8] px-4 text-right text-sm outline-none transition focus:border-blue-400 focus:bg-white"
          >
            <option value="">الكل</option>
            <option value="active">نشط</option>
            <option value="blocked">محضور</option>
            <option value="inactive">غير نشط</option>
          </select>
          <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* ── هل حساب الشركة موثوق أولا  ── */}
      <div className="flex flex-col gap-1.5 w-full md:w-48">
        <label className="text-xs font-semibold text-gray-500 px-1">
          حال حساب المستخدم
        </label>
        <div className="relative">
          <select
            value={verificationStatus}
            onChange={(e) => onVerificationStatusChange?.(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-[#f7f7f8] px-4 text-right text-sm outline-none transition focus:border-blue-400 focus:bg-white"
          >
            <option value="">الكل</option>
            <option value="trusted"> موثوق</option>
            <option value="nottrusted">غير موثوق</option>
            <option value="pending">قيد الانتظار</option>
          </select>
          <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* ── هل ساب الباحث موثوق أولا  ── */}
      {/*    <div className="flex flex-col gap-1.5 w-full md:w-48">
        <label className="text-xs font-semibold text-gray-500 px-1">
          حالة حساب الباحث
        </label>

        <div className="relative">
          <select
            value={userStatus}
            onChange={(e) => onUserStatusChange?.(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-[#f7f7f8] px-4 text-right text-sm outline-none transition focus:border-blue-400 focus:bg-white"
          >
            <option value="">الكل</option>
            <option value="trusted">موثوق</option>
            <option value="nottrusted">غير موثوق</option>
          </select>
          <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div> */}
    </div>
  );
}
