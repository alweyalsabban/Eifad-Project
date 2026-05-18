"use client";
import React, { useEffect, useMemo, useState } from "react";
import SetCookies from "@/app/lib/setCookies";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [showP, setShowP] = useState(false);
  const [showC, setShowC] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ اقرأ التخزين بعد ما يشتغل المتصفح
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setEmail(window.localStorage.getItem("pending_email") || "");
      setToken(window.sessionStorage.getItem("token") || "");
    } catch (_) {
      // لو المتصفح يمنع الوصول للتخزين لأي سبب
      setEmail("");
      setToken("");
    }
  }, []);

  const v = useMemo(() => {
    const min = password.length >= 8;
    const letter = /[A-Za-z\u0600-\u06FF]/.test(password);
    const num = /\d/.test(password);
    const strong = min && letter && num;
    const match = password_confirmation
      ? password === password_confirmation
      : null;
    return { min, letter, num, strong, match };
  }, [password, password_confirmation]);

  const badge = useMemo(() => {
    if (!password) return null;
    if (v.match === false) return ["error", "كلمتا المرور غير متطابقتين"];
    return v.strong
      ? ["success", "كلمة المرور قوية"]
      : ["info", "استخدم 8 أحرف على الأقل مع رقم وحرف"];
  }, [password, v.strong, v.match]);

  const canSubmit =
    !!email &&
    !!token &&
    password &&
    password_confirmation &&
    v.strong &&
    v.match === true &&
    !loading;

  const [successOpen, setSuccessOpen] = useState(false);
  const [apiError, setApiError] = useState("");

  const endpoint = "https://eifad.laravel.cloud/api/auth/reset-password";

  async function onSubmit(e) {
    e.preventDefault();
    setApiError("");

    if (!email || !token) {
      setApiError(
        "لم يتم العثور على البريد أو التوكن. أعد المحاولة من خطوة طلب إعادة التعيين.",
      );
      return;
    }
    if (!canSubmit) return;

    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          password,
          password_confirmation,
        }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (_) {}

      if (!res.ok) {
        const msg =
          data?.message ||
          data?.error ||
          "حدث خطأ أثناء إعادة تعيين كلمة المرور. حاول مرة أخرى.";
        throw new Error(msg);
      }

      // نجاح ✅
      setSuccessOpen(true);

      // تنظيف التخزين ثم نقل مع منع الرجوع
      setTimeout(() => {
        try {
          window.sessionStorage.removeItem("token"); // ✅ كان عندك localStorage بالغلط
          //window.localStorage.removeItem("pending_email");
        } catch (_) {}
        SetCookies(token);
        window.location.replace("/dashBoard");
      }, 900);
    } catch (err) {
      setApiError(err?.message || "فشل الطلب");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-50 grid place-items-center p-4"
    >
      <div className="w-full max-w-xl bg-white rounded-[28px] border border-slate-100 px-6 py-8 sm:px-10 sm:py-10 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
        <IconTop />

        <h1 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          إعادة تعيين كلمة المرور
        </h1>
        <p className="mt-2 text-center text-slate-500">
          أدخل كلمة مرور جديدة لحسابك:
        </p>

        <div className="mt-1 text-center">
          {!mounted ? (
            <span className="text-slate-400">جارٍ التحميل...</span>
          ) : email ? (
            <span className="text-blue-600 font-medium">{email}</span>
          ) : (
            <span className="text-rose-600 font-semibold">
              لا يوجد بريد محفوظ (pending_email)
            </span>
          )}
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <PwInput
            label="كلمة المرور الجديدة"
            value={password}
            onChange={setPassword}
            show={showP}
            onToggle={() => setShowP((x) => !x)}
          />

          <Rules ok={[v.min, v.letter, v.num]} />

          <PwInput
            label="تأكيد كلمة المرور"
            value={password_confirmation}
            onChange={setPasswordConfirmation}
            show={showC}
            onToggle={() => setShowC((x) => !x)}
          />

          {badge && <Badge type={badge[0]} text={badge[1]} />}

          {apiError && (
            <div className="flex justify-center pt-1">
              <div className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold bg-rose-50 text-rose-700 border border-rose-100">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <span>{apiError}</span>
              </div>
            </div>
          )}

          <button
            disabled={!canSubmit}
            className={cx(
              "w-full h-16 rounded-[20px] font-extrabold text-lg transition",
              canSubmit
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_14px_30px_rgba(30,102,255,0.25)]"
                : "bg-blue-200 text-white/80 cursor-not-allowed",
            )}
          >
            {loading ? "جارٍ الحفظ..." : "حفظ كلمة المرور"}
          </button>
        </form>
      </div>

      {successOpen && (
        <Modal>
          <div className="text-center">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-emerald-50 grid place-items-center border border-emerald-100">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="text-emerald-600"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 className="mt-4 text-xl font-extrabold text-slate-900">
              تم تغيير كلمة المرور
            </h2>
            <p className="mt-2 text-slate-500">
              سيتم نقلك إلى لوحة التحكم الآن…
            </p>

            <div className="mt-5">
              <div className="h-2 w-40 mx-auto rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-1/2 bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ---------- UI Pieces ---------- */

function IconTop() {
  return (
    <div className="flex justify-center">
      <div className="h-16 w-16 rounded-2xl bg-blue-50 grid place-items-center relative">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          className="text-blue-600"
        >
          <path
            d="M7 10V8a5 5 0 0 1 10 0v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M6.5 10h11A2.5 2.5 0 0 1 20 12.5v6A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-6A2.5 2.5 0 0 1 6.5 10Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 14v3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-amber-400 border-2 border-white" />
      </div>
    </div>
  );
}

function PwInput({ label, value, onChange, show, onToggle }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          className="w-full h-14 rounded-2xl border-2 border-slate-200 focus:border-blue-600 outline-none px-4 text-slate-900 placeholder:text-slate-300"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 hover:text-slate-700"
        >
          {show ? "إخفاء" : "إظهار"}
        </button>
      </div>
    </div>
  );
}

function Rules({ ok: [min, letter, num] }) {
  return (
    <div className="-mt-1 flex flex-wrap gap-2 text-xs">
      <Rule ok={min} text="8 أحرف+" />
      <Rule ok={letter} text="حرف" />
      <Rule ok={num} text="رقم" />
    </div>
  );
}

function Rule({ ok, text }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 border",
        ok
          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
          : "bg-slate-50 text-slate-500 border-slate-200",
      )}
    >
      <span
        className={cx(
          "h-1.5 w-1.5 rounded-full",
          ok ? "bg-emerald-500" : "bg-slate-300",
        )}
      />
      {text}
    </span>
  );
}

function Badge({ type, text }) {
  const map = {
    error: "bg-rose-50 text-rose-600 border-rose-100",
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    info: "bg-amber-50 text-amber-700 border-amber-100",
  };
  const dot = {
    error: "bg-rose-500",
    success: "bg-emerald-500",
    info: "bg-amber-500",
  }[type];

  return (
    <div className="flex justify-center pt-1">
      <div
        className={cx(
          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border",
          map[type],
        )}
      >
        <span className={cx("h-2 w-2 rounded-full", dot)} />
        {text}
      </div>
    </div>
  );
}

function Modal({ children }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-slate-900/25 backdrop-blur-[2px]" />
      <div className="relative w-full max-w-sm rounded-[24px] bg-white border border-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.18)] p-6">
        {children}
      </div>
    </div>
  );
}
