"use client";
import Link from "next/link";
export default function HeroSection() {
  return (
    <section
      dir="rtl"
      className="bg-linear-to-r from-sky-50 via-white to-sky-50"
    >
      <div className="py-20 cusContaner m-auto text-center flex flex-col gap-5">
        <h1 className="text-3xl font-bold">خدمات توظيف ذكية</h1>

        <p className="text-slate-600">
          من أول سيرة ذاتية إلى قرار التوظيف.. كل ما تحتاجه في منصة واحدة
        </p>

        <div className="pt-3 flex items-center justify-center gap-4">
          <Link
            href="/register"
            type="button"
            onClick={() => sessionStorage.setItem("LinkFrom", "company")}
            className="px-6 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold hover:cursor-pointer hover:bg-slate-50 transition"
          >
            ابدأ كـشركة
          </Link>

          <Link
            type="button"
            href="/register"
            onClick={() => sessionStorage.setItem("LinkFrom", "jobSeeker")}
            className="px-6 py-2.5 rounded-xl text-white font-semibold
                           bg-linear-to-r from-sky-600 to-violet-500
                           hover:opacity-95 transition shadow-sm hover:cursor-pointer"
          >
            ابدأ كـباحث عن عمل
          </Link>
        </div>
      </div>
    </section>
  );
}
