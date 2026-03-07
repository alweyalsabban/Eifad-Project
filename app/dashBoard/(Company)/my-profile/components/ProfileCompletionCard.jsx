export default function ProfileCompletionCard() {
  const progress = 85;

  return (
    <div className="rounded-2xl max-w-sm bg-blue-600 p-4 text-white mt-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-extrabold">اكتمال الملف</h3>
        <span className="text-[13px] font-bold">{progress}%</span>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/30">
        <div
          className="h-full rounded-full bg-white"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-3 text-right text-[11px] leading-5 text-blue-100">
        أكمل ملفك لزيادة فرص جذب المرشحين بشكل أفضل
      </p>
    </div>
  );
}
