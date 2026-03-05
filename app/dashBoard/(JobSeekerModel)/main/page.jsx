"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
import InfoCard from "./components/InfoCard";
import { InfoCardMain, InfoCardAction } from "./data";
import RecommedAI from "./components/RecommedAI";
import ActionCard from "./components/ActionCard";
import QuckliyAction from "./components/QuckliyAction";
import { RecommedJobs } from "./data";

function MainDashBorad() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("لوحة التحكم");
    setnumberOfSideBar(1);
  }, [setnameOfSideBar, setnumberOfSideBar]);

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4  gap-2 mt-5 justify-between mr-3 flex-wrap w-[98%]">
        {InfoCardMain.map((i) => {
          return (
            <InfoCard
              key={i.id}
              icons={i.icons}
              number={i.number}
              name={i.name}
            />
          );
        })}
      </div>
      <RecommedAI />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4  gap-2 mt-5 justify-between   mr-3 flex-wrap w-[98%]">
        {InfoCardAction.map((i) => {
          return <ActionCard key={i.id} icons={i.icons} name={i.name} />;
        })}
      </div>
      <div className="mt-5 block w-[95%] m-auto gap-4 justify-between md:flex mb-40">
        <QuckliyAction name={"الوظائف الموصى بها"} NameData={RecommedJobs} />
        <QuckliyAction name={"الطلبات الأخيرة"} NameData={RecommedJobs} />
      </div>
    </section>
  );
}

export default MainDashBorad;
