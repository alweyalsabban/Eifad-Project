"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
import ApplicationCard from "./components/ApplicationCard";
function JobApplication() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("متابعة الطلبات");
    setnumberOfSideBar(7);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return (
    <>
      <h1 className="text-secondColorBlack text-l font-bold w-[90%] m-auto mt-5">
        4 طلبات
      </h1>
      <div className="mb-40">
        <ApplicationCard
          title="مهندس برمجيات أول"
          company="Google"
          date="01-02-2024"
          statusLabel="مقابلة"
          statusVariant="info"
          currentStep="مقابلة"
          showWithdraw={true}
          onWithdraw={() => console.log("withdraw")}
        />
        <ApplicationCard
          title="مصمم واجهات"
          company="Microsoft"
          date="28-01-2024"
          statusLabel="مقبول"
          statusVariant="success"
          currentStep="قرار"
        />
      </div>
    </>
  );
}

export default JobApplication;
