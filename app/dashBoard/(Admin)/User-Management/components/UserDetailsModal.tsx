"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export type UserModalData = {
  id?: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  verificationStatus: "موثق" | "قيد الانتظار" | "مرفوض";
  accountStatus: "نشط" | "محظور";
  skills: string[];
  applicationsCount: number;
};

type Props = {
  isOpen: boolean;
  mode: "view" | "edit";
  onClose: () => void;
  user: UserModalData | null;
  onSave?: (user: UserModalData) => void;
};

function verificationBadge(status: UserModalData["verificationStatus"]) {
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

function accountBadge(status: UserModalData["accountStatus"]) {
  switch (status) {
    case "نشط":
      return "bg-blue-100 text-blue-700";
    case "محظور":
      return "bg-gray-200 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function UserDetailsModal({
  isOpen,
  mode,
  onClose,
  user,
  onSave,
}: Props) {
  const [form, setForm] = useState<UserModalData | null>(null);

  useEffect(() => {
    setForm(user);
  }, [user]);

  if (!isOpen || !user || !form) return null;

  const isEdit = mode === "edit";

  function updateField<K extends keyof UserModalData>(
    key: K,
    value: UserModalData[K],
  ) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function handleSkillChange(index: number, value: string) {
    if (!form) return;
    const next = [...form.skills];
    next[index] = value;
    updateField("skills", next);
  }

  function handleSave() {
    if (!form || !onSave) return;
    onSave(form);
    console.log("User updated:", form);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        dir="rtl"
        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-black"
            aria-label="إغلاق"
          >
            <X size={22} />
          </button>

          <h2 className="text-2xl font-bold text-[#0f172a]">
            {isEdit ? "تعديل الملف الشخصي" : "عرض الملف الشخصي"}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          <div className="space-y-1 text-right">
            <p className="text-lg text-gray-500">الاسم</p>
            {isEdit ? (
              <input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-lg font-semibold outline-none"
              />
            ) : (
              <p className="text-3xl font-semibold text-black">{user.name}</p>
            )}
          </div>

          <div className="space-y-1 text-right">
            <p className="text-lg text-gray-500">البريد الإلكتروني</p>
            {isEdit ? (
              <input
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-lg font-semibold outline-none"
              />
            ) : (
              <p className="text-3xl font-semibold text-black">{user.email}</p>
            )}
          </div>

          <div className="space-y-1 text-right">
            <p className="text-lg text-gray-500">الدور</p>
            {isEdit ? (
              <select
                value={form.role}
                onChange={(e) => updateField("role", e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-lg font-semibold outline-none"
              >
                <option value="باحث عن عمل">باحث عن عمل</option>
                <option value="صاحب عمل">صاحب عمل</option>
              </select>
            ) : (
              <p className="text-3xl font-semibold text-black">{user.role}</p>
            )}
          </div>

          <div className="space-y-1 text-right">
            <p className="text-lg text-gray-500">تاريخ الإنشاء</p>
            {isEdit ? (
              <input
                value={form.createdAt}
                onChange={(e) => updateField("createdAt", e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-lg font-semibold outline-none"
              />
            ) : (
              <p className="text-3xl font-semibold text-black">
                {user.createdAt}
              </p>
            )}
          </div>

          <div className="space-y-2 text-right">
            <p className="text-lg text-gray-500">حالة التحقق</p>
            {isEdit ? (
              <select
                value={form.verificationStatus}
                onChange={(e) =>
                  updateField(
                    "verificationStatus",
                    e.target.value as UserModalData["verificationStatus"],
                  )
                }
                className="w-full rounded-lg border px-3 py-2 text-lg font-semibold outline-none"
              >
                <option value="موثق">موثق</option>
                <option value="قيد الانتظار">قيد الانتظار</option>
                <option value="مرفوض">مرفوض</option>
              </select>
            ) : (
              <span
                className={`inline-flex rounded-full px-4 py-1.5 text-base font-semibold ${verificationBadge(
                  user.verificationStatus,
                )}`}
              >
                {user.verificationStatus}
              </span>
            )}
          </div>

          <div className="space-y-2 text-right">
            <p className="text-lg text-gray-500">حالة الحساب</p>
            {isEdit ? (
              <select
                value={form.accountStatus}
                onChange={(e) =>
                  updateField(
                    "accountStatus",
                    e.target.value as UserModalData["accountStatus"],
                  )
                }
                className="w-full rounded-lg border px-3 py-2 text-lg font-semibold outline-none"
              >
                <option value="نشط">نشط</option>
                <option value="محظور">محظور</option>
              </select>
            ) : (
              <span
                className={`inline-flex rounded-full px-4 py-1.5 text-base font-semibold ${accountBadge(
                  user.accountStatus,
                )}`}
              >
                {user.accountStatus}
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 text-right">
          <p className="mb-3 text-lg text-gray-500">Skills</p>

          {isEdit ? (
            <div className="space-y-2">
              {form.skills.map((skill, index) => (
                <input
                  key={index}
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 outline-none"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-end gap-3">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-blue-100 px-4 py-2 text-lg text-blue-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 text-right">
          <p className="text-lg text-gray-500">Total Applications</p>
          {isEdit ? (
            <input
              type="number"
              value={form.applicationsCount}
              onChange={(e) =>
                updateField("applicationsCount", Number(e.target.value))
              }
              className="mt-2 w-full rounded-lg border px-3 py-2 text-lg font-semibold outline-none"
            />
          ) : (
            <p className="mt-1 text-5xl font-bold text-black">
              {user.applicationsCount}
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-col-reverse gap-4 border-t pt-5 sm:flex-row">
          {isEdit ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 rounded-xl bg-blue-600 py-3 text-xl font-semibold text-white transition hover:bg-blue-700"
              >
                حفظ التعديلات
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-gray-200 py-3 text-xl font-semibold text-black transition hover:bg-gray-50"
              >
                إلغاء
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="flex-1 rounded-xl border border-gray-200 py-3 text-xl font-semibold text-black transition hover:bg-gray-50"
              >
                تعديل
              </button>

              <button
                type="button"
                className="flex-1 rounded-xl border border-gray-200 py-3 text-xl font-semibold text-orange-600 transition hover:bg-orange-50"
              >
                حظر
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
