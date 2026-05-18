import { FiSearch } from "react-icons/fi";

export default function JobsToolbar({ search = "", setSearch }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center" dir="rtl">
      <div className="relative flex-1">
        <FiSearch className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[20px] text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch?.(e.target.value)}
          placeholder="ابحث عن وظيفة..."
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pr-12 pl-4 text-[16px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500"
        />
      </div>
    </div>
  );
}
