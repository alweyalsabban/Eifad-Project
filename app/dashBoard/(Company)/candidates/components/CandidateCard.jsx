import Image from "next/image";
import { FiEye, FiPhone, FiMail, FiCheck, FiX } from "react-icons/fi";
import { ApiFetchServer } from "../../../../lib/ApiFetchServer";
import { toast } from "react-toastify";

const statusLabel = {
  Pending: "جديد",
  Hired: "مقبول",
  Rejected: "مرفوض",
};

const statusClass = {
  Pending: "bg-blue-100 text-blue-700",
  Hired: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function CandidateCard({
  application,
  onViewProfile,
  setApplications,
}) {
  async function Action(isAccespit) {
    const res = await ApiFetchServer(
      `/employer/applications/${application.ApplicationID}/status`,
      "PUT",
      {
        status: isAccespit ? "Hired" : "Rejected",
      },
    );

    const res2 = await ApiFetchServer(
      `/employer/jobs/${application.JobAdID}/applications`,
    );

    setApplications(res2.dataResponse.data);
    if (isAccespit) {
      toast.success("تم قبول الموظف");
    } else {
      toast.success("تم رفض الموظف");
    }
  }

  return (
    <div
      dir="rtl"
      className="rounded-2xl border border-slate-200 bg-white p-6 mt-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl shrink-0">
            {application.job_seeker.PersonalPhoto.length > 40 ? (
              <Image
                alt="photo profile"
                src={application.job_seeker.PersonalPhoto}
                width={300}
                height={300}
                className=" rounded-full w-14 h-14 object-cover"
              />
            ) : (
              <div></div>
            )}
          </div>

          <div>
            <h3 className="font-bold text-lg text-slate-900">
              {application?.job_seeker?.user?.FullName ?? "بدون اسم"}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              {application?.job_seeker?.ProfileSummary ?? "بدون اسم"}
            </p>

            <div className="mt-3 flex flex-wrap gap-4 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <FiPhone />
                {application?.JobSeekerPhone ?? "لا يوجد"}
              </div>

              <div className="flex items-center gap-1">
                <FiMail />
                {application?.job_seeker?.user?.Email ?? "لا يوجد بريد"}
              </div>

              <div>{application?.job_seeker?.Location ?? "لا يوجد عنوان"}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {application.MatchScore !== undefined &&
            application.MatchScore !== null && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold">
                {application.MatchScore}%
              </span>
            )}

          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold ${
              statusClass[application?.Status] ?? "bg-slate-100 text-slate-600"
            }`}
          >
            {statusLabel[application?.Status] ?? application?.Status}
          </span>
        </div>
      </div>

      {application?.ai_match?.notes && (
        <div className="mt-4 rounded-xl bg-purple-50 p-4 text-sm text-purple-700">
          {application.ai_match.notes}
        </div>
      )}

      <div className="border-t mt-5 pt-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onViewProfile}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <FiEye />
            عرض السيرة الذاتية
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {status !== "Hired" && (
            <button
              type="button"
              onClick={() => Action(true)}
              className="border border-green-300 text-green-600 px-3 py-2 rounded-lg hover:bg-green-50 hover:cursor-pointer"
              title="قبول"
            >
              <FiCheck />
            </button>
          )}

          {status !== "Rejected" && (
            <button
              type="button"
              onClick={() => Action(false)}
              className="border border-red-300 text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 hover:cursor-pointer"
              title="رفض"
            >
              <FiX />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
