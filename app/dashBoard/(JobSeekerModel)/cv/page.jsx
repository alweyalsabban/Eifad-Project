import CreateTitle from "../CreateTitle";
import CVcomponents from "./components/CVcomponents";
import { ApiFetchServer } from "../../../lib/ApiFetchServer";

async function CvPage() {
  const CvID = await ApiFetchServer("/cvs");
  const CvInformation = await ApiFetchServer(
    `/cvs/${CvID.dataResponse.data[0].CVID}`,
  );

  return (
    <div>
      <CreateTitle title="السيرة الذاتية" number={3} />
      <CVcomponents CVInfo={CvInformation.dataResponse.data} />
    </div>
  );
}

export default CvPage;
