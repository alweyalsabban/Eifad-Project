// components/chat/ThreadsList.jsx
"use client";

import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function ThreadsList({
  threads = [],
  activeId,
  onSelect,
  searchPlaceholder = "يبحث ...",
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return threads;

    return threads.filter((t) => {
      const hay =
        `${t.company} ${t.name} ${t.role} ${t.preview} ${t.time}`.toLowerCase();
      return hay.includes(q);
    });
  }, [threads, query]);

  return (
    <aside className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-4 mt-5">
      {/* Search */}
      <div className="relative mb-4">
        <FiSearch
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-11 w-full rounded-xl border border-gray-200 bg-white pr-9 pl-3 text-sm
                     outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Threads */}
      <div className="space-y-3">
        {filtered.map((t) => {
          const active = t.id === activeId;

          return (
            <button
              key={t.id}
              onClick={() => onSelect?.(t.id)}
              className={`w-full text-right transition hover:cursor-pointer
                ${active ? "rounded-xl bg-blue-50 p-3" : "p-2 hover:bg-gray-50 rounded-xl"}  `}
            >
              <div className="flex justify-between gap-3">
                {/* Text */}
                <div className="min-w-0 flex">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {t.avatar}
                  </div>
                  <div className="items-center px-2 text-xs text-gray-500">
                    <div className="font-bold text-lg text-gray-900">
                      {t.company}
                    </div>
                    <div
                      className="mt-1 text-sm font-semibold 
                    text-gray-800 truncate"
                    >
                      {t.role}
                    </div>

                    <div className="mt-1 text-xs text-gray-500 line-clamp-2">
                      {t.preview}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  {/* Avatar + unread */}
                  <div className="flex items-center gap-2">
                    {t.unread > 0 && (
                      <div
                        className="grid h-6 w-6 place-items-center rounded-full bg-blue-600 text-xs 
                    font-bold text-white"
                      >
                        {t.unread}
                      </div>
                    )}
                  </div>
                  <div className="text-sm">{t.time}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
