// "use client";
// import FilterInput from "../../../../(authentactionModel)/jobs/components/FilterInput";
// import {
//   MagnifyingGlassIcon,
//   FunnelIcon,
//   MapPinIcon,
//   BriefcaseIcon,
// } from "@heroicons/react/24/outline";

// export default function JobSearchBar({ onSearch, params, setParams }) {
//   const handleSearch = () => {
//     onSearch?.({ keyword, location });
//   };

//   return (
//     <section
//       dir="rtl"
//       className="w-full rounded-2xl border border-secondGray bg-white p-5 mt-5"
//     >
//       <div className="grid grid-cols-1 md:grid-cols-[auto_20%_20%] gap-4">
//         {/* Keyword */}
//         <div className="relative">
//           <BriefcaseIcon className="absolute right-3 top-3 h-5 w-5 text-slate-400" />
//           <input
//             value={params.search}
//             onChange={(e) => setParams({ ...params, search: e.target.value })}
//             placeholder="المسمى الوظيفي أو الكلمات المفتاحية"
//             className="h-12 w-full rounded-xl border border-secondGray pr-10 pl-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Location */}
//         <div className="relative">
//           <MapPinIcon className="absolute right-3 top-3 h-5 w-5 text-slate-400" />
//           <input
//             value={params.location}
//             onChange={(e) => setParams({ ...params, location: e.target.value })}
//             placeholder="الموقع"
//             className="h-12 w-full rounded-xl border border-secondGray pr-10 pl-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           className="flex items-center gap-2 rounded-xl border border-secondGray px-4 h-12
//         text-slate-700 hover:bg-slate-50 hover:cursor-pointer"
//         >
//           <span>تصفية</span>
//         </button>
//       </div>
//     </section>
//   );
// }

"use client";

import { useMemo, useState } from "react";
import {
  MapPinIcon,
  BriefcaseIcon,
  FunnelIcon,
  XMarkIcon,
  BuildingOffice2Icon,
  CurrencyDollarIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

export default function JobSearchBar({ params, setParams }) {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = useMemo(() => {
    return !!(
      params.workplace_type ||
      params.work_type ||
      params.salary_min ||
      params.salary_max ||
      params.industry
    );
  }, [params]);

  const clearFilters = () => {
    setParams({
      ...params,
      workplace_type: "",
      work_type: "",
      salary_min: "",
      salary_max: "",
      industry: "",
    });
  };

  return (
    <section
      dir="rtl"
      className="w-full rounded-2xl border border-secondGray bg-white p-5 mt-5 shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-[auto_20%_20%] gap-4">
        {/* Search */}
        <div className="relative">
          <BriefcaseIcon className="absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
          <input
            value={params.search}
            onChange={(e) => setParams({ ...params, search: e.target.value })}
            placeholder="المسمى الوظيفي أو الكلمات المفتاحية"
            className="h-12 w-full rounded-xl border border-secondGray pr-10 pl-4 text-right outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Location */}
        <div className="relative">
          <MapPinIcon className="absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
          <input
            value={params.location}
            onChange={(e) => setParams({ ...params, location: e.target.value })}
            placeholder="الموقع"
            className="h-12 w-full rounded-xl border border-secondGray pr-10 pl-4 text-right outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Toggle Filters */}
        <button
          type="button"
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex items-center justify-center gap-2 rounded-xl border border-secondGray px-4 h-12 text-slate-700 hover:bg-slate-50 hover:cursor-pointer transition"
        >
          {showFilters ? (
            <>
              <XMarkIcon className="h-5 w-5" />
              <span>إلغاء التصفية</span>
            </>
          ) : (
            <>
              <FunnelIcon className="h-5 w-5" />
              <span>تصفية</span>
              {hasActiveFilters && (
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-blue-600"></span>
              )}
            </>
          )}
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-base">
              خيارات التصفية
            </h3>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
            >
              مسح
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* workplace_type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                نمط العمل
              </label>
              <div className="relative">
                <ComputerDesktopIcon className="absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                <select
                  value={params.workplace_type}
                  onChange={(e) =>
                    setParams({ ...params, workplace_type: e.target.value })
                  }
                  className="h-12 w-full rounded-xl border border-secondGray bg-white pr-10 pl-4 text-right text-slate-900 outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:cursor-pointer"
                >
                  <option value="">اختر نمط العمل</option>
                  <option value="onsite">حضوري</option>
                  <option value="remote">عن بعد</option>
                  <option value="hybrid">هجين</option>
                </select>
              </div>
            </div>

            {/* work_type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                نوع العمل
              </label>
              <div className="relative">
                <BriefcaseIcon className="absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                <select
                  value={params.work_type}
                  onChange={(e) =>
                    setParams({ ...params, work_type: e.target.value })
                  }
                  className="h-12 w-full rounded-xl border border-secondGray bg-white pr-10 pl-4 text-right text-slate-900 outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:cursor-pointer"
                >
                  <option value="">اختر نوع العمل</option>
                  <option value="full_time">كلي</option>
                  <option value="part_time">جزئي</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>

            {/* industry */}
            {/*    <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                الصناعة / المجال
              </label>
              <div className="relative">
                <BuildingOffice2Icon className="absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  value={params.industry}
                  onChange={(e) =>
                    setParams({ ...params, industry: e.target.value })
                  }
                  placeholder="مثال: تقنية المعلومات"
                  className="h-12 w-full rounded-xl border border-secondGray bg-white pr-10 pl-4 text-right outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
 */}
            {/* salary_min */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                أقل راتب
              </label>
              <div className="relative">
                <CurrencyDollarIcon className="absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="number"
                  min="0"
                  value={params.salary_min}
                  onChange={(e) =>
                    setParams({ ...params, salary_min: e.target.value })
                  }
                  placeholder="أدخل أقل راتب"
                  className="h-12 w-full rounded-xl border border-secondGray bg-white pr-10 pl-4 text-right outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* salary_max */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                أعلى راتب
              </label>
              <div className="relative">
                <CurrencyDollarIcon className="absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="number"
                  min="0"
                  value={params.salary_max}
                  onChange={(e) =>
                    setParams({ ...params, salary_max: e.target.value })
                  }
                  placeholder="أدخل أعلى راتب"
                  className="h-12 w-full rounded-xl border border-secondGray bg-white pr-10 pl-4 text-right outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
