"use client";

import { useState, useEffect } from "react";

function SearchSection({ setkeyword }) {
  const [inputWord, setinputWord] = useState("");

  useEffect(() => {
    if (inputWord.length < 1) {
      setkeyword("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputWord]);
  return (
    <div className="bg-linear-to-r from-sky-50 via-white to-sky-50 h-75 ">
      <div className="cusContaner m-auto flex flex-col pt-10  items-center">
        <div className="text-center flex flex-col gap-5">
          <h1 className="text-2xl font-bold">استكشف الوظائف المناسبة لك</h1>
          <h2>
            إبحث عن الوظيفة التي تريدها و أعرف تفاصيلها و بإمكانك أن تسخدم
            الفلترة
          </h2>
          <div
            className="bg-secondColorBlack rounded-2xl w-s md:w-md duration-300 xl:w-4xl h-[65] flex items-center 
          justify-between text-auxiliaryColorWhite"
            dir="rtl"
          >
            <input
              type="text"
              name=""
              value={inputWord}
              onChange={(e) => {
                setinputWord(e.target.value);
              }}
              id=""
              placeholder="إبحث عن وظيفة"
              autoFocus
              className=" h-[90%] rounded-2xl w-[60%] pr-5 focus:outline-none"
            />

            <button
              className="bg-auxiliaryColorWhite text-secondColorBlack active:scale-75 duration-300 
          mx-7 w-[10%] p-2 rounded-xl hover:cursor-pointer "
              onClick={() => {
                setkeyword(inputWord);
              }}
            >
              إبحث
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
