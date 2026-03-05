function TrendingJobs() {
  return (
    <div className="w-[98%] m-auto mt-5 rounded-2xl border border-gray-200 p-6">
      {/* title */}
      <h2 className="mb-6 text-lg font-semibold text-gray-800">
        الوظائف الأكثر رواجًا
      </h2>

      {/* job card */}
      <div className="mb-8 rounded-xl bg-linear-to-r from-blue-100 to-green-100 p-6">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-gray-800">
            مهندس ذكاء اصطناعي
          </h3>

          <p className="text-sm text-gray-600">
            متوسط الراتب: <span className="font-medium">35,000 ر.س</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrendingJobs;
