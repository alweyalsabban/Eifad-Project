"use client";
import { useContext, useState } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
import CvTab from "./components/CvTab";
import dynamic from "next/dynamic";

const PersonalSummaryTab = dynamic(
  () => import("./components/PersonalSummaryTab"),
);
const EducationTab = dynamic(() => import("./components/EducationTab"));
const ExperienceTab = dynamic(() => import("./components/ExperienceTab"));
const SkillsTab = dynamic(() => import("./components/SkillsTab"));
const LanguagesTab = dynamic(() => import("./components/LanguagesTab"));
const CertificatesTab = dynamic(() => import("./components/CertificatesTab"));
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

function CvPage() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  const [numberTab, setNumberTab] = useState(0);
  let TabComponent = null;

  switch (numberTab) {
    case 0:
      TabComponent = <PersonalSummaryTab />;
      break;
    case 1:
      TabComponent = <EducationTab />;
      break;
    case 2:
      TabComponent = <ExperienceTab />;
      break;
    case 3:
      TabComponent = <SkillsTab />;
      break;
    case 4:
      TabComponent = <LanguagesTab />;
      break;
    case 5:
      TabComponent = <CertificatesTab />;
      break;
    default:
      TabComponent = <>no page</>;
  }

  useEffect(() => {
    setnameOfSideBar("السيرة الذاتية");
    setnumberOfSideBar(3);
  }, [setnameOfSideBar, setnumberOfSideBar]);

  const onPreview = () => {
    console.log("Preview:");
  };

  const onExportPDF = () => {
    console.log("Export PDF:");
  };

  const onSaveCV = () => {
    console.log("Save CV:");
  };

  return (
    <div>
      <CvTab setNumberTab={setNumberTab} />
      <div>{TabComponent}</div>

      <div
        className="grid grid-cols-1 sm:grid-cols-[auto_20%_20%] 
      items-center gap-3 mt-20 mb-40"
      >
        <button
          type="button"
          onClick={onSaveCV}
          className="flex-1 inline-flex h-12  items-center justify-center gap-2 rounded-2xl bg-blue-600 
          px-5 font-medium text-white hover:bg-blue-700 hover:cursor-pointer"
        >
          <BookmarkIcon className="h-5 w-5" />
          حفظ السيرة الذاتية
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
    </div>
  );
}

export default CvPage;
