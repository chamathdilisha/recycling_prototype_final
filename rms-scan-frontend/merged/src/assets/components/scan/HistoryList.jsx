import { useState } from "react";

function formatTime(date) {
  try {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

function formatDate(date) {
  try {
    return new Date(date).toLocaleDateString([], { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

const CATEGORY_TAGS = {
  glass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  metal: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  paper: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  plastic: "bg-purple-500/10 text-purple-400 border-purple-500/30",
};

export default function HistoryList({ history, activeHistoryId, onSelect, onClear }) {
  const [filter, setFilter] = useState("all");

  const filteredHistory = history.filter((entry) => {
    if (filter === "all") return true;
    const cat = entry.results?.category?.toLowerCase();
    return cat === filter;
  });

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10 px-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/60 border border-white/5 text-slate-500 shadow-inner">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-300">No Scans Recorded</p>
          <p className="mt-1 text-[11px] text-slate-400 leading-relaxed max-w-[200px]">
            Your classified materials and disposal records will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-3">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
        {["all", "glass", "metal", "paper", "plastic"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-lg px-2.5 py-1 font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              filter === cat
                ? "bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/30 font-bold"
                : "bg-slate-800/70 text-slate-400 hover:bg-slate-700/70 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* History Items Feed */}
      <ul className="flex flex-col gap-2 overflow-y-auto pr-1 flex-1">
        {filteredHistory.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-400">
            No items in category "{filter}"
          </div>
        ) : (
          filteredHistory.map((entry) => {
            const isActive = entry.id === activeHistoryId;
            const category = entry.results?.category?.toLowerCase() || "item";
            const tagClass = CATEGORY_TAGS[category] || "bg-slate-700/40 text-slate-300 border-white/10";
            const conf = Math.round((entry.results?.confidence || 0) * 100);

            return (
              <li key={entry.id}>
                <button
                  type="button"
                  onClick={() => onSelect(entry.id)}
                  className={`group flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "border-emerald-500/60 bg-emerald-500/10 shadow-md shadow-emerald-950/40"
                      : "border-white/5 bg-slate-800/40 hover:border-white/15 hover:bg-slate-800/80"
                  }`}
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black">
                    <img
                      src={entry.thumbnail}
                      alt={category}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`inline-block rounded-md border px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${tagClass}`}>
                        {entry.results?.category || "Scanned Item"}
                      </span>
                      {conf > 0 && (
                        <span className="text-[10px] font-semibold text-slate-400">
                          {conf}%
                        </span>
                      )}
                    </div>

                    <p className="mt-1 truncate text-xs font-semibold text-white">
                      {entry.results?.material || "Recycling Analysis"}
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      {formatDate(entry.timestamp)} · {formatTime(entry.timestamp)}
                    </p>
                  </div>
                </button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
