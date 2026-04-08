import BasicInfoCard from "./components/BasicInfoCard";
/* import ProfileStatsCard from "./components/ProfileStatsCard";*/
import ProfileCompletionCard from "./components/ProfileCompletionCard";

import CreateTitle from "../CreateTitle";
import { ApiFetchServer } from "../../../lib/ApiFetchServer";

async function ProfilePage() {
  const data = await ApiFetchServer("/profile");
  const anathorDataForProfile = await ApiFetchServer("/auth/me");
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-[30%_70%] m-auto w-[98%] justify-between mt-5 gap-2"
      dir="ltr"
    >
      <CreateTitle title="الملف الشخصي" number={2} />

      <div className="space-y-3 " dir="rtl">
        {/*         <ProfileStatsCard views={342} contacts={156} rating={4.8} />
         */}
        <ProfileCompletionCard />
      </div>
      <div dir="rtl">
        <BasicInfoCard
          dataProfile={data.dataResponse.data}
          anathorData={anathorDataForProfile.dataResponse.data}
        />
      </div>
    </section>
  );
}

export default ProfilePage;
