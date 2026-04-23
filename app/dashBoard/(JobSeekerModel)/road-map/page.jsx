import TaskProgressCard from "./components/TaskProgressCard";
import SmartRecommendationsBanner from "../recommed-job/components/SmartRecommendationsBanner";
import CreateTitle from "../CreateTitle";
function RoadMap() {
  return (
    <>
      <CreateTitle title="خارطة الطريق المهنية" number={8} />

      <div className="w-[98%] m-auto">
        <SmartRecommendationsBanner />
      </div>
      <div className="mb-40">
        <TaskProgressCard />
      </div>
    </>
  );
}

export default RoadMap;
