"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
import BasicInfoCard from "./components/BasicInfoCard";
import ProfileStatsCard from "./components/ProfileStatsCard";
import ProfileCompletionCard from "./components/ProfileCompletionCard";
import Bio from "./components/Bio";
import SkillsInput from "./components/SkillsInput";

function ProfilePage() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("الملف الشخصي");
    setnumberOfSideBar(2);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-[30%_70%] m-auto w-[98%] justify-between mt-5 gap-2  "
      dir="ltr"
    >
      <div className="space-y-3 " dir="rtl">
        <ProfileStatsCard views={342} contacts={156} rating={4.8} />
        <ProfileCompletionCard />
      </div>
      <div dir="rtl">
        <BasicInfoCard />
        <Bio />
        <SkillsInput />

        <div className="flex items-center gap-3 mt-6 mb-15">
          <button
            type="submit"
            className="flex-1 h-12 rounded-xl bg-primaryBlue text-white font-medium hover:bg-blue-800 hover:cursor-pointer"
          >
            حفظ التغييرات
          </button>
          <button
            type="button"
            className="px-6 h-12 rounded-xl border border-secondGray text-secondColorBlack hover:bg-secondGray hover:cursor-pointer"
          >
            إلغاء
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
