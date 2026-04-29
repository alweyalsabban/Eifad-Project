// components/SearchFieldBar.jsx
import { FiSearch, FiMapPin } from "react-icons/fi";

export default function SearchFieldBar({
  value,
  setSelectedMajor,
  buttonText = "بحث",
  onSearch,
  disabled = false,
}) {
  return (
    <div className="w-[40%]  mr-5 mt-5">
      <div className="flex gap-4">
        {/* Input */}
        <div className="relative flex-1">
          <select
            onChange={(e) => setSelectedMajor(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pr-5 pl-4 text-sm text-slate-700
                       placeholder:text-slate-400 outline-none transition
                       focus:border-blue-500 focus:border-3
                       disabled:cursor-not-allowed disabled:bg-slate-50"
          >
            {value?.map((item, index) => {
              return (
                <option key={index} value={item?.id}>
                  {item?.name}
                </option>
              );
            })}
          </select>
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={onSearch}
          disabled={disabled}
          className="h-12 shrink-0 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white
                     shadow-sm transition hover:bg-blue-700 active:scale-[0.98]
                     disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="inline-flex items-center gap-2">
            {buttonText}
            <FiSearch size={18} />
          </span>
        </button>
      </div>
    </div>
  );
}
