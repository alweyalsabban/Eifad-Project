function loading() {
  return (
    <div className="flex gap-2 w-full animate-pulse ">
      <div className="w-[40%]">
        <div className="bg-gray-100  h-70 rounded-xl flex flex-col gap-3 px-10 py-4 mt-4 animate-pulse"></div>
        <div className="bg-gray-100  h-70 rounded-xl flex flex-col gap-3 px-10 py-4 mt-4 animate-pulse"></div>
      </div>

      <div
        dir="rtl"
        className="bg-gray-100 w-[60%] h-100 rounded-2xl p-6 mt-3 animate-pulse"
      ></div>
    </div>
  );
}

export default loading;
