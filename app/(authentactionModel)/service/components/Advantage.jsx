"use client";
import React, { useState } from "react";
import NewAdvantage from "./NewAdvantage";
import { advantageForJobseeker } from "../info";
import { advantageForCompany } from "../info";

const tabs = [
  {
    key: 1,
    name: "باحث عن عمل",
  },
  {
    key: 2,
    name: "شركة",
  },
];

function Advantage() {
  const [activeTab, setactiveTab] = useState(tabs[0]);
  return (
    <section className="cusContaner m-auto my-3">
      <div
        className="bg-auxiliaryColorGray w-full   m-auto gap-5 flex justify-center 
      items-center text-center px-2 py-3 rounded-xl"
      >
        <h1
          className={`hover:cursor-pointer px-7 rounded-xl py-1 ${activeTab === tabs[1] && "bg-auxiliaryColorWhite"} `}
          onClick={() => {
            setactiveTab(tabs[1]);
          }}
        >
          شركة
        </h1>
        <h1
          className={`hover:cursor-pointer px-7 rounded-xl py-1 ${activeTab === tabs[0] && "bg-auxiliaryColorWhite"} `}
          onClick={() => {
            setactiveTab(tabs[0]);
          }}
        >
          باحث عن عمل
        </h1>
      </div>
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-5 justify-items-center">
        {activeTab == tabs[0]
          ? advantageForJobseeker.map((e, indx) => {
              return (
                <NewAdvantage
                  key={indx}
                  advantage={advantageForJobseeker[indx]}
                />
              );
            })
          : advantageForCompany.map((e, indx) => {
              return (
                <NewAdvantage
                  key={indx}
                  advantage={advantageForCompany[indx]}
                />
              );
            })}
      </div>
    </section>
  );
}

export default Advantage;
