"use client";

import { type ReactNode } from "react";
import { FiEdit2, FiEye } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { FaBan } from "react-icons/fa6";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  verificationStatus: "موثق" | "قيد الانتظار" | "مرفوض";
  accountStatus: "نشط" | "محظور";
  createdAt: string;
  skills?: string[];
  applicationsCount?: number;
};

type UserTableRowProps = {
  user: User;
  onView?: (user: User) => void;
  onEdit?: (user: User) => void;
  onBlock?: (user: User) => void;
  onDelete?: (user: User) => void;
};

function verificationBadge(status: User["verificationStatus"]) {
  switch (status) {
    case "موثق":
      return "bg-green-100 text-green-700";
    case "قيد الانتظار":
      return "bg-yellow-100 text-yellow-700";
    case "مرفوض":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function accountBadge(status: User["accountStatus"]) {
  switch (status) {
    case "نشط":
      return "bg-blue-100 text-blue-700";
    case "محظور":
      return "bg-gray-200 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function ActionButton({
  onClick,
  children,
  className = "",
  label,
}: {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`rounded-md p-1.5 transition duration-200 hover:bg-gray-100 ${className}`}
    >
      {children}
    </button>
  );
}

export default function UserTableRow({
  user,
  onView,
  onEdit,
  onBlock,
  onDelete,
}: UserTableRowProps) {
  return (
    <tr className="border-t border-gray-200 text-right transition hover:bg-gray-50/60">
      <td className="px-4 py-5 font-medium whitespace-nowrap text-gray-900">
        {user.name}
      </td>

      <td className="px-4 py-5 whitespace-nowrap text-gray-900">
        {user.email}
      </td>

      <td className="px-4 py-5 whitespace-nowrap text-gray-900">{user.role}</td>

      <td className="px-4 py-5">
        <span
          className={`inline-flex min-w-[96px] items-center justify-center rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap ${verificationBadge(
            user.verificationStatus,
          )}`}
        >
          {user.verificationStatus}
        </span>
      </td>

      <td className="px-4 py-5">
        <span
          className={`inline-flex min-w-[80px] items-center justify-center rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap ${accountBadge(
            user.accountStatus,
          )}`}
        >
          {user.accountStatus}
        </span>
      </td>

      <td className="px-4 py-5 whitespace-nowrap text-gray-900">
        {user.createdAt}
      </td>

      <td className="px-4 py-5">
        <div className="flex items-center justify-start gap-2">
          <ActionButton
            label="عرض الملف الشخصي"
            onClick={() => onView?.(user)}
            className="text-gray-700 hover:text-black"
          >
            <FiEye size={18} />
          </ActionButton>

          <ActionButton
            label="تعديل المستخدم"
            onClick={() => onEdit?.(user)}
            className="text-gray-700 hover:text-black"
          >
            <FiEdit2 size={18} />
          </ActionButton>

          <ActionButton
            label="حظر المستخدم"
            onClick={() => onBlock?.(user)}
            className="text-orange-500 hover:text-orange-600"
          >
            <FaBan size={18} />
          </ActionButton>

          <ActionButton
            label="حذف المستخدم"
            onClick={() => onDelete?.(user)}
            className="text-red-500 hover:text-red-600"
          >
            <HiOutlineTrash size={18} />
          </ActionButton>
        </div>
      </td>
    </tr>
  );
}
