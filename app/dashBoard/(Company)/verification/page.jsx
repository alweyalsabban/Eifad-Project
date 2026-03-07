"use client";
import VerificationAlert from "./components/VerificationAlert";
import AiVerificationCard from "./components/AiVerificationCard";
import RequiredDocumentsCard from "./components/RequiredDocumentsCard";
import ActivityTimelineCard from "./components/ActivityTimelineCard";
import { useContext, useEffect } from "react";
import { NamePageContex } from "../../(JobSeekerModel)/context/NamePageContext";

const documents = [
  {
    id: 1,
    name: "السجل التجاري",
    statusText: "تم التحقق",
  },
  {
    id: 2,
    name: "شهادة الضريبة",
    statusText: "تم التحقق",
  },
  {
    id: 3,
    name: "رخصة الشركة",
    statusText: "تم التحقق",
  },
];

const activities = [
  {
    id: 1,
    title: "تم تقديم المستندات",
    date: "2024-02-05 10:30 AM",
  },
  {
    id: 2,
    title: "تم الموافقة على السجل",
    date: "2024-02-05 10:30 AM",
  },
];

function Verification() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("حالة التحقق");
    setnumberOfSideBar(7);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return (
    <section className="mx-auto w-[98%]  space-y-5 mb-40">
      <VerificationAlert />
      {/*       <AiVerificationCard progress={95} />
       */}{" "}
      <RequiredDocumentsCard documents={documents} />
      <ActivityTimelineCard activities={activities} />
    </section>
  );
}

export default Verification;
