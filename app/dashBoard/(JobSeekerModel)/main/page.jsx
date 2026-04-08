import InfoCard from "./components/InfoCard";
import { InfoCardMain, InfoCardAction } from "./data";
import RecommedAI from "./components/RecommedAI";
import ActionCard from "./components/ActionCard";
import QuckliyAction from "./components/QuckliyAction";
import { RecommedJobs } from "./data";
import { ApiFetchServer } from "../../../lib/ApiFetchServer";
import CreateTitle from "../CreateTitle";
import Link from "next/link";

async function MainDashBorad() {
  const data = await ApiFetchServer("/profile/statistics");

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
        title={"توصيات الذكاء الاصطناعي "}
        description={`لديك 23 وظيفة بمطابقة عالية (90%+) تنتظرك!`}
        textBtn={"عرض الوظائف"}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4  gap-2 mt-5 justify-between   mr-3 flex-wrap w-[98%]">
        {InfoCardAction.map((i) => {
          return (
            <Link key={i.id} href={i.link}>
              <ActionCard icons={i.icons} name={i.name} />
            </Link>
          );
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
