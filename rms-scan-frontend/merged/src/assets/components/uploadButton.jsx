export default function UploadButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-1 items-center justify-center gap-2.5 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 px-4 py-3 text-xs font-bold uppercase tracking-wider text-emerald-300 shadow-md shadow-emerald-950/30 transition-all duration-200 hover:border-emerald-400/50 hover:bg-emerald-500/25 hover:text-white hover:shadow-emerald-500/20 active:scale-98 cursor-pointer"
      aria-label="Upload Waste Photo"
      title="Upload Image from Files"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      </div>
      <span>Upload Image</span>
    </button>
  );
}
