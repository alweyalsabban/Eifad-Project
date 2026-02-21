"use client";

import { countrys } from "../info";
import { useState } from "react";

function SearchSection() {
  const [isShow, setShow] = useState(false);
  const [city, setCity] = useState(countrys[1].name);
  return (
    <div
      className="bg-linear-to-r from-sky-50 via-white to-sky-50 h-75 "
      onClick={() => {
        setShow(false);
      }}
    >
      <div className="cusContaner m-auto flex flex-col pt-10  items-center">
        <div className="text-center flex flex-col gap-5">
          <h1 className="text-2xl font-bold">استكشف الوظائف المناسبة لك</h1>
          <h2>
            إبحث عن الوظيفة التي تريدها و أعرف تفاصيلها و بإمكانك أن تسخدم
            الفلترة
          </h2>
          <div
            className="bg-secondColorBlack rounded-2xl w-4xl h-[65] flex items-center 
          justify-between text-auxiliaryColorWhite"
            dir="rtl"
          >
            <input
              type="text"
              name=""
              id=""
              placeholder="إبحث عن وظيفة"
              autoFocus
              className=" h-[90%] rounded-2xl w-[60%] pr-5 focus:outline-none"
            />
            <h1
              className=" hover:cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShow(!isShow);
              }}
            >
              {city}
            </h1>

            <button
              className="bg-auxiliaryColorWhite text-secondColorBlack active:scale-75 duration-300 
          mx-7 w-[10%] p-2 rounded-xl hover:cursor-pointer "
            >
              إبحث
            </button>
          </div>
        </div>
        {isShow && (
          <div
            className="bg-auxiliaryColorWhite text-secondColorBlack hover:cursor-pointer 
          w-[10%]  text-center flex flex-col gap-4 rounded-b-xl mr-100 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            {countrys.map((e) => {
              return (
                <h1
                  key={e.key}
                  className="hover:bg-auxiliaryColorGray p-1 hover:rounded-xl"
                  onClick={() => {
                    setCity(e.name);
                    setShow(false);
                  }}
                >
                  {e.name}
                </h1>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchSection;
