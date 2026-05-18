import CreateTitle from "../CreateTitle";
import CVcomponents from "./components/CVcomponents";
import { ApiFetchServer } from "../../../lib/ApiFetchServer";

async function CvPage() {
  const CvID = await ApiFetchServer("/cvs");
  const currentCvId = CvID?.dataResponse?.data?.[0]?.CVID;
  const CvInformation = currentCvId
    ? await ApiFetchServer(`/cvs/${currentCvId}`)
    : null;
  const CategoryIdSkills = await ApiFetchServer("/skill-categories");
  const GetSkills = await ApiFetchServer("/skills");
  const GetLanguages = await ApiFetchServer("/languages");
  const Profile = await ApiFetchServer("/profile");

  return (
    <div>
      <CreateTitle title="السيرة الذاتية" number={3} />
      <CVcomponents
        CategoryIdSkills={CategoryIdSkills?.dataResponse?.data ?? []}
        CVInfo={CvInformation?.dataResponse?.data ?? {}}
        AllSkills={GetSkills?.dataResponse?.data ?? []}
        GetLanguages={GetLanguages?.dataResponse?.data ?? []}
        Profile={Profile.dataResponse.data}
      />
    </div>
  );
}

export default CvPage;
