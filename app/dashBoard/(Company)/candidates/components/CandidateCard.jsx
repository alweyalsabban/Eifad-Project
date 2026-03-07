import {
  FiEye,
  FiPhone,
  FiMail,
  FiDownload,
  FiMessageSquare,
  FiCheck,
  FiX,
} from "react-icons/fi";

export default function CandidateCard({ status = "pending" }) {
  const accepted = status === "accepted";

  const skills = ["React", "Node.js", "TypeScript", "AWS"];

  return (
    <div
      dir="rtl"
      className="rounded-2xl border border-slate-200 bg-white p-6 mt-5"
    >
      {/* top */}
      <div className="flex justify-between items-start">
        {/* user */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl">
            👨‍💻
          </div>

          <div>
            <h3 className="font-bold text-lg">أحمد محمد علي</h3>

            <p className="text-gray-500 text-sm">Senior Software Engineer</p>

            <p className="text-gray-500 text-sm">الرياض • 5 سنوات</p>
          </div>
        </div>

        {/* score */}
        <div className="flex flex-col items-start gap-2">
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm">
            92%
          </div>

          <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
            جديد
          </span>
        </div>
      </div>

      {/* skills */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="border-t mt-5 pt-4 flex justify-between items-center">
        {/* contact */}
        <div className="flex items-center gap-6 text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <FiPhone />
            +966 50 123 4567
          </div>

          <div className="flex items-center gap-1">
            <FiMail />
            ahmed@example.com
          </div>
        </div>

        {/* actions */}
        <div className="flex items-center gap-3">
          {accepted ? (
            <>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2">
                <FiEye />
                عرض الملف
              </button>

              <button className="bg-orange-500 text-white px-5 py-2 rounded-lg">
                إختبار فني
              </button>

              <button className="border border-blue-300 text-blue-600 p-2 rounded-lg">
                <FiMessageSquare />
              </button>

              <button className="border border-gray-300 p-2 rounded-lg">
                <FiDownload />
              </button>
            </>
          ) : (
            <>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2">
                <FiEye />
                عرض الملف
              </button>

              <button className="border border-red-300 text-red-500 p-2 rounded-lg">
                <FiX />
              </button>

              <button className="border border-green-300 text-green-600 p-2 rounded-lg">
                <FiCheck />
              </button>

              <button className="border border-gray-300 p-2 rounded-lg">
                <FiDownload />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
