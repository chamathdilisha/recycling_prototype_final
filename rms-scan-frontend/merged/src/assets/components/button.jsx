export default function Button({ text, onClick, type = "button", disabled = false, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`shimmer-btn w-full rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 py-3.5 px-6 text-sm font-black uppercase tracking-wider text-slate-950 shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:brightness-110 active:scale-98 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer ${className}`}
    >
      {text}
    </button>
  );
}