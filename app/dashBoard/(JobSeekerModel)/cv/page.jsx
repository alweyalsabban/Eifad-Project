"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
import CvTab from "./components/CvTab";
import PersonalSummaryCard from "./components/PersonalSummaryCard";
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

function CvPage() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
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
      <CvTab />
      <PersonalSummaryCard />

      <div>
        <div className="flex items-center gap-3 mt-5">
          <button
            type="button"
            onClick={onSaveCV}
            className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 font-medium text-white hover:bg-blue-700"
          >
            <BookmarkIcon className="h-5 w-5" />
            حفظ السيرة الذاتية
          </button>

          <button
            type="button"
            onClick={onExportPDF}
            className="inline-flex h-12 items-center gap-2 rounded-2xl bg-green-600 px-5 text-white hover:bg-green-700"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            تصدير PDF
          </button>
          <button
            type="button"
            onClick={onPreview}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            aria-label="معاينة"
            title="معاينة"
          >
            <DocumentTextIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CvPage;
