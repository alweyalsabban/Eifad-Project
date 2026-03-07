export function Field({ label, value, onChange, icon, inputProps }) {
  return (
    <div className="space-y-2">
      <label htmlFor={inputProps?.id} className="block text-sm text-slate-700">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">
            {icon}
          </span>
        )}

        <input
          {...inputProps}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-12 w-full rounded-[14px] border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none
            focus:border-transparent focus:ring-2 focus:ring-blue-500 ${icon ? "pl-11" : ""} text-right`}
        />
      </div>
    </div>
  );
}
