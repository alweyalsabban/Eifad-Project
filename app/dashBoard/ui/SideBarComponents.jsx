"use client";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import { NamePageContex } from "../(JobSeekerModel)/context/NamePageContext";
import SmSidebar from "./SmSidebar";
import { useRouter } from "next/navigation";
import { IoArrowForward } from "react-icons/io5";

function SideBarComponents({ child }) {
  const router = useRouter();
  const {
    nameOfSideBar,
    setnameOfSideBar,
    numberOfSideBar,
    setnumberOfSideBar,
    showBackBtn,
  } = useContext(NamePageContex);

  return (
    <div className="flex ">
      <div>
        <Sidebar
          setName={setnameOfSideBar}
          numberOfSideBar={numberOfSideBar}
          setnumberOfSideBar={setnumberOfSideBar}
        />
        <SmSidebar
          setName={setnameOfSideBar}
          numberOfSideBar={numberOfSideBar}
          setnumberOfSideBar={setnumberOfSideBar}
        />
      </div>

      <div className="cusContaner mr-10">
        <div className="flex items-center justify-between w-[97%] m-auto gap-15">
          <div className="flex items-center gap-6">
            <div className="w-2 h-10 bg-[#155DFC]"></div>
            <h1 className="text-2xl font-bold">{nameOfSideBar}</h1>
          </div>
          {showBackBtn && (
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition"
            >
              <span>رجوع</span>
              <IoArrowForward size={18} />
            </button>
          )}
        </div>
        <div className=" w-[97%] m-auto h-1 border-b border-secondGray mt-8 "></div>
        {child}
      </div>
    </div>
  );
}

export default SideBarComponents;
