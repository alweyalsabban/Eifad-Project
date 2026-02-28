"use client";
import { useState, useEffect } from "react";

export default function FilterInput({ lableName, options, setvalue, isClean }) {
  const defutlValue = { name: "إختر", value: "" };
  const [selected, setSelected] = useState(defutlValue);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isClean) {
      setSelected(defutlValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClean]);

  return (
    <div className="w-64 relative">
      <label className="block mb-2 text-sm font-medium">{lableName}</label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-right shadow-sm"
      >
        {selected.name}
      </button>

      {open && (
        <ul
          className="absolute mt-2 w-full bg-white border 
              border-gray-200 rounded-xl shadow-lg overflow-hidden z-10"
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                setSelected(option);
                setvalue(option.value);
                setOpen(false);
              }}
              className={`flex justify-between items-center px-4 py-2 cursor-pointer 
              hover:bg-blue-50 transition
              ${
                selected.name === option.name
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : ""
              }`}
            >
              {option.name}
              {selected.name === option.name && (
                <span className="text-blue-600">✔</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
