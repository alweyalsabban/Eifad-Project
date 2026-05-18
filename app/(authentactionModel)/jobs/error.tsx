"use client"; // هذا السطر ضروري جداً

import Link from "next/link";

// هذا هو التايب الخاص ببروبس صفحة الخطأ في Next.js
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void; // دالة لإعادة محاولة رندرة المكون
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        {/* أيقونة الخطأ - بسيطة وبصرية */}
        <div className="flex justify-center mb-8">
          <div className="rounded-full bg-red-100 p-6 flex items-center justify-center">
            <svg
              className="h-20 w-20 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>

        {/* عنوان رئيسي واضح */}
        <h1 className="text-4xl font-extrabold text-gray-950 mb-4 tracking-tight">
          عذرًا، حدث خطأ ما!
        </h1>

        {/* نص توضيحي هادئ */}
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          نواجه مشكلة فنية غير متوقعة في تحميل هذه الصفحة. نحن نعتذر عن الإزعاج.
        </p>

        {/* عرض رسالة الخطأ للمطورين (اختياري، يمكن إخفاؤه في الإنتاج) */}
        {process.env.NODE_ENV === "development" && (
          <div className="bg-gray-100 p-4 rounded-lg text-right mb-8 border border-gray-200">
            <p className="text-xs text-gray-500 font-mono">
              <strong className="text-red-700">تفاصيل المطور:</strong>
              <br />
              {error.message || "خطأ غير معروف"}
              {error.digest && (
                <>
                  <br />
                  Digest: {error.digest}
                </>
              )}
            </p>
          </div>
        )}

        {/* أزرار الإجراءات */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* زر إعادة المحاولة - مفيد جداً في حالات فشل الـ API المؤقتة */}
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out shadow-sm"
          >
            <svg
              className="w-5 h-5 mr-2 -ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            إعادة المحاولة
          </button>

          {/* زر العودة للصفحة الرئيسية */}
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out shadow-sm"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
