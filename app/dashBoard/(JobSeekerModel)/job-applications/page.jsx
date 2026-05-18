"use client";
import { useEffect, useState } from "react";
import CreateTitle from "../CreateTitle";
import ApplicationCard from "./components/ApplicationCard";
import { JobApplication } from "../callFunctionsForJobseeker";
import LoaderTwo from "../components/LoaderTwo";

function JobApplications() {
  const [AllApplication, setAllAplications] = useState([]);
  const [loading, setLoading] = useState(true);
  async function GetAllApplication() {
    setLoading(true);
    const res = await JobApplication("GetAllApplications");
    setAllAplications(res?.dataResponse?.data || []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    GetAllApplication();
  }, []);

  function handleWithdrawSuccess(applicationId) {
    setAllAplications((prev) =>
      prev.filter((item) => item.ApplicationID !== applicationId),
    );
  }
  return (
    <>
      <CreateTitle title="متابعة الطلبات" number={7} />

      <h1 className="text-secondColorBlack text-l font-bold w-[90%] m-auto mt-5">
        {AllApplication?.length} طلبات
      </h1>
      {loading ? (
        <div className="items-center justify-center flex mt-30">
          <LoaderTwo />
        </div>
      ) : AllApplication?.length > 0 ? (
        <div className="mb-40">
          {AllApplication.map((item, index) => {
            return (
              <ApplicationCard
                applicationId={item.ApplicationID}
                key={index}
                title={item?.job_ad?.Title}
                company={item?.job_ad?.company?.CompanyName}
                date={item?.AppliedAt.slice(0, 10)}
                statusLabel={item?.Status}
                statusVariant="info"
                currentStep={item?.Status}
                showWithdraw={true}
                onWithdrawSuccess={handleWithdrawSuccess}
              />
            );
          })}

          {/*   <ApplicationCard
          title="مصمم واجهات"
          company="Microsoft"
          date="28-01-2024"
          statusLabel="مقبول"
          statusVariant="success"
          currentStep="قرار"
        /> */}
        </div>
      ) : (
        <h1 className="mt-10 mr-10"> لا يوجد مظائف تم التقدم لها</h1>
      )}
    </>
  );
}

export default JobApplications;
