import {
  FiEye,
  FiPhone,
  FiMail,
  FiDownload,
  FiCheck,
  FiX,
  FiStar,
  FiCalendar,
  FiClipboard,
  FiAward,
} from "react-icons/fi";

function getCandidate(application) {
  return (
    application?.job_seeker ??
    application?.JobSeeker ??
    application?.candidate ??
    application?.user ??
    application
  );
}

function getCandidateName(application) {
  const c = getCandidate(application);
  return (
    c?.FullName ??
    c?.full_name ??
    application?.JobSeekerName ??
    application?.job_seeker_name ??
    "مرشح بدون اسم"
  );
}

function getStatus(application) {
  return application?.Status ?? application?.status ?? "Pending";
}

const statusLabel = {
  Pending: "جديد",
  Reviewed: "تمت المراجعة",
  Shortlisted: "مختصر",
  Interviewing: "مقابلة",
  Offered: "عرض",
  Hired: "مقبول",
  Rejected: "مرفوض",
};

const statusClass = {
  Pending: "bg-blue-100 text-blue-700",
  Reviewed: "bg-slate-100 text-slate-700",
  Shortlisted: "bg-purple-100 text-purple-700",
  Interviewing: "bg-orange-100 text-orange-700",
  Offered: "bg-amber-100 text-amber-700",
  Hired: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function CandidateCard({
  application,
  onViewProfile,
  onAccept,
  onReject,
  onReview,
  onShortlist,
  onInterview,
  onOffer,
}) {
  const candidate = getCandidate(application || {});
  const status = getStatus(application);
  const name = getCandidateName(application);

  const email =
    candidate?.Email ?? candidate?.email ?? application?.JobSeekerEmail ?? "-";

  const phone =
    candidate?.Phone ?? candidate?.phone ?? application?.JobSeekerPhone ?? "-";

  const location =
    candidate?.Location ??
    candidate?.location ??
    application?.JobSeekerAddress ??
    "-";

  const summary =
    candidate?.ProfileSummary ??
    candidate?.profile_summary ??
    application?.AboutMe ??
    application?.notes ??
    "لا يوجد ملخص.";

  const aiScore =
    application?.ai_match_score ??
    application?.match_score ??
    application?.AI_MatchScore;

  const cvUrl =
    application?.cv_url ??
    application?.CVUrl ??
    application?.cv_path ??
    application?.CVPath ??
    application?.cv;

  return (
    <div
      dir="rtl"
      className="rounded-2xl border border-slate-200 bg-white p-6 mt-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl shrink-0">
            👤
          </div>

          <div>
            <h3 className="font-bold text-lg text-slate-900">{name}</h3>
            <p className="text-gray-500 text-sm mt-1">{summary}</p>

            <div className="mt-3 flex flex-wrap gap-4 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <FiPhone />
                {phone}
              </div>

              <div className="flex items-center gap-1">
                <FiMail />
                {email}
              </div>

              <div>{location}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {aiScore !== undefined && aiScore !== null && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold">
              AI {aiScore}%
            </span>
          )}

          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold ${
              statusClass[status] ?? "bg-slate-100 text-slate-600"
            }`}
          >
            {statusLabel[status] ?? status}
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
            عرض الملف
          </button>

          {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 text-slate-600 hover:bg-slate-50"
            >
              <FiDownload />
              تحميل CV
            </a>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {status !== "Reviewed" && (
            <button
              type="button"
              onClick={onReview}
              className="border border-slate-300 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-50"
              title="تمت المراجعة"
            >
              <FiClipboard />
            </button>
          )}

          {status !== "Shortlisted" && (
            <button
              type="button"
              onClick={onShortlist}
              className="border border-purple-300 text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-50"
              title="اختصار"
            >
              <FiStar />
            </button>
          )}

          {status !== "Interviewing" && (
            <button
              type="button"
              onClick={onInterview}
              className="border border-orange-300 text-orange-600 px-3 py-2 rounded-lg hover:bg-orange-50"
              title="مقابلة"
            >
              <FiCalendar />
            </button>
          )}

          {status !== "Offered" && (
            <button
              type="button"
              onClick={onOffer}
              className="border border-amber-300 text-amber-600 px-3 py-2 rounded-lg hover:bg-amber-50"
              title="عرض"
            >
              <FiAward />
            </button>
          )}

          {status !== "Hired" && (
            <button
              type="button"
              onClick={onAccept}
              className="border border-green-300 text-green-600 px-3 py-2 rounded-lg hover:bg-green-50"
              title="قبول"
            >
              <FiCheck />
            </button>
          )}

          {status !== "Rejected" && (
            <button
              type="button"
              onClick={onReject}
              className="border border-red-300 text-red-500 px-3 py-2 rounded-lg hover:bg-red-50"
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
