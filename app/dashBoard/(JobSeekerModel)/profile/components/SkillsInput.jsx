"use client";

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { skills } from "../profileData";
import SkillTag from "./SkillTag";

export default function SkillsInput() {
  const [skill, setSkill] = useState("");

  const addSkill = () => {
    if (!skill.trim()) return;

    console.log("Skill added:", skill);
    setSkill("");
  };

  return (
    <div className="w-full mt-5 rounded-2xl border border-secondGray bg-auxiliaryColorWhite p-6 space-y-2">
      <h3 className="text-lg  text-secondColorBlack font-bold">المهارات</h3>
      <div className="flex gap flex-wrap gap-2">
        {skills.map((s) => {
          return (
            <SkillTag
              key={s.id}
              skill={s.skill}
              onRemove={() => console.log("delete skill")}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <input
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="أضف مهارة جديدة"
          className="h-14 w-full rounded-2xl border border-slate-200 px-4 text-right outline-none focus:ring-2 focus:ring-primaryBlue"
        />
        <button
          onClick={addSkill}
          className="flex h-14 w-20 items-center justify-center rounded-2xl bg-primaryBlue 
          text-white hover:bg-blue-700 hover:cursor-pointer"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
