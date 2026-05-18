"use client";

import { useState } from "react";
import { UseManagmentAPI } from "../../CallApiForAdmin";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LoaderTwo from "@/app/dashBoard/(JobSeekerModel)/components/LoaderTwo";

export default function UserDetailsModal({ setOpenUsrDeail, user }) {
  const [formData, setFormData] = useState({
    name: user?.FullName,
    email: user?.Email,
    role: user?.roles[0]?.RoleName === "JobSeeker" ? "باحث عن عمل" : "شركة",
    verificationStatus: user?.IsVerified,
  });
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "verificationStatus") {
      setFormData((prev) => ({
        ...prev,
        verificationStatus: JSON.parse(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await UseManagmentAPI("EditUser", {
      idUser: user?.UserID,
      fullName: formData?.name,
      email: formData?.email,
      isValidate: formData?.verificationStatus,
      /*       role: formData?.role, */
    });
    route.refresh();
    setLoading(false);

    toast.success(res?.dataResponse?.message);
    setOpenUsrDeail(false);
  }

  function onCancel() {
    setOpenUsrDeail(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      dir="rtl"
      className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-2xl font-bold text-gray-900">بيانات المستخدم</h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            الاسم
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="أدخل الاسم"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            الجيميل
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>
        {/* 
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            الدور
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          >
            <option value="JobSeeker">باحث عن عمل</option>
            <option value="Employer">شركة</option>
          </select>
        </div> */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            حالة التحقق
          </label>
          <select
            name="verificationStatus"
            value={formData.verificationStatus}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          >
            <option value={true}>موثوق</option>
            <option value={false}>غير موثوق</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className={`flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white transition 
          hover:bg-blue-700 ${loading ? "opacity-60 cursor-no-drop" : "opacity-100"}`}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <LoaderTwo />
            </div>
          ) : (
            "حفظ"
          )}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}
