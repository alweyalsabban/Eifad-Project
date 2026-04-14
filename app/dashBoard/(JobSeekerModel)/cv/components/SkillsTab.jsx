"use client";
import { useEffect } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const LEVELS = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
  { value: "Expert", label: "Expert" },
];

export default function SkillsTab({
  objectSkills,
  setObjectSkills,
  CVID,
  AllSkills,
}) {
  useEffect(() => {
    console.log("objectSkills updated:", objectSkills);
    console.log(AllSkills);
  }, [objectSkills, AllSkills]);

  const handleSkillNameChange = (index, value) => {
    const updated = [...objectSkills];
    updated[index] = {
      ...updated[index],
      skill: {
        ...updated[index].skill,
        SkillName: value,
      },
    };
    setObjectSkills(updated);
  };

  const handleLevelChange = (index, value) => {
    const updated = [...objectSkills];
    updated[index] = {
      ...updated[index],
      SkillLevel: value,
    };
    setObjectSkills(updated);
  };

  const addRow = () => {
    setObjectSkills([
      ...objectSkills,
      {
        CVID: CVID,
        CVSkillID: Date.now(),
        SkillID: null,
        SkillLevel: "Beginner",
        skill: {
          CategoryID: null,
          SkillID: null,
          SkillName: "",
        },
      },
    ]);
  };

  const removeRow = (index) => {
    const updated = objectSkills.filter((_, i) => i !== index);
    setObjectSkills(updated);
  };

  return (
    <section className="mt-5 w-full rounded-2xl border border-secondGray bg-auxiliaryColorWhite p-6">
      <h3 className="text-right text-lg font-semibold text-slate-900">
        المهارات
      </h3>

      <div className="mt-5 space-y-4">
        {objectSkills.map((item, index) => {
          const currentValue = item.skill?.SkillName || "";

          const filteredSkills = AllSkills.filter((skill) =>
            skill.SkillName.toLowerCase().includes(currentValue.toLowerCase()),
          ).slice(0, 4);

          const datalistId = `skills-list-${index}`;

          return (
            <div className="space-y-4" key={index}>
              <div className="grid grid-cols-[1fr_140px_28px] items-center gap-3">
                <input
                  value={currentValue}
                  list={datalistId}
                  onChange={(e) => handleSkillNameChange(index, e.target.value)}
                  placeholder="أضف مهارة"
                  className="h-12 w-full rounded-xl border border-secondGray bg-white px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
                />

                <datalist id={datalistId}>
                  {filteredSkills.map((skill, i) => (
                    <option value={skill.SkillName} key={i} />
                  ))}
                </datalist>

                <select
                  value={item.SkillLevel || ""}
                  onChange={(e) => handleLevelChange(index, e.target.value)}
                  className="h-12 w-full rounded-xl border border-secondGray bg-white px-3 text-center outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {LEVELS.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  className="flex h-8 w-8 items-center justify-center text-red-500 hover:text-red-600"
                  aria-label="حذف"
                  title="حذف"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={addRow}
          className="flex h-12 w-full items-center justify-center rounded-xl border border-dashed border-slate-300 text-slate-500 hover:bg-slate-50"
          aria-label="إضافة مهارة"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
