"use client";

import { useEffect } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const LEVELS = [
  { value: "Beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "Native", label: "Native" },
];

export default function LanguagesTab({
  objectLanguage,
  setObjectLanguage,
  CVID,
  GetLanguages,
}) {
  const handleLanguageNameChange = (index, value) => {
    const updated = [...objectLanguage];
    updated[index] = {
      ...updated[index],
      language: {
        ...updated[index].language,
        LanguageName: value,
      },
    };
    setObjectLanguage(updated);
  };

  const handleLevelChange = (index, value) => {
    const updated = [...objectLanguage];
    updated[index] = {
      ...updated[index],
      LanguageLevel: value,
    };
    setObjectLanguage(updated);
  };

  const addRow = () => {
    setObjectLanguage([
      ...objectLanguage,
      {
        CVID: CVID,
        CVLanguageID: Date.now(),
        LanguageID: null,
        LanguageLevel: "Beginner",
        language: {
          LanguageID: null,
          LanguageName: "",
        },
      },
    ]);
  };

  const removeRow = (index) => {
    const updated = objectLanguage.filter((_, i) => i !== index);
    setObjectLanguage(updated);
  };

  useEffect(() => {
    console.log("objectLanguage:", objectLanguage);
    console.log("GetLanguages:", GetLanguages);
  }, [objectLanguage, GetLanguages]);

  return (
    <section className="mt-5 w-full rounded-2xl border border-secondGray bg-auxiliaryColorWhite p-6">
      <h3 className="text-right text-lg font-semibold text-slate-900">
        اللغات
      </h3>

      <div className="mt-5 space-y-4">
        <div className="space-y-4">
          {objectLanguage.map((item, index) => {
            const currentValue = item.language?.LanguageName || "";

            const filteredLanguages = GetLanguages.filter((lang) =>
              lang.LanguageName.toLowerCase().includes(
                currentValue.toLowerCase(),
              ),
            ).slice(0, 4);

            const datalistId = `languages-list-${index}`;

            return (
              <div
                key={index}
                className="grid grid-cols-[1fr_140px_28px] items-center gap-3"
              >
                <input
                  value={currentValue}
                  list={datalistId}
                  onChange={(e) =>
                    handleLanguageNameChange(index, e.target.value)
                  }
                  placeholder="أضف لغة"
                  className="h-12 w-full rounded-xl border border-secondGray bg-white px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
                />

                <datalist id={datalistId}>
                  {filteredLanguages.map((lang, i) => (
                    <option value={lang.LanguageName} key={i} />
                  ))}
                </datalist>

                <select
                  value={item.LanguageLevel || ""}
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
            );
          })}
        </div>

        <button
          type="button"
          onClick={addRow}
          className="flex h-12 w-full items-center justify-center rounded-xl border border-dashed border-slate-300 text-slate-500 hover:bg-slate-50"
          aria-label="إضافة لغة"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
