import CreateTitle from "../CreateTitle";
import CVcomponents from "./components/CVcomponents";
import { ApiFetchServer } from "../../../lib/ApiFetchServer";

async function CvPage() {
  const CvID = await ApiFetchServer("/cvs");
  const CvInformation = await ApiFetchServer(
    `/cvs/${CvID?.dataResponse?.data[0]?.CVID}`,
  );
  const CategoryIdSkills = await ApiFetchServer("/skill-categories");
  const GetSkills = await ApiFetchServer("/skills");
  const GetLanguages = await ApiFetchServer("/languages");

  console.log(CvInformation?.dataResponse?.data);

  return (
    <div>
      <CreateTitle title="السيرة الذاتية" number={3} />
      <CVcomponents
        CategoryIdSkills={CategoryIdSkills?.dataResponse?.data ?? []}
        CVInfo={CvInformation?.dataResponse?.data ?? []}
        AllSkills={GetSkills?.dataResponse?.data ?? []}
        GetLanguages={GetLanguages.dataResponse.data}
      />
    </div>
  );
}

export default CvPage;
