import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import AiScoreCard from "./components/AiScoreCard";
import InsightListCard from "./components/InsightListCard";
import SkillGapCard from "./components/SkillGapCard";
import CreateTitle from "../CreateTitle";
import { ApiFetchServer } from "../../../lib/ApiFetchServer";
import CvAnalysisPdfReport from "./components/DownloadCvAnalysisPdf";

async function AnalaizeCv() {
  const cvInfo = await ApiFetchServer("/cvs");
  const res = await ApiFetchServer(
    `/cvs/${cvInfo.dataResponse.data[0].CVID}/analyze`,
    "POST",
  );
  const data = await res.dataResponse.data;
  return (
    <>
      <CreateTitle title="تحليل السيرة الذاتية" number={4} />

      <AiScoreCard score={data.scores.overall} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InsightListCard
          title="نقاط القوة"
          variant="success"
          items={data.strengths}
        />
        <InsightListCard
          title="نقاط التحسين"
          variant="warning"
          items={data.weaknesses}
        />
      </div>
      <SkillGapCard items={data.gaps} />
      <CvAnalysisPdfReport data={data} />
      {/*   <button
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 text-white text-sm 
      font-medium hover:bg-blue-700 transition mt-5 mb-15 hover:cursor-pointer"
      >
        <span>تحميل تقرير التحليل (PDF)</span>
        <ArrowDownTrayIcon className="h-5 w-5" />
      </button> */}
    </>
  );
}

export default AnalaizeCv;
