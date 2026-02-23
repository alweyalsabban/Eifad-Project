export default function NewAdvantage({ advantage }) {
  const point = advantage.featcher;

  return (
    <div
      dir="rtl"
      className="w-121 scale-80 md:scale-63 lg:scale-85 xl:scale-100 h-84 max-w-3xl bg-white border border-slate-200 rounded-3xl px-5 py-4 hover:scale-85 md:hover:scale-68 lg:hover:scale-90 xl:hover:scale-105 duration-300"
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-sky-700 text-2xl">
        {advantage.icons}
      </div>

      <div className="mt-8 text-center space-y-4">
        <h2 className="text-2xl font-extrabold text-slate-900">
          {advantage.title}
        </h2>

        <p className="text-slate-600 leading-8 max-w-xl mx-auto">
          {advantage.descr}{" "}
        </p>
      </div>

      <ul className="mt-10 space-y-3">
        {point.map((p) => (
          <li key={p} className="flex items-center gap-3 text-slate-800">
            <span className="text-sky-600 text-lg">✓</span>
            <span className="font-semibold">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
