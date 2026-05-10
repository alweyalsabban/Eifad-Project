import InfoCard from "./components/InfoCard";
import { InfoCardMain, InfoCardAction } from "./data";
import RecommedAI from "./components/RecommedAI";
import ActionCard from "./components/ActionCard";
import QuckliyAction from "./components/QuckliyAction";
import { ApiFetchServer } from "../../../lib/ApiFetchServer";
import CreateTitle from "../CreateTitle";
import Link from "next/link";

async function MainDashBorad() {
  const data = await ApiFetchServer("/profile/statistics");
  const RecommendJob = await ApiFetchServer("/jobs/suggested");
  const JobApplay = await ApiFetchServer("/applications");

  return (
    <section>
      <CreateTitle title="لوحة التحكم" number={1} />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4  gap-2 mt-5 justify-between mr-3 flex-wrap w-[98%]">
        {InfoCardMain(data).map((i) => {
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
      <RecommedAI
        title={"أعرف توجهات السوق"}
        description={`أعرف أشهر الوظائف و المهارات في عدد من المجالات المختلفة`}
        textBtn={"استكشف"}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-2 mt-5 justify-between m-auto  flex-wrap w-[95%]">
        {InfoCardAction.map((i) => {
          return (
            <Link key={i.id} href={i.link}>
              <ActionCard icons={i.icons} name={i.name} />
            </Link>
          );
        })}
      </div>
      <div className="mt-5 block w-[95%] m-auto gap-4 justify-between md:flex mb-40">
        <QuckliyAction
          name={"الوظائف الموصى بها"}
          Data={RecommendJob?.dataResponse?.data}
          href={"/dashBoard/recommed-job"}
        />
        <QuckliyAction
          name={"الطلبات الأخيرة"}
          Data={JobApplay?.dataResponse?.data}
          isApplication={true}
          href={"/dashBoard/job-applications"}
        />
      </div>
    </section>
  );
}

export default MainDashBorad;
