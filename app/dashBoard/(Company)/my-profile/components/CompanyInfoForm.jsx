import {
  FiCheckCircle,
  FiUpload,
  FiGlobe,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

export default function CompanyInfoForm() {
  return (
    <div
      className="w-full mt-5 rounded-2xl border border-slate-200 
    bg-white p-4 "
    >
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <h2 className="text-[24px] font-extrabold text-slate-900">
          معلومات الشركة
        </h2>

        <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-600">
          <FiCheckCircle className="text-[13px]" />
          موثّق
        </div>
      </div>

      {/* Logo Upload */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-[28px] font-bold text-white shadow-sm">
          G
        </div>
        <div className="flex-1 text-right">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-medium text-slate-600 hover:bg-slate-50"
          >
            <FiUpload className="text-[14px]" />
            تحميل شعار جديد
          </button>

          <p className="mt-2 text-[10px] text-slate-400">PNG, JPG &lt; 2MB</p>
        </div>
      </div>

      <form className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-slate-500">
            اسم الشركة
          </label>
          <input
            type="text"
            defaultValue="جوجل المملكة العربية السعودية"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-[13px] text-slate-700 outline-none placeholder:text-slate-300 focus:border-blue-500"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-slate-500">
            الصناعة
          </label>
          <input
            type="text"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-[13px] text-slate-700 outline-none placeholder:text-slate-300 focus:border-blue-500"
          />
        </div>

        {/* Website */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-slate-500">
            الموقع الإلكتروني
          </label>
          <div className="relative">
            <FiGlobe className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[15px] text-slate-400" />
            <input
              type="text"
              defaultValue="www.google.com.sa"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pr-11 pl-4 text-[13px] text-slate-700 outline-none placeholder:text-slate-300 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-slate-500">
            البريد الإلكتروني
          </label>
          <div className="relative">
            <FiMail className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[15px] text-slate-400" />
            <input
              type="email"
              defaultValue="hr@google.com.sa"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pr-11 pl-4 text-[13px] text-slate-700 outline-none placeholder:text-slate-300 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-slate-500">
            رقم الهاتف
          </label>
          <div className="relative">
            <FiPhone className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[15px] text-slate-400" />
            <input
              type="text"
              defaultValue="+966 11 234 5678"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pr-11 pl-4 text-[13px] text-slate-700 outline-none placeholder:text-slate-300 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-slate-500">
            العنوان
          </label>
          <div className="relative">
            <FiMapPin className="pointer-events-none absolute right-4 top-4 text-[15px] text-slate-400" />
            <textarea
              rows={3}
              className="w-full rounded-xl border border-slate-200 bg-white pr-11 pl-4 py-3 text-[13px] text-slate-700 outline-none placeholder:text-slate-300 focus:border-blue-500"
            />
          </div>
        </div>

        {/* About */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-slate-500">
            عن الشركة
          </label>
          <textarea
            rows={5}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] text-slate-700 outline-none placeholder:text-slate-300 focus:border-blue-500"
          />
          <p className="mt-1 text-[10px] text-slate-400">
            وصف مختصر عن شركتك ونشاطها
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            className="h-11 min-w-20 rounded-xl border border-slate-200 bg-white px-5 text-[13px] font-medium text-slate-600 hover:bg-slate-50"
          >
            إلغاء
          </button>

          <button
            type="submit"
            className="h-11 flex-1 rounded-xl bg-blue-600 px-5 text-[13px] font-semibold text-white hover:bg-blue-700"
          >
            حفظ التغييرات
          </button>
        </div>
      </form>
    </div>
  );
}
