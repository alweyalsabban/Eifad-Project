import { FiUpload } from "react-icons/fi";
import Image from "next/image";

export default function CompanyImageCard() {
  return (
    <div className="rounded-2xl mt-5 max-w-sm border border-slate-200 bg-white p-3 ">
      <div className="overflow-hidden rounded-[14px]">
        <Image
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
          alt="صورة الفريق"
          className="h-60 w-full object-cover"
          height={60}
          width={32}
        />
      </div>

      <h3 className="mt-3 text-right text-[14px] font-extrabold text-slate-900">
        صورة الغلاف
      </h3>

      <button
        type="button"
        className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-[12px] font-medium text-slate-600 hover:bg-slate-50"
      >
        <FiUpload className="text-[14px]" />
        <span>تحديث الصورة</span>
      </button>
    </div>
  );
}
