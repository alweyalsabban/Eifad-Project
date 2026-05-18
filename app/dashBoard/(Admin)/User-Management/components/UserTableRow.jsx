"use client";

import { FiEdit2, FiEye } from "react-icons/fi";
import { FaBan } from "react-icons/fa6";
import { IoMdReturnRight } from "react-icons/io";
import { UseManagmentAPI } from "../../CallApiForAdmin";
import { toast } from "react-toastify";
import { useState } from "react";

function verificationBadge(status) {
  switch (status) {
    case true:
      return "bg-green-100 text-green-700";
    case false:
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function accountBadge(status) {
  switch (status) {
    case 0:
      return "bg-blue-100 text-blue-700";
    case 1:
      return "bg-gray-200 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function ActionButton({ onClick, children, className = "", label }) {
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
  onBlock,
  setOpenUsrDeail,
  setUsrDeatail,
}) {
  const [isblock, setBlock] = useState(user?.IsBlocked);
  async function onBlock() {
    if (isblock === 0) {
      const res = await UseManagmentAPI("BlocUser", { IdUser: user?.UserID });
      setBlock(1);
      toast.success(res?.dataResponse?.message);
    } else {
      const res = await UseManagmentAPI("UnBlocUser", { IdUser: user?.UserID });
      setBlock(0);
      toast.success(res?.dataResponse?.message);
    }
  }
  function onEdit() {
    setUsrDeatail(user);
    setOpenUsrDeail(true);
  }

  return (
    <>
      <tr className="border-t border-gray-200 text-right transition hover:bg-gray-50/60">
        <td className="px-4 py-5 font-medium whitespace-nowrap text-gray-900">
          {user?.FullName}
        </td>

        <td className="px-4 py-5 whitespace-nowrap text-gray-900">
          {user?.Email}
        </td>

        <td className="px-4 py-5 whitespace-nowrap text-gray-900">
          {user?.roles[0]?.RoleName}
        </td>

        <td className="px-4 py-5">
          <span
            className={`inline-flex min-w-24 items-center justify-center rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap ${verificationBadge(
              user.IsVerified,
            )}`}
          >
            {user.IsVerified ? "موثوق" : "غير موثوق"}
          </span>
        </td>

        <td className="px-4 py-5">
          <span
            className={`inline-flex min-w-20 items-center justify-center rounded-full px-3 py-1 
            text-sm font-medium whitespace-nowrap ${accountBadge(isblock)}`}
          >
            {isblock === 0 ? "مفعل" : "غير مفعل"}
          </span>
        </td>

        <td className="px-4 py-5 whitespace-nowrap text-gray-900">
          {user.CreatedAt.slice(0, 10)}
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
              onClick={onEdit}
              className="text-gray-700 hover:text-black"
            >
              <FiEdit2 size={18} />
            </ActionButton>
            {isblock ? (
              <ActionButton
                label="فك الحضر"
                onClick={() => onBlock?.(user)}
                className="text-blue-500 hover:text-blue-600"
              >
                <IoMdReturnRight size={18} />
              </ActionButton>
            ) : (
              <ActionButton
                label="حظر المستخدم"
                onClick={() => onBlock?.(user)}
                className="text-orange-500 hover:text-orange-600"
              >
                <FaBan size={18} />
              </ActionButton>
            )}
          </div>
        </td>
      </tr>
    </>
  );
}
