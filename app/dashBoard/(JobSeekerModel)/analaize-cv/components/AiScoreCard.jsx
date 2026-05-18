import { SparklesIcon } from "@heroicons/react/24/outline";

export default function AiScoreCard({ score }) {
  const clamped = Math.max(0, Math.min(100, Number(score) || 0));

  return (
    <section className="w-full rounded-2xl bg-linear-to-r from-green-500 to-emerald-600 p-6 text-white mt-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="flex gap-3">
            <SparklesIcon className="h-6 w-6" aria-hidden="true" />
            <h3 className="text-lg font-semibold">تقييم الذكاء الاصطناعي</h3>
          </div>

          <p className="mt-2 text-sm text-white/90 mr-10">
            سيرتك الذاتية قوية وتتطابق مع {clamped}% من الوظائف المتاحة
          </p>
        </div>

        <div className="text-left">
          <div className="text-5xl font-extrabold leading-none">{clamped}%</div>
          <div className="mt-2 text-xs text-white/85">قوة السيرة الذاتية</div>
        </div>
      </div>

      <div className="mt-5 h-3 w-full rounded-full bg-white/25">
        <div
          className="h-3 rounded-full bg-white"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </section>
  );
}
