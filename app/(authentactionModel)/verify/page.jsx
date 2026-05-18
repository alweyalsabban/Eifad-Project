"use client";

import React, { useEffect, useState, useRef } from "react";
import SetCookies from "@/app/lib/setCookies";
import Image from "next/image";
import Link from "next/link";
import { ApiFetchClient } from "../../lib/ApiFetchClient";
import {
  IoMdArrowBack,
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
  IoMdTime,
} from "react-icons/io";

const CONFIG = {
  OTP_LEN: 6,
  TIMER_SECONDS: 60,
  REDIRECT_DELAY: 600,
};

export default function OTPVerificationPage() {
  const [ischeaking, setCheaking] = useState(true);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(CONFIG.OTP_LEN).fill(""));
  const [timeLeft, setTimeLeft] = useState(CONFIG.TIMER_SECONDS);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const inputsRef = useRef([]);

  // ✅ Guard: إذا المستخدم مسجل دخول لا تسمح له يبقى هنا (حتى لو رجع بالزر)
  useEffect(() => {
    const savedEmail = localStorage.getItem("pending_email");
    if (!savedEmail) {
      window.location.replace("/register");
      return;
    } else {
      setCheaking(false);
    }

    setEmail(savedEmail);

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (index, value) => {
    const char = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    if (char && index < CONFIG.OTP_LEN - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CONFIG.OTP_LEN);
    
    if (pasteData) {
      const newOtp = [...otp];
      for (let i = 0; i < pasteData.length; i++) {
        newOtp[i] = pasteData[i];
      }
      setOtp(newOtp);
      
      const nextIndex = pasteData.length < CONFIG.OTP_LEN ? pasteData.length : CONFIG.OTP_LEN - 1;
      inputsRef.current[nextIndex]?.focus();
    }
  };

  const handleVerify = async (e) => {
    if (e) e.preventDefault();

    if (timeLeft === 0) {
      setToast({ show: true, msg: "انتهت صلاحية الرمز", type: "error" });
      return;
    }

    const enteredOtp = otp.join("");
    if (enteredOtp.length !== CONFIG.OTP_LEN || otp.includes("")) {
      setToast({ show: true, msg: "أدخل الرمز كاملًا", type: "error" });
      return;
    }

    setIsLoading(true);
    try {
      const isForget = sessionStorage.getItem("isForget");

      const res = await ApiFetchClient(
        `/auth/${isForget === "true" ? "verify-reset-code" : "verify-account"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, token: enteredOtp }),
        },
      );
      if (!res.isSusses)
        throw new Error(res.dataResponse?.message || "الرمز غير صحيح");

      // ✅ عدّل هذا إذا اسم التوكن مختلف في استجابة السيرفر
      const token = localStorage.getItem("token");

      if (!token || token === "undefined") {
        if (isForget === "true") {
          sessionStorage.setItem("token", enteredOtp);
          sessionStorage.removeItem("isForget");
          window.location.replace("/rest-password");
          return;
        } else {
          throw new Error("لم يتم استلام التوكن من السيرفر");
        }
      }

      // ✅ التخزين (مثل اللي عندك بالصورة: key = token)

      localStorage.setItem("user_email", email); // اختياري
      localStorage.setItem("token", token); // اختياري
      SetCookies(res.dataResponse.token);
      localStorage.removeItem("pending_email");

      setToast({
        show: true,
        msg: "تم التحقق! جاري التوجيه...",
        type: "success",
      });

      // ✅ replace = لا يضيف صفحة جديدة للتاريخ
      setTimeout(() => {
        window.location.replace("/dashBoard");
      }, CONFIG.REDIRECT_DELAY);
    } catch (err) {
      setToast({
        show: true,
        msg: err?.message || "حدث خطأ",
        type: "error",
      });
      setTimeout(() => setToast((p) => ({ ...p, show: false })), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    const isForget = sessionStorage.getItem("isForget");
    setIsLoading(true);
    try {
      const res = await ApiFetchClient(
        `/auth/${isForget === "true" ? "forgot-password" : "send-verification"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      /* const data = await res.json().catch(() => ({})); */

      if (!res.isSusses) {
        throw new Error(
          res.dataResponse?.message ||
            res.dataResponse?.error ||
            "فشل إرسال الرمز",
        );
      }

      setOtp(Array(CONFIG.OTP_LEN).fill(""));
      setTimeLeft(CONFIG.TIMER_SECONDS);

      setToast({ show: true, msg: "تم إرسال رمز جديد ✅", type: "success" });
      setTimeout(() => setToast((p) => ({ ...p, show: false })), 2500);
    } catch (err) {
      setToast({
        show: true,
        msg: err?.message || "حدث خطأ",
        type: "error",
      });
      setTimeout(() => setToast((p) => ({ ...p, show: false })), 2500);
    } finally {
      setIsLoading(false);
    }
  };

  if (ischeaking) {
    return null;
  } else {
    return (
      <div
        className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6"
        dir="rtl"
      >
        {/* Toast */}
        <div
          className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border bg-white
        ${
          toast.show
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-8 pointer-events-none"
        }
        ${
          toast.type === "success"
            ? "border-green-100 text-green-600"
            : "border-red-100 text-red-600"
        }`}
        >
          {toast.type === "success" ? (
            <IoMdCheckmarkCircle size={22} />
          ) : (
            <IoMdCloseCircle size={22} />
          )}
          <p className="text-sm font-bold">{toast.msg}</p>
        </div>

        <div className="w-full max-w-[420px] bg-white rounded-[2.5rem] shadow-xl p-10 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 rounded-[2.5rem]" />
          )}

          <div className="text-center mb-10">
            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Image
                src="/assets/chek.svg"
                alt="Verify"
                width={32}
                height={32}
              />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800">
              تحقق من حسابك
            </h1>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed text-center">
              أدخل الرمز المرسل إلى: <br />
              <span className="text-blue-600 font-semibold" dir="ltr">
                {email || "---"}
              </span>
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-between gap-2" dir="ltr">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className={`w-full h-14 text-center text-xl font-bold rounded-xl border-2 transition-all outline-none
                  ${
                    digit
                      ? "border-blue-600 bg-blue-50/10 text-blue-600"
                      : "border-slate-100 focus:border-blue-400"
                  }`}
                  value={digit}
                  onChange={(e) => handleInputChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                />
              ))}
            </div>

            <div className="flex justify-center">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold ${
                  timeLeft === 0
                    ? "bg-red-50 text-red-500"
                    : "bg-slate-50 text-slate-500"
                }`}
              >
                <IoMdTime size={16} />
                <span>
                  {timeLeft === 0
                    ? "انتهى الوقت"
                    : `متبقي ${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
                        .toString()
                        .padStart(2, "0")}`}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isLoading || otp.includes("") || timeLeft === 0}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-30 shadow-lg shadow-blue-100"
              >
                تفعيل الحساب
              </button>

              <button
                type="button"
                onClick={handleResend}
                disabled={timeLeft > 0 || isLoading}
                className="w-full py-2 text-slate-400 hover:text-blue-600 font-bold text-sm transition-colors disabled:opacity-20 cursor-pointer"
              >
                إعادة إرسال الرمز
              </button>
            </div>
          </form>

          <footer className="mt-8 pt-6 border-t border-slate-50 text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm font-semibold transition-colors"
            >
              <IoMdArrowBack size={18} />
              <span>الرجوع لتسجيل الدخول</span>
            </Link>
          </footer>
        </div>
      </div>
    );
  }
}
