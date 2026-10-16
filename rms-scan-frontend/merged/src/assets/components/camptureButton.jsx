export default function CamptureButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-1 items-center justify-center gap-2.5 rounded-2xl border border-teal-500/30 bg-gradient-to-r from-teal-600/20 to-cyan-600/20 px-4 py-3 text-xs font-bold uppercase tracking-wider text-teal-300 shadow-md shadow-teal-950/30 transition-all duration-200 hover:border-teal-400/50 hover:bg-teal-500/25 hover:text-white hover:shadow-teal-500/20 active:scale-98 cursor-pointer"
      aria-label="Capture with Camera"
      title="Open Live Camera"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-teal-500/20 border border-teal-400/30 text-teal-300 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <span>Live Camera</span>
    </button>
  );
}
