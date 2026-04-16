"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckIcon,
  PencilSquareIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function CvTab({
  tabs,
  activeIndex,
  setNumberTab,
  onCreateCustomSection,
  onRenameCustomSection,
}) {
  const [showNewSectionInput, setShowNewSectionInput] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [editingTabKey, setEditingTabKey] = useState(null);
  const [editingName, setEditingName] = useState("");
  const addInputRef = useRef(null);
  const renameInputRef = useRef(null);

  useEffect(() => {
    if (showNewSectionInput) {
      addInputRef.current?.focus();
    }
  }, [showNewSectionInput]);

  useEffect(() => {
    if (editingTabKey) {
      renameInputRef.current?.focus();
      renameInputRef.current?.select();
    }
  }, [editingTabKey]);

  const handleAddSection = () => {
    const value = newSectionName.trim();
    if (!value) return;

    onCreateCustomSection(value);
    setNewSectionName("");
    setShowNewSectionInput(false);
  };

  const handleRename = (tab) => {
    const value = editingName.trim();
    if (!value) return;

    onRenameCustomSection(tab.sectionKey, value);
    setEditingTabKey(null);
    setEditingName("");
  };

  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-slate-200 p-3 w-full m-auto">
      {tabs.map((tab, index) => {
        const isActive = activeIndex === index;
        const isEditing = editingTabKey === tab.sectionKey;

        return isEditing ? (
          <div
            key={tab.sectionKey}
            className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2"
          >
            <button
              type="button"
              onClick={() => {
                setEditingTabKey(null);
                setEditingName("");
              }}
              className="text-slate-400 transition hover:text-slate-600 hover:cursor-pointer"
              title="إلغاء"
              aria-label="إلغاء"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => handleRename(tab)}
              className="text-blue-600 transition hover:text-blue-700 hover:cursor-pointer"
              title="تأكيد"
              aria-label="تأكيد"
            >
              <CheckIcon className="h-4 w-4" />
            </button>

            <input
              ref={renameInputRef}
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleRename(tab);
                }
              }}
              placeholder="اسم القسم"
              className="min-w-[150px] bg-transparent text-sm text-right text-slate-700 outline-none"
            />
          </div>
        ) : (
          <button
            key={tab.sectionKey}
            type="button"
            onClick={() => {
              if (tab.isCustom && isActive) {
                setEditingTabKey(tab.sectionKey);
                setEditingName(tab.label);
                return;
              }

              setNumberTab(index);
            }}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition hover:cursor-pointer ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:text-blue-600"
            }`}
          >
            {tab.isCustom && isActive && (
              <PencilSquareIcon className="h-4 w-4" />
            )}
            <span>{tab.label}</span>
          </button>
        );
      })}

      {showNewSectionInput ? (
        <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 shadow-sm">
          <button
            type="button"
            onClick={() => {
              setShowNewSectionInput(false);
              setNewSectionName("");
            }}
            className="text-slate-400 transition hover:text-slate-600 hover:cursor-pointer"
            title="إلغاء"
            aria-label="إلغاء"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleAddSection}
            className="text-blue-600 transition hover:text-blue-700 hover:cursor-pointer"
            title="إضافة"
            aria-label="إضافة"
          >
            <CheckIcon className="h-4 w-4" />
          </button>

          <input
            ref={addInputRef}
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSection();
              }
            }}
            placeholder="اكتب اسم القسم"
            className="min-w-[170px] bg-transparent text-sm text-right text-slate-700 outline-none"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowNewSectionInput(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition hover:scale-105 hover:cursor-pointer"
          title="إضافة قسم جديد"
          aria-label="إضافة قسم جديد"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
