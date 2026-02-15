"use client";
import React from "react";
import { CgMail } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import Link from "next/link";
import ErroeMessage from "../components/erroeMessage";
import { useRouter } from "next/navigation";
import ScoialMeadia from "../components/scoialMeadia";
import { ValiEmail, ValiPassword } from "@/app/lib/validators";

function LogInPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setisError] = useState(false);
  const route = useRouter();

  // Valdation
  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (ValiEmail(form.email)) {
      setEmailError(false);
      if (ValiPassword(form.password)) {
        setPasswordError(false);
        setLoading(true);

        const response = await fetch("/api/auth/login", {
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
          route.push("/dashBoard");
        }
      } else {
        // كلمة المرور
        setPasswordError(true);
      }
    } else {
      // البريد
      setEmailError(true);
    }
  }

  return (
    <>
      {isError && <ErroeMessage errorMessage={errorMessage} />}
      <form action="" onSubmit={onSubmit} className="flex flex-col mt-4 w-full">
        <label htmlFor="">البريد الإلكتروني</label>
        <div className="relative mt-4">
          <input
            type="email"
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
          <p className="errorMessageStayle"> * كلمة المرور خاطئة</p>
        )}

        <Link
          href="./forgetPasswoed"
          className="my-5 text-primaryColorBlue font-bold text-center"
        >
          نسيت كلمة المرور
        </Link>

        <button
          type="submit"
          disabled={loading}
          className={`w-full h-12 font-bold rounded-lg mt-4
          ${
            loading
              ? "bg-auxiliaryColorGray cursor-not-allowed text-secondColorBlack opacity-50 "
              : `bg-primaryColorBlue text-auxiliaryColorWhite hover:cursor-pointer hover:scale-105 duration-500  
              shadow-[0px_4px_6px_-4px_rgba(1,107,126,0.3),0px_10px_15px_-3px_rgba(1,107,126,0.3)]`
          }
          `}
        >
          {loading ? "تسجيل .... " : "تسجيل الدخول"}
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

export default LogInPage;
