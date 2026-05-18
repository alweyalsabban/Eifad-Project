// components/CvAnalysisPdfReport.jsx
"use client";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function CvAnalysisPdfReport({ data }) {
  const score = Math.max(0, Math.min(100, Number(data?.scores?.overall) || 0));

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <button
        onClick={handlePrint}
        className="print:hidden flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 text-white text-sm font-medium hover:bg-blue-700 transition mt-5 mb-15 hover:cursor-pointer"
      >
        <span>تحميل تقرير التحليل (PDF)</span>
        <ArrowDownTrayIcon className="h-5 w-5" />
      </button>

      <div
        id="cv-analysis-report"
        dir="rtl"
        className="hidden print:block bg-white text-slate-900 font-sans"
      >
        <div className="mx-auto max-w-4xl p-10">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-blue-700">
                  تقرير تحليل السيرة الذاتية
                </h1>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  تقرير شامل يوضح تقييم السيرة الذاتية، نقاط القوة، نقاط
                  التحسين، وفجوات المهارات المقترحة.
                </p>
              </div>

              <div className="rounded-2xl bg-blue-50 px-6 py-4 text-center">
                <p className="text-xs text-slate-500">التقييم العام</p>
                <p className="mt-2 text-4xl font-extrabold text-blue-700">
                  {score}%
                </p>
              </div>
            </div>
          </header>

          <section className="mb-6 rounded-3xl border border-slate-200 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                قوة السيرة الذاتية
              </h2>
              <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                {score}%
              </span>
            </div>

            <p className="mb-4 text-sm leading-7 text-slate-600">
              سيرتك الذاتية تتطابق مع {score}% من متطلبات الوظائف المتاحة حسب
              تحليل الذكاء الاصطناعي.
            </p>

            <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${score}%` }}
              />
            </div>
          </section>

          <ReportSection
            title="نقاط القوة"
            items={data?.strengths}
            badgeClass="bg-green-100 text-green-700"
            titleClass="text-green-700"
          />

          <ReportSection
            title="نقاط التحسين"
            items={data?.weaknesses}
            badgeClass="bg-amber-100 text-amber-700"
            titleClass="text-amber-700"
          />

          <ReportSection
            title="تحليل فجوة المهارات"
            items={data?.gaps}
            badgeClass="bg-blue-100 text-blue-700"
            titleClass="text-blue-700"
          />

          <footer className="mt-10 border-t border-slate-200 pt-5 text-center text-xs text-slate-400">
            تم إنشاء هذا التقرير تلقائيًا بناءً على تحليل السيرة الذاتية.
          </footer>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }

          #cv-analysis-report,
          #cv-analysis-report * {
            visibility: visible;
          }

          #cv-analysis-report {
            display: block !important;
            position: absolute;
            inset: 0;
            width: 100%;
          }

          @page {
            size: A4;
            margin: 12mm;
          }
        }
      `}</style>
    </>
  );
}

function ReportSection({
  title,
  items = [],
  badgeClass = "",
  titleClass = "",
}) {
  return (
    <section className="mb-6 break-inside-avoid rounded-3xl border border-slate-200 bg-white p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className={`text-xl font-bold ${titleClass}`}>{title}</h2>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
        >
          {items?.length || 0} عنصر
        </span>
      </div>

      {items?.length > 0 ? (
        <ol className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-8 text-slate-700"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-500">
                {index + 1}
              </span>
              <p className="text-justify">{item?.ar || item}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
          لا توجد بيانات.
        </p>
      )}
    </section>
  );
}
