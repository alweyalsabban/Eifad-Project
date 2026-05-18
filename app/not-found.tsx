import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-[80vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      dir="rtl"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl pointer-events-none -z-10">
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDuration: "5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-64 h-64 sm:w-80 sm:h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDuration: "6s" }}
        ></div>
      </div>

      <div className="max-w-lg w-full text-center backdrop-blur-sm bg-white/40 dark:bg-gray-900/40 p-8 sm:p-12 rounded-[2rem] shadow-2xl border border-white/30 dark:border-gray-700/30">
        <div className="relative inline-block mb-8">
          <h1 className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 drop-shadow-sm">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-5 py-2 text-sm sm:text-base font-bold rounded-full shadow-lg border border-gray-100 dark:border-gray-700 -rotate-6 text-gray-800 dark:text-gray-200 whitespace-nowrap">
            الصفحة غير موجودة
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            عذراً، لقد فقدت طريقك!
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو حذفها أو ربما لم تكن
            موجودة من الأساس. دعنا نعود إلى بر الأمان.
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base sm:text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 overflow-hidden"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-64 group-hover:h-56 opacity-10"></span>
            <span className="relative flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              العودة للصفحة الرئيسية
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
