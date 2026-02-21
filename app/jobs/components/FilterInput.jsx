"use client";
import { useState } from "react";

export default function FilterInput({ lableName, optionsNames }) {
  const options = optionsNames;
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);
  return (
    <div className="w-64 relative">
      <label className="block mb-2 text-sm font-medium">{lableName}</label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-right shadow-sm"
      >
        {selected}
      </button>

      {open && (
        <ul
          className="absolute mt-2 w-full bg-white border 
              border-gray-200 rounded-xl shadow-lg overflow-hidden z-10"
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className={`flex justify-between items-center px-4 py-2 cursor-pointer 
              hover:bg-blue-50 transition
              ${
                selected === option
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : ""
              }`}
            >
              {option}
              {selected === option && <span className="text-blue-600">✔</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
