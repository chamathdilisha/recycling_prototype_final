import { useState } from "react";

const CATEGORY_THEMES = {
  glass: {
    accent: "from-emerald-500 to-teal-400",
    bgBadge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    binColor: "bg-emerald-950/60 border-emerald-500/40 text-emerald-300",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  metal: {
    accent: "from-amber-400 to-yellow-500",
    bgBadge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    binColor: "bg-amber-950/60 border-amber-500/40 text-amber-300",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  paper: {
    accent: "from-blue-400 to-cyan-400",
    bgBadge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    binColor: "bg-blue-950/60 border-blue-500/40 text-blue-300",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  plastic: {
    accent: "from-purple-400 to-indigo-400",
    bgBadge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    binColor: "bg-purple-950/60 border-purple-500/40 text-purple-300",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3zm5-3v3m6-3v3" />
      </svg>
    ),
  },
};

function ConfidenceMeter({ value }) {
  const percentage = Math.round((value || 0) * 100);
  const isHigh = percentage >= 80;

  return (
    <div className="rounded-2xl border border-white/5 bg-slate-800/40 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Model Confidence
          </span>
        </div>
        <span
          className={`text-sm font-extrabold ${
            isHigh ? "text-emerald-400" : "text-amber-400"
          }`}
        >
          {percentage}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700/60 p-0.5">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            isHigh
              ? "bg-gradient-to-r from-emerald-500 to-teal-300 shadow-sm shadow-emerald-500/50"
              : "bg-gradient-to-r from-amber-500 to-yellow-300"
          }`}
          style={{ width: `${Math.max(percentage, 5)}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
        <span>Deep Neural Inference</span>
        <span>{isHigh ? "High Precision" : "Moderate Precision"}</span>
      </div>
    </div>
  );
}

export default function ResultsView({ results, loading, error }) {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    if (!results) return;
    const text = `EcoSort AI Result:\nCategory: ${results.category?.toUpperCase()} (${results.material})\nConfidence: ${Math.round((results.confidence || 0) * 100)}%\nBin: ${results.binColor}\nInstructions:\n${results.instructions?.map((i, idx) => `${idx + 1}. ${i}`).join("\n")}\nGuideline: ${results.recyclingGuideline}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
          <svg className="w-6 h-6 text-emerald-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <div>
          <h4 className="text-sm font-bold tracking-wider uppercase text-white">Analyzing Material</h4>
          <p className="mt-1 text-xs text-slate-400 max-w-[220px]">
            Extracting texture &amp; spectral features through the Keras classifier...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-400">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <div>
          <h4 className="text-sm font-bold text-rose-400">Classification Error</h4>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed max-w-[240px]">{error}</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center text-slate-400">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/5 bg-slate-800/40 text-slate-500 shadow-inner">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-300">Standby for Analysis</h4>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed max-w-[220px]">
            Capture or upload a waste item photo to view instant material diagnostics and recycling steps.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[11px] font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          Ready for Scan
        </div>
      </div>
    );
  }

  const categoryKey = results.category?.toLowerCase() || "metal";
  const theme = CATEGORY_THEMES[categoryKey] || CATEGORY_THEMES.metal;

  return (
    <div className="w-full space-y-4 animate-fadeIn">
      {/* Category Hero Badge */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800/60 p-4 shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${theme.bgBadge} shadow-sm`}>
              {theme.icon}
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                Classified Material
              </span>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">
                {results.category}
              </h3>
              <p className="text-xs font-medium text-slate-300">{results.material}</p>
            </div>
          </div>

          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            title="Copy summary to clipboard"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Confidence Bar */}
      <ConfidenceMeter value={results.confidence} />

      {results.lowConfidence && (
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300">
          <svg className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p>Confidence score is borderline. For highest accuracy, capture with clearer lighting and a plain background.</p>
        </div>
      )}

      {/* Recommended Bin Directive */}
      <div className={`rounded-2xl border p-4 shadow-inner ${theme.binColor}`}>
        <div className="flex items-center gap-2 mb-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
            Recommended Bin Destination
          </span>
        </div>
        <p className="text-base font-extrabold tracking-wide">{results.binColor}</p>
      </div>

      {/* Disposal Checklist */}
      <div className="rounded-2xl border border-white/5 bg-slate-800/40 p-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          Required Disposal Steps
        </h4>
        <ul className="space-y-2">
          {results.instructions?.map((instruction, index) => (
            <li key={index} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                {index + 1}
              </span>
              <span>{instruction}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recycling Guideline Advice */}
      <div className="rounded-2xl border border-white/5 bg-slate-800/30 p-4">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Facility Protocol Guideline
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">{results.recyclingGuideline}</p>
      </div>
    </div>
  );
}