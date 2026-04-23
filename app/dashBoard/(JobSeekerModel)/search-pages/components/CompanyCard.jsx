"use client";
import { FiMapPin } from "react-icons/fi";
import Link from "next/link";
import { Companies } from "../../callFunctionsForJobseeker";
import { useEffect, useState } from "react";
import LoaderTwo from "../../components/LoaderTwo";
import { toast } from "react-toastify";
export default function CompanyCard({
  name,
  city,
  companyId,
  logoText = "G",
  AllFollowPage,
  setAllFollowPage,
  AllConmpnies,
}) {
  const [page, setPage] = useState(null);
  useEffect(() => {
    const isFollow = AllFollowPage.some((item) => item.CompanyID === companyId);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(isFollow);
  }, [AllFollowPage, companyId]);

  const [loading, setLoadign] = useState(false);
  async function onFollow() {
    setLoadign(true);

    if (page) {
      const res = await Companies("UnFollowPage", { companyId });
      const newFolowPages = AllFollowPage.filter((item) => {
        return item.CompanyID !== companyId;
      });
      setAllFollowPage(newFolowPages);
      if (res.isSusses) {
        setPage(false);
        toast.success("تم إلغاء المتابعة");
      }
    } else {
      const res = await Companies("FollowPage", { companyId });
      const newFollow = AllConmpnies.find(
        (item) => item.CompanyID === companyId,
      );
      setAllFollowPage([...AllFollowPage, newFollow]);
      if (res.isSusses) {
        setPage(true);
        toast.success("تم المتابعة");
      }
    }

    setLoadign(false);
  }

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-5 mt-5">
      <div className="flex flex-wrap items-center gap-4">
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

        <div className="flex items-center gap-3 ms-auto mt-3 md:mt-0">
          <Link href={`/dashBoard/search-pages/${companyId}`}>
            <button
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition
             hover:bg-blue-700 hover:cursor-pointer"
            >
              التفاصيل
            </button>
          </Link>

          <button
            onClick={onFollow}
            disabled={loading}
            className="rounded-xl bg-green-100 px-5 py-2.5 text-sm font-semibold text-green-700 flex items-center justify-center

            transition hover:bg-green-200 hover:cursor-pointer"
          >
            {loading ? (
              <LoaderTwo colorLoading="fill-green-500" />
            ) : page ? (
              "إلغاء المتابعة"
            ) : (
              "متابعة"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
