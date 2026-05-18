function TrendingJobs({ jobs, salary }) {
  return (
    <div className="w-[98%] m-auto mt-5 rounded-2xl border border-gray-200 p-6 mb-10">
      {/* title */}
      <h2 className="mb-6 text-lg font-semibold text-gray-800">
        الوظائف الأكثر رواجًا
      </h2>

      {/* job card */}
      {jobs?.map((item, index) => {
        return (
          <div
            className="mb-8 rounded-xl bg-linear-to-r from-blue-100 to-green-100 p-6"
            key={index}
          >
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-gray-800">{item} </h3>

              <p className="text-sm text-gray-600">
                متوسط الراتب:
                <span className="font-medium">{salary[index]}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TrendingJobs;
