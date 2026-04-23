"use client";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import { NamePageContex } from "../(JobSeekerModel)/context/NamePageContext";
import SmSidebar from "./SmSidebar";
function SideBarComponents({ child }) {
  const {
    nameOfSideBar,
    setnameOfSideBar,
    numberOfSideBar,
    setnumberOfSideBar,
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
        <div className="flex items-center gap-15">
          <div className="w-2 h-10 bg-[#155DFC] mr-6"></div>
          <h1 className="text-2xl font-bold">{nameOfSideBar}</h1>
        </div>
        <div className=" w-[97%] m-auto h-1 border-b border-secondGray mt-8 "></div>
        {child}
      </div>
    </div>
  );
}

export default SideBarComponents;
