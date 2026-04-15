import type { Metadata } from "next";
import TitlePage from "./components/TitlePage";
import InfoCard from "./components/InfoCard";
import {
  AleartCardData,
  InfoCardData,
  quickActionsData,
  RecentActivitiesData,
} from "../adminData";
import AleartCard from "./components/AleartCard";
import RecentActivities from "./components/RecentActivities";
import QuickActions from "./components/QuickActions";

export const metadata: Metadata = {
  title: "لوحة التحكم",
};

function ControllPage() {
  return (
    <div className="mb-50">
      <TitlePage title="لوحة التحكم" number={1} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-[98%] justify-between m-auto mt-5">
        {InfoCardData.map((item) => {
          return (
            <InfoCard
              key={item.id}
              title={item.title}
              value={item.value}
              description={item.description}
              icon={item.icon}
              iconBg={item.iconBg}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-[98%] justify-between m-auto mt-5">
        {AleartCardData.map((item) => (
          <AleartCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
            borderColor={item.borderColor}
            iconColor={item.iconColor}
          />
        ))}
      </div>
      <div className="p-2 mt-5 grid grid-cols-1 md:grid-cols-[auto_40%] gap-5">
        <RecentActivities activities={RecentActivitiesData} />
        <QuickActions actions={quickActionsData} />
      </div>
    </div>
  );
}

export default ControllPage;
