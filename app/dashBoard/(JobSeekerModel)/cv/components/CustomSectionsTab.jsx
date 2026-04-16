"use client";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function CustomSectionsTab({
  section,
  onUpdateSection,
  onDeleteSection,
}) {
  if (!section) {
    return null;
  }

  const addField = () => {
    onUpdateSection(section.clientId, {
      Items: [...section.Items, ""],
    });
  };

  const updateItem = (index, value) => {
    const updatedItems = [...section.Items];
    updatedItems[index] = value;

    onUpdateSection(section.clientId, {
      Items: updatedItems,
    });
  };

  const removeItem = (index) => {
    const updatedItems = section.Items.filter(
      (_, itemIndex) => itemIndex !== index,
    );

    onUpdateSection(section.clientId, {
      Items: updatedItems.length ? updatedItems : [""],
    });
  };

  return (
    <section className="mt-5 w-full rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="text-right">
          <h3 className="text-lg font-semibold text-slate-900">
            {section.SectionName}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => onDeleteSection(section.clientId)}
          className="inline-flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600 transition hover:bg-red-100 hover:cursor-pointer"
        >
          <TrashIcon className="h-4 w-4" />
          حذف القسم
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {section.Items.map((item, index) => (
          <div
            key={`${section.clientId}-${index}`}
            className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-600 hover:cursor-pointer"
                aria-label="حذف الحقل"
                title="حذف الحقل"
              >
                <TrashIcon className="h-5 w-5" />
              </button>

              <span className="text-sm font-medium text-slate-500">
                الحقل {index + 1}
              </span>
            </div>

            <textarea
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder="اكتب هنا تفاصيل هذا القسم..."
              className="min-h-32 w-full resize-y rounded-2xl border border-slate-200 bg-white p-4 text-right text-slate-900 outline-none transition focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addField}
          className="flex h-14 w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 text-slate-500 transition hover:bg-slate-50 hover:text-blue-600 hover:cursor-pointer"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
