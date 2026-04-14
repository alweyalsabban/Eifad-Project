"use client";
import { useState } from "react";
import CvTab from "../components/CvTab";
import dynamic from "next/dynamic";
import { UpdateCv } from "../../callFunctionsForJobseeker";

const PersonalSummaryTab = dynamic(
  () => import("../components/PersonalSummaryTab"),
);

import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

const EducationTab = dynamic(() => import("../components/EducationTab"));
const ExperienceTab = dynamic(() => import("../components/ExperienceTab"));
const SkillsTab = dynamic(() => import("../components/SkillsTab"));
const LanguagesTab = dynamic(() => import("../components/LanguagesTab"));
const CertificatesTab = dynamic(() => import("../components/CertificatesTab"));

function CVcomponents({ CVInfo, AllSkills, GetLanguages }) {
  const [isLoading, setLoading] = useState(false);
  const [MessageError, setMessageError] = useState("");
  const [summary, setSummary] = useState(CVInfo?.PersonalSummary ?? "");
  const [title, setTitle] = useState(CVInfo?.Title ?? "");
  const [objectEducation, setObjectEducation] = useState(
    CVInfo?.education ?? "",
  );
  const [DeletedField, setDeletedField] = useState([]);
  const [lengthOfEducationFelid] = useState(objectEducation.length);

  const [objectexperience, setexperience] = useState(CVInfo?.experiences ?? []);
  const [DeletedExperienceField, setDeletedExperienceField] = useState([]);
  const [lengthOfExperienceFelid] = useState(objectexperience.length);

  const [objectSkills, setObjectSkills] = useState(CVInfo?.skills ?? "");
  const [objectLanguage, setObjectLanguage] = useState(CVInfo?.languages ?? "");

  const [numberTab, setNumberTab] = useState(0);
  let TabComponent = null;
  switch (numberTab) {
    case 0:
      TabComponent = (
        <PersonalSummaryTab
          summary={summary}
          setSummary={setSummary}
          title={title}
          setTitle={setTitle}
          MessageError={MessageError}
        />
      );
      break;
    case 1:
      TabComponent = (
        <EducationTab
          objectEducation={objectEducation}
          setObjectEducation={setObjectEducation}
          DeletedField={DeletedField}
          setDeletedField={setDeletedField}
        />
      );
      break;
    case 2:
      TabComponent = (
        <ExperienceTab
          objectexperience={objectexperience}
          setexperience={setexperience}
          DeletedExperienceField={DeletedExperienceField}
          setDeletedExperienceField={setDeletedExperienceField}
        />
      );
      break;
    case 3:
      TabComponent = (
        <SkillsTab
          objectSkills={objectSkills}
          setObjectSkills={setObjectSkills}
          CVID={CVInfo.CVID}
          AllSkills={AllSkills}
        />
      );
      break;
    case 4:
      TabComponent = (
        <LanguagesTab
          objectLanguage={objectLanguage}
          setObjectLanguage={setObjectLanguage}
          CVID={CVInfo.CVID}
          GetLanguages={GetLanguages}
        />
      );
      break;
    case 5:
      TabComponent = <CertificatesTab />;
      break;
    default:
      TabComponent = <>no page</>;
  }

  const onPreview = () => {
    console.log("Preview:");
  };

  const onExportPDF = () => {
    console.log("Export PDF:");
  };

  const onSaveCV = async () => {
    setLoading(true);
    if (title === "") {
      setMessageError("هذا الحقل ضروري");
    } else {
      setMessageError("");
      await UpdateCv("EditProfCv", {
        id: CVInfo.CVID,
        Title: title,
        Summary: summary,
      });

      await UpdateCv("EditEducation", {
        id: CVInfo.CVID,
        Length: lengthOfEducationFelid,
        objectEducation: objectEducation,
      });

      await UpdateCv("DeleteEducation", {
        id: CVInfo.CVID,
        DeletedField: DeletedField,
      });

      await UpdateCv("EditExperience", {
        id: CVInfo.CVID,
        Length: lengthOfExperienceFelid,
        objectexperience: objectexperience,
      });

      await UpdateCv("DeleteExperience", {
        id: CVInfo.CVID,
        DeletedField: DeletedExperienceField,
      });
    }

    setLoading(false);
  };

  return (
    <>
      <CvTab setNumberTab={setNumberTab} />
      <div>{TabComponent}</div>
      <div
        className="grid grid-cols-1 sm:grid-cols-[auto_20%_20%] 
      items-center gap-3 mt-20 mb-40"
      >
        <button
          type="button"
          onClick={onSaveCV}
          disabled={isLoading}
          className={`flex-1 inline-flex h-12  items-center justify-center gap-2 rounded-2xl bg-blue-600 
          px-5 font-medium text-white  ${isLoading ? "opacity-40 cursor-not-allowed" : "opacity-100 hover:bg-blue-700 hover:cursor-pointer"}`}
        >
          {isLoading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-neutral-quaternary animate-spin fill-blue-200"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <>
              <BookmarkIcon className="h-5 w-5" />
              حفظ السيرة الذاتية
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onExportPDF}
          className="inline-flex h-12 items-center gap-2 rounded-2xl justify-center
           bg-green-600 px-5 text-white hover:bg-green-700 hover:cursor-pointer"
        >
          <ArrowDownTrayIcon className="h-5  hover:cursor-pointer " />
          تصدير PDF
        </button>

        <button
          type="button"
          onClick={onPreview}
          className="flex h-12 items-center justify-center rounded-2xl border px-3  
          border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:cursor-pointer"
          aria-label="معاينة"
          title="معاينة"
        >
          <div className="flex">
            <DocumentTextIcon className="h-6 w-6" />
            <h1>معاينة</h1>
          </div>
        </button>
      </div>
    </>
  );
}

export default CVcomponents;
