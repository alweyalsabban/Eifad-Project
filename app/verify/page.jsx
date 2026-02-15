"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { LuClock } from "react-icons/lu";
import { useRouter } from "next/navigation";

const OTP_LEN = 6;
const COUNTDOWN_SECONDS = 3 * 60;

export default function CheckPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(OTP_LEN).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);

  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");

  const inputsRef = useRef([]);

  const otpValue = useMemo(() => otp.join(""), [otp]);
  const isOtpComplete = otp.every((d) => d !== "");
  const isExpired = secondsLeft === 0;
  const canResend = isExpired && !isResending;

  const resetOtp = () => setOtp(Array(OTP_LEN).fill(""));

  // ✅ Get email from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("pending_email") || "";
    setEmail(savedEmail);

    if (!savedEmail) router.replace("/register");
  }, [router]);

  // ✅ countdown 3 minutes
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    return () => clearInterval(id);
  }, [secondsLeft]);

  const formatTime = (s) => {
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const maskEmail = (e) => {
    if (!e.includes("@")) return e;
    const [u, d] = e.split("@");
    return `${u.slice(0, 1)}***@${d}`;
  };

  const setFocus = (i) => {
    inputsRef.current[i]?.focus();
    inputsRef.current[i]?.select?.();
  };

  const handleChange = (i, value) => {
    setError("");
    const v = value.replace(/\D/g, "").slice(0, 1);

    setOtp((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });

    if (v && i < OTP_LEN - 1) setFocus(i + 1);
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace") {
      if (otp[i]) {
        setOtp((prev) => {
          const next = [...prev];
          next[i] = "";
          return next;
        });
      } else if (i > 0) {
        setFocus(i - 1);
      }
    }

    if (e.key === "ArrowLeft" && i > 0) setFocus(i - 1);
    if (e.key === "ArrowRight" && i < OTP_LEN - 1) setFocus(i + 1);
  };

  const handlePaste = (e) => {
    setError("");
    e.preventDefault();

    const text = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LEN);

    if (!text) return;

    const next = Array(OTP_LEN).fill("");
    for (let i = 0; i < text.length; i++) next[i] = text[i];

    setOtp(next);

    const last = Math.min(text.length, OTP_LEN) - 1;
    if (last >= 0) setFocus(last);
  };

  // ✅ verify (proxy)
  const verifyOtpApi = async ({ email, token }) => {
    const res = await fetch("/api/auth/verify-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token }),
    });

    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  };

  // ✅ resend (proxy) -> send-otp (email only)
  const resendOtpApi = async ({ email }) => {
    const res = await fetch("/api/auth/send-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  };

  const onResend = async () => {
    if (!canResend) return;

    setIsResending(true);
    setError("");

    try {
      const result = await resendOtpApi({ email });

      if (!result.ok) {
        const msg =
          result.data?.message ||
          result.data?.error ||
          "تعذر إعادة إرسال الرمز. حاول مرة أخرى.";
        setError(msg);
        return;
      }

      resetOtp();
      setSecondsLeft(COUNTDOWN_SECONDS);
      setFocus(0);

      window.alert(result.data?.message || "تم إرسال رمز جديد ✅");
    } catch {
      setError("حدث خطأ أثناء إعادة الإرسال.");
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isExpired) {
      setError("انتهت صلاحية الرمز. اضغط إعادة إرسال للحصول على رمز جديد.");
      return;
    }
    if (!isOtpComplete) {
      setError("أدخل رمز التحقق كاملًا (6 أرقام).");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      const result = await verifyOtpApi({ email, token: otpValue });

      if (!result.ok) {
        const msg =
          result.data?.message ||
          result.data?.error ||
          "تعذر تفعيل الحساب. تأكد من الرمز.";

        if (result.status === 422 && String(msg).includes("مفعل")) {
          window.alert("الحساب مُفعّل مسبقًا ✅");
          router.push("/dashBoard");
          return;
        }

        setError(msg);
        return;
      }

      window.alert(result.data?.message || "تم تفعيل الحساب بنجاح ✅");
      router.push("/dashBoard");
    } catch {
      setError("حدث خطأ أثناء الاتصال بالخادم.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div
      className="w-111 bg-auxiliaryColorWhite shadow-2xl rounded-b-lg m-auto
      items-center flex flex-col text-center py-10 px-8 justify-center "
      dir="rtl"
    >
      <Image
        src="/assets/chek.svg"
        alt="bg"
        width={50}
        height={40}
        className="mb-3 select-none pointer-events-none"
      />

      <h1 className="text-2xl font-bold">التحقق بخطوتين</h1>

      <p className="leading-8 w-75 mt-4">
        لقد أرسلنا رمز تحقق مكون من 6 أرقام إلى عنوان البريد الإلكتروني
        <span className="font-bold"> {maskEmail(email)} </span>
        يرجى إدخاله أدناه.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-6 w-100 flex flex-col items-center"
      >
        <div className="flex gap-2" dir="ltr" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              inputMode="numeric"
              pattern="\d*"
              type="text"
              name={`otp-${i}`}
              autoComplete="one-time-code"
              className="border border-auxiliaryColorGray rounded-lg w-12 h-14 text-center text-xl"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              autoFocus={i === 0}
            />
          ))}
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600 font-bold">{error}</p>
        )}

        <div className="flex items-center gap-4 mt-6 bg-auxiliaryColorGray px-10 py-2 rounded-sm text-auxiliaryColorOrange">
          <h1>
            {isExpired
              ? "انتهى الرمز"
              : `ينتهي الرمز في ${formatTime(secondsLeft)}`}
          </h1>
          <LuClock />
        </div>

        <button
          type="submit"
          disabled={isVerifying || !isOtpComplete || isExpired}
          className={`w-90 h-12 mt-7 bg-primaryColorBlue text-auxiliaryColorWhite font-bold rounded-lg 
          duration-300 shadow-[0px_4px_6px_-4px_rgba(1,107,126,0.3),0px_10px_15px_-3px_rgba(1,107,126,0.3)]
          ${isVerifying || !isOtpComplete || isExpired ? "opacity-60 cursor-not-allowed" : "hover:scale-105"}`}
        >
          {isVerifying ? "جارٍ التحقق..." : "تحقق"}
        </button>

        <button
          type="button"
          onClick={onResend}
          disabled={!canResend}
          className={`mt-3 h-12 px-6 rounded-lg font-bold border border-auxiliaryColorGray duration-300
          ${canResend ? "hover:scale-105" : "opacity-60 cursor-not-allowed"}`}
        >
          {isResending ? "جارٍ الإرسال..." : "إعادة إرسال الرمز"}
        </button>

        {!canResend && (
          <p className="mt-2 text-xs text-gray-500">
            يمكنك إعادة إرسال الرمز بعد انتهاء الوقت.
          </p>
        )}
      </form>

      <div className="mt-10 font-bold text-sm hover:cursor-pointer flex items-center gap-2">
        <Link href="/register">الرجوع لتسجيل الدخول</Link>
        <IoMdArrowBack size={15} />
      </div>
    </div>
  );
}
