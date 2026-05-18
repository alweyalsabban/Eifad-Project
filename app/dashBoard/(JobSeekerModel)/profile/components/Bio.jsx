"use client";

function Bio({ formData, setFormData }) {
  return (
    <section className="w-full mt-5 rounded-2xl border border-slate-200 bg-white p-6 space-y-2">
      <h3 className="text-lg font-bold text-secondColorBlack">نبذة عني</h3>

      <textarea
        value={formData.bio}
        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        placeholder="اكتب نبذه تعريفية عنك و عن شخصيتك"
        className="h-36 w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 text-right text-secondColorBlack outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
      />

      <p className="text-xs text-slate-500">
        اكتب ملخصًا مهنيًا موجزًا عن نفسك
      </p>
    </section>
  );
}

export default Bio;
