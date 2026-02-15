"use client";
import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { CgMail } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlinePhone } from "react-icons/md";
import { useState } from "react";
import ErroeMessage from "../components/erroeMessage";
import { useRouter } from "next/navigation";
import ScoialMeadia from "../components/scoialMeadia";

/// validate
import { Valiname } from "@/app/lib/validators";
import { ValiEmail } from "@/app/lib/validators";
import { ValiPassword } from "@/app/lib/validators";
import { ValiConformPassword } from "@/app/lib/validators";

function RegesterPage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    role: "",
  });

  const [isManager, setManager] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setisError] = useState(false);
  const router = useRouter();

  // Valdation
  const [isNameError, setNameError] = useState(false);
  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);
  const [isPasswordonfirm, setPasswordonfirm] = useState(false);
  const [isPhoneError, setPhoneError] = useState(false);

  async function sendCode() {
    await fetch("/api/auth/send-verification", {
      method: "POST",
      body: JSON.stringify({ email: form.email }),
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (Valiname(form.full_name)) {
      setNameError(false);
      if (ValiEmail(form.email)) {
        setEmailError(false);
        if (ValiPassword(form.password)) {
          setPasswordError(false);
          if (ValiConformPassword(form.password, form.password_confirmation)) {
            setPasswordonfirm(false);
            if (form.phone.length >= 9) {
              setPhoneError(false);
              setLoading(true);
              const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
              });
              setLoading(false);
              const data = await response.json();
              if (!response.ok) {
                setErrorMessage(data.message);
                setisError(true);
              } else {
                setisError(false);
                sendCode();
                localStorage.setItem("pending_email", form.email);
                router.push(`/verify`);
              }
            } else {
              setPhoneError(true);
              // تححق من الجوال
            }
          } else {
            setPasswordonfirm(true);
            //غير متطابقة
          }
        } else {
          setPasswordError(true);
          // خطأ في الباسورد
        }
      } else {
        setEmailError(true);
        // تاكيد من صيغة كلمة المرور
      }
    } else {
      setNameError(true);
      // تأكد من الأسم
    }
  }

  return (
    <>
      {isError && <ErroeMessage errorMessage={errorMessage} />}

      <div className="w-full h-11 bg-secondColorBlack flex justify-between px-4 sm:px-5 py-7 items-center text-[#617989] gap-2 mt-5 rounded-sm">
        <button
          className={`w-1/2 hover:cursor-pointer ${isManager && "btnActiveSing"}`}
          onClick={() => {
            setManager(true);
            setForm({ ...form, role: "JobSeeker" });
          }}
        >
          للمدراء
        </button>
        <button
          className={`w-1/2 hover:cursor-pointer ${!isManager && "btnActiveSing"}`}
          onClick={() => {
            setManager(false);
            setForm({ ...form, role: "Company" });
          }}
        >
          باحث عن عمل
        </button>
      </div>

      <form action="" onSubmit={onSubmit} className="flex flex-col mt-4 w-full">
        <label htmlFor="">الاسم الكامل</label>
        <div className="relative mt-4">
          <input
            type="text"
            name="name"
            autoComplete="name"
            className="border border-auxiliaryColorGray rounded-lg w-full h-10 pl-10 pr-10"
            placeholder="الاسم الكامل"
            value={form.full_name}
            required
            onChange={(e) => {
              setForm({ ...form, full_name: e.target.value });
            }}
          />
          <IoPersonOutline className="absolute top-1/2 -translate-y-1/2 right-3 text-[#617989]" />
        </div>
        {isNameError && (
          <p className="errorMessageStayle">
            {" "}
            * يجب على الاسم أن يحتوي حروف و أرقام و لا يحتوي أول حرف على رقم
          </p>
        )}

        <label htmlFor="" className="mt-2">
          البريد الإلكتروني
        </label>
        <div className="relative mt-4">
          <input
            type="email"
            name="email"
            autoComplete="email"
            className="border border-auxiliaryColorGray rounded-lg w-full h-10 pl-10 pr-10"
            placeholder="البريد الإلكتروني"
            value={form.email}
            required
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
          />
          <CgMail className="absolute top-1/2 -translate-y-1/2 right-3 text-[#617989]" />
        </div>
        {isEmailError && (
          <p className="errorMessageStayle"> * صيغة البريد غير صحيحة </p>
        )}

        <label htmlFor="" className="mt-2">
          كلمة المرور
        </label>
        <div className="relative mt-4">
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            className="border border-auxiliaryColorGray rounded-lg w-full h-10 pl-10 pr-10"
            placeholder="كلمة المرور"
            value={form.password}
            required
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
          />
          <RiLockPasswordLine className="absolute top-1/2 -translate-y-1/2 right-3 text-[#617989]" />
        </div>
        {isPasswordError && (
          <p className="errorMessageStayle">
            {" "}
            * يجب أن تحتوي على 8 أحرف على الأقل مع حرف كبير و صغير ورقم ورمز خاص
            .
          </p>
        )}

        <label htmlFor="" className="mt-2">
          تأكيد كلمة المرور
        </label>
        <div className="relative mt-4">
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            className="border border-auxiliaryColorGray rounded-lg w-full h-10 pl-10 pr-10"
            placeholder="تأكيد كلمة المرور"
            value={form.password_confirmation}
            required
            onChange={(e) => {
              setForm({ ...form, password_confirmation: e.target.value });
            }}
          />
          <RiLockPasswordLine className="absolute top-1/2 -translate-y-1/2 right-3 text-[#617989]" />
        </div>
        {isPasswordonfirm && (
          <p className="errorMessageStayle"> * كلمة المرور غير متطابقة</p>
        )}

        <label htmlFor="" className="mt-2">
          رقم الجوال
        </label>
        <div className="relative mt-4">
          <input
            type="text"
            name="phone"
            autoComplete="phone"
            className="border border-auxiliaryColorGray rounded-lg w-full h-10 pl-10 pr-10"
            placeholder="رقم الجوال"
            value={form.phone}
            required
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
              setForm({ ...form, phone: onlyNumbers });
            }}
          />
          <MdOutlinePhone className="absolute top-1/2 -translate-y-1/2 right-3 text-[#617989]" />
        </div>
        {isPhoneError && (
          <p className="errorMessageStayle"> * رقم الجوال غير صحيح</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full h-12  font-bold rounded-lg mt-4
          ${
            loading
              ? "bg-auxiliaryColorGray cursor-not-allowed text-secondColorBlack opacity-50 "
              : `bg-primaryColorBlue text-auxiliaryColorWhite hover:cursor-pointer hover:scale-105 duration-500  
              shadow-[0px_4px_6px_-4px_rgba(1,107,126,0.3),0px_10px_15px_-3px_rgba(1,107,126,0.3)]`
          }
          `}
        >
          {loading ? "جاري الإنشاء..." : "إنشاء حساب"}
        </button>
      </form>

      <div>
        <div className="relative">
          <hr className="mt-8" />
          <h1 className="absolute left-1/2 -translate-x-1/2 -top-3 bg-auxiliaryColorWhite px-3 text-center text-[#94A3B8]">
            أو سجل بواسطة
          </h1>
        </div>

        <ScoialMeadia />
      </div>
    </>
  );
}

export default RegesterPage;
