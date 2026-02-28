"use client";
import Link from "next/link";
export default function HeroSection() {
  return (
    <section
      dir="rtl"
      className="bg-linear-to-r from-sky-50 via-white to-sky-50 "
    >
      <div className="py-20 cusContaner m-auto text-center flex flex-col gap-5">
        <h1 className="text-3xl font-bold animate-fade-up">
          نحو توظيف أذكى... يربط المهارة بالفرصة
        </h1>

        <p
          className="text-slate-600 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          نؤمن بأن كل فرد يستحق الفرصة المناسبة، وكل شركة تستحق الموهبة الأفضل .
        </p>

        <div className="pt-3 grid sm:grid-cols-2 m-auto  gap-4">
          <Link
            href="/service"
            type="button"
            onClick={() => sessionStorage.setItem("LinkFrom", "company")}
            className="px-6 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold 
            hover:cursor-pointer hover:bg-slate-50 transition animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            استكشف الخدمات
          </Link>

          <Link
            type="button"
            href="/"
            onClick={() => sessionStorage.setItem("LinkFrom", "jobSeeker")}
            className="px-6 py-2.5 rounded-xl text-white font-semibold
                           bg-linear-to-r from-sky-600 to-violet-500
                           hover:opacity-95 transition shadow-sm hover:cursor-pointer animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            تواصل معنا
          </Link>
        </div>
      </div>
    </section>
  );
}
