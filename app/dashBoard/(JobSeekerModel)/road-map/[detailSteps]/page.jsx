"use client";
import JobDescriptionCard from "../../search-job/components/JobDescriptionCard";
import JobRequirementsCard from "../../search-job/components/JobRequirementsCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RoadMapFuncation } from "../../callFunctionsForJobseeker";
import CreateTitle from "../../CreateTitle";
function DeatilStap() {
  const path = useParams();
  const [RoadMap, setRoadMap] = useState(null);

  useEffect(() => {
    async function FetchData() {
      const res = await RoadMapFuncation("GetPreRoadMap");
      setRoadMap(res.milestones[path.detailSteps - 1]);
    }
    FetchData();
  }, []);
  return (
    <div>
      <CreateTitle title="تفاصيل الخطوة" number={8} />

      <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 mt-5">
        <h3 className="text-right text-lg font-semibold text-slate-900">
          {RoadMap?.title}
        </h3>
      </section>

      <JobRequirementsCard
        title={"يجب أن تتعلم"}
        requirements={RoadMap?.skills_to_learn}
      />
      <JobRequirementsCard
        title={"خطوات تفصيلية "}
        requirements={RoadMap?.actions}
      />
    </div>
  );
}

export default DeatilStap;
