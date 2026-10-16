export default function InputBox({
  label,
  placeholder,
  type = "text",
  id,
  value,
  onChange,
  icon,
}) {
  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-slate-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="pointer-events-none absolute left-3.5 text-slate-400">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-2xl border border-white/10 bg-slate-900/60 py-3 text-sm text-white placeholder-slate-500 shadow-inner transition-all duration-200 focus:border-emerald-500 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
            icon ? "pl-11 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}