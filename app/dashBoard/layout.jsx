"use client";
import React from "react";
import Sidebar from "./ui/Sidebar";
import Header from "./ui/Header";
import { useContext } from "react";
import { NamePageContex } from "../dashBoard/(JobSeekerModel)/context/NamePageContext";
import SmHeader from "./ui/SmHeader";
import SmSidebar from "./ui/SmSidebar";

function MainPage({ children }) {
  const {
    nameOfSideBar,
    setnameOfSideBar,
    numberOfSideBar,
    setnumberOfSideBar,
  } = useContext(NamePageContex);

  return (
    <main className="" dir="rtl">
      <span className="hidden md:block ">
        <Header />
      </span>
      <span className="block md:hidden  w-[85%] m-auto">
        <SmHeader />
      </span>

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
          {children}
        </div>
      </div>
    </main>
  );
}
export default MainPage;
