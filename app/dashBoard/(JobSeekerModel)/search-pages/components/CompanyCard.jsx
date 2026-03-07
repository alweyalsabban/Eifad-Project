import { FiMapPin } from "react-icons/fi";
import Link from "next/link";

export default function CompanyCard({
  name = "شركة جسر",
  city = "الرياض",
  logoText = "G",
  onDetails,
  onFollow,
}) {
  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-5 mt-5">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
            {logoText}
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-900">{name}</span>

            <span className="mt-1 flex items-center gap-2 text-sm text-gray-500">
              <FiMapPin className="text-gray-400" />
              {city}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 mt-3 md:mt-0">
          <Link href={"/dashBoard/search-pages/deatil-pages"}>
            <button
              onClick={onDetails}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition
             hover:bg-blue-700 hover:cursor-pointer"
            >
              التفاصيل
            </button>
          </Link>

          <button
            onClick={onFollow}
            className="rounded-xl bg-green-100 px-5 py-2.5 text-sm font-semibold text-green-700 
            transition hover:bg-green-200 hover:cursor-pointer"
          >
            متابعة
          </button>
        </div>
      </div>
    </div>
  );
}
