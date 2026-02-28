"use client";
import React from "react";

import { CgMail } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import SetCookies from "@/app/lib/setCookies";

import { useState } from "react";
import Link from "next/link";
import ErroeMessage from "./erroeMessage";
import { useRouter } from "next/navigation";
import ScoialMeadia from "./scoialMeadia";
import { ValiEmail, ValiPassword } from "@/app/lib/validators";

export const metadata = {
  title: "تسجيل الدخول",
};

function LogInPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function sendCode() {
    await fetch("/api/auth/send-verification", {
      method: "POST",
      body: JSON.stringify({ email: form.email }),
    });
  }

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setisError] = useState(false);
  const [isPasswordVisivle, setisPasswordVisivle] = useState(false);
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

        if (data.requires_verification) {
          sendCode();
          localStorage.clear();
          localStorage.setItem("pending_email", form.email);
          route.replace("/verify");
        }
        if (!response.ok) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setErrorMessage(data.message);
          setisError(true);
        } else {
          setisError(false);
          localStorage.clear();
          sessionStorage.clear();
          SetCookies(data.data.token);
          route.replace("/dashBoard");
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
            type={isPasswordVisivle ? "text" : "password"}
            name="password"
            autoComplete="password"
            className="border border-auxiliaryColorGray rounded-lg w-full h-10 pl-10 pr-10"
            placeholder="كلمة المرور"
            value={form.password}
            required
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
          />
          <RiLockPasswordLine className="absolute top-1/2 -translate-y-1/2 right-3 text-[#617989]" />
          {isPasswordVisivle ? (
            <FaRegEye
              className="absolute top-1/2 -translate-y-1/2 left-3 hover:cursor-pointer text-[#617989]"
              onClick={() => {
                setisPasswordVisivle(false);
              }}
            />
          ) : (
            <FaRegEyeSlash
              className="absolute top-1/2 -translate-y-1/2 left-3 hover:cursor-pointer text-[#617989]"
              onClick={() => {
                setisPasswordVisivle(true);
              }}
            />
          )}
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
