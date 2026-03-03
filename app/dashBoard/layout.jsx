"use client";
import React from "react";
import Sidebar from "./ui/Sidebar";
import Header from "./ui/Header";
import { useContext } from "react";
import { NamePageContex } from "../dashBoard/(JobSeekerModel)/context/NamePageContext";

function MainPage({ children }) {
  const {
    nameOfSideBar,
    setnameOfSideBar,
    numberOfSideBar,
    setnumberOfSideBar,
  } = useContext(NamePageContex);

  return (
    <main className="flex flex-col " dir="rtl">
      <Header />

      <div>
        <div>
          <Sidebar
            setName={setnameOfSideBar}
            numberOfSideBar={numberOfSideBar}
            setnumberOfSideBar={setnumberOfSideBar}
          />
        </div>

        <div className="cusContaner m-auto">
          <div className="flex items-center gap-15">
            <div className="w-2 h-10 bg-[#155DFC] mr-6"></div>
            <h1 className="text-2xl font-bold">{nameOfSideBar}</h1>
          </div>
          <div className=" w-[97%] m-auto h-1 border-b border-secondGray mt-8"></div>
          {children}
        </div>
      </div>
    </main>
  );
}
export default MainPage;
