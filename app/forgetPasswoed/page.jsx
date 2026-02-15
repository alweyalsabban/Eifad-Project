"use client";
import React from "react";
import { CgMail } from "react-icons/cg";
import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ErroeMessage from "../(auth)/components/erroeMessage";

function Page() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function forgetPassword(e) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email: email }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      setisError(true);
      setErrorMessage(responseData.message);
    } else {
      setLoading(false);
      router.push("/cheak");
    }
  }
  return (
    <>
      <div
        className="w-111 h-142 bg-auxiliaryColorWhite shadow-2xl rounded-b-lg m-auto mt-20
      items-center flex flex-col text-center py-10 px-8 justify-center "
        dir="rtl"
      >
        <Image
          src="/assets/forgetPasswoed.svg"
          alt="bg"
          width={50}
          height={40}
          className="mb-3 select-none pointer-events-none"
        />
        <h1 className="text-2xl font-bold">نسيت كلمة السر؟</h1>
        <p className="leading-8 w-75 mt-4">
          لا تقلق، سنرسل لك تعليمات إعادة التعيين. أدخل عنوان البريد الإلكتروني
          المرتبط بحسابك.
        </p>

        <form
          action=""
          className="mt-6  w-100 flex flex-col items-center "
          onSubmit={forgetPassword}
        >
          <label htmlFor="" className="relative left-32">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            className="border border-auxiliaryColorGray rounded-lg w-90 h-10 pl-10 pr-5 mt-4"
            placeholder="البريد الإلكتروني"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <CgMail className="relative  bottom-7 right-40" />
          {isError && <ErroeMessage errorMessage={errorMessage} />}
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
            {loading ? "جاري التحقق ..." : "التحقق من الحساب"}
          </button>
        </form>

        <div className="mt-10 font-bold text-sm hover:cursor-pointer flex items-center gap-2">
          <Link href="/">الرجوع لتسجيل الدخول</Link>
          <IoMdArrowBack size={15} />
        </div>
      </div>
    </>
  );
}

export default Page;
