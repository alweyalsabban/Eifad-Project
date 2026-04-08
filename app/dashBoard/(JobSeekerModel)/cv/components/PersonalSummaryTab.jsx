function PersonalSummaryTab({ summary, setSummary, title, setTitle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 mt-5">
      <h3 className="text-right text-base font-semibold text-slate-900">
        العنوان الوظيفي
      </h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="اكتب عنوانك الوظيفي "
        className="mt-3 mb-5 w-full resize-none rounded-2xl border border-slate-200 p-4 text-right text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
      />
      <h3 className="text-right text-base font-semibold text-slate-900">
        الملخص الشخصي
      </h3>
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="اكتب ملخصاً مهنياً عن نفسك..."
        className="mt-3 h-32 w-full resize-none rounded-2xl border border-slate-200 p-4 text-right text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default PersonalSummaryTab;
