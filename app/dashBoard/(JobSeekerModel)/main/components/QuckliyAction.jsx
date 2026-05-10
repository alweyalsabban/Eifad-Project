import Link from "next/link";
import JobsList from "./JobsList";
export default function QuckliyAction({
  name,
  Data,
  isApplication = false,
  href = "",
}) {
  return (
    <div
      className="w-full mb-4 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 flex-wrap"
      dir="ltr"
    >
      <div className="flex items-center justify-between">
        <Link
          href={href}
          className="text-sm text-blue-600 hover:underline hover:cursor-pointer"
        >
          عرض الكل
        </Link>

        <h1 className="text-lg font-bold text-slate-900">{name}</h1>
      </div>

      <div className="space-y-3">
        {Data?.map((r) => (
          <Link
            href={
              isApplication
                ? "/dashBoard/job-applications"
                : `/dashBoard/search-job/${r?.JobAdID}`
            }
            key={r?.JobAdID}
          >
            <JobsList
              status={r?.Status}
              title={isApplication ? r?.job_ad?.Title : r?.Title}
              company={r?.job_ad?.company?.CompanyName}
              timeAgo={r?.ExpiryDate?.slice(0, 10)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
