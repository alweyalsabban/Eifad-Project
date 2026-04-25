"use client";

import { FiX, FiMail, FiPhone, FiMapPin, FiDownload } from "react-icons/fi";

function getCandidate(application) {
  return (
    application?.job_seeker ??
    application?.JobSeeker ??
    application?.candidate ??
    application?.user ??
    application
  );
}

export default function CandidateProfileModal({ application, onClose }) {
  const candidate = getCandidate(application || {});

  const name =
    candidate?.FullName ??
    candidate?.full_name ??
    application?.JobSeekerName ??
    "مرشح بدون اسم";

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
    "لا يوجد ملخص.";

  const cvUrl =
    application?.cv_url ??
    application?.CVUrl ??
    application?.cv_path ??
    application?.CVPath ??
    application?.cv;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/30 p-4 backdrop-blur-sm">
      <div
        dir="rtl"
        className="mt-10 w-full max-w-3xl rounded-3xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl">
              👤
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">{name}</h2>
              <p className="mt-1 text-slate-500">ملف المتقدم</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
          >
            <FiX />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <FiMail className="mb-2 text-blue-600" />
            <p className="text-xs text-slate-400">الإيميل</p>
            <p className="text-sm text-slate-700">{email}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <FiPhone className="mb-2 text-blue-600" />
            <p className="text-xs text-slate-400">الهاتف</p>
            <p className="text-sm text-slate-700">{phone}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <FiMapPin className="mb-2 text-blue-600" />
            <p className="text-xs text-slate-400">الموقع</p>
            <p className="text-sm text-slate-700">{location}</p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 p-5">
          <h3 className="mb-2 text-lg font-bold text-slate-900">
            نبذة عن المتقدم
          </h3>
          <p className="leading-8 text-slate-600">{summary}</p>
        </div>

        {application?.ai_match && (
          <div className="mt-5 rounded-2xl border border-purple-200 bg-purple-50 p-5">
            <h3 className="mb-2 text-lg font-bold text-purple-800">تحليل AI</h3>

            <pre className="whitespace-pre-wrap text-sm leading-7 text-purple-700">
              {JSON.stringify(application.ai_match, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-5 flex justify-end gap-3">
          {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              className="rounded-xl bg-blue-600 px-5 py-3 text-white flex items-center gap-2 hover:bg-blue-700"
            >
              <FiDownload />
              تحميل السيرة الذاتية
            </a>
          )}

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-slate-600 hover:bg-slate-50"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
