import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CamptureButton from "../components/camptureButton";
import UploadButton from "../components/uploadButton";
import CameraCapture from "../components/scan/CameraCapture";
import FileUpload from "../components/scan/FileUpload";
import HistoryList from "../components/scan/HistoryList";
import ResultsView from "../components/scan/ResultsView";
import { useImageWorkflow } from "../../hooks/useImageWorkflow";

// Import sample images for 1-click testing
import sampleMetal from "../samples/sample-metal.jpg";
import sampleGlass from "../samples/sample-glass.jpg";
import samplePaper from "../samples/sample-paper.jpg";
import samplePlastic from "../samples/sample-plastic.jpg";

export default function HomePage() {
  const {
    selectedImage,
    results,
    loading,
    error,
    history,
    activeHistoryId,
    setImageFromCamera,
    setImageFromUpload,
    submitForAnalysis,
    loadFromHistory,
    resetImage,
    clearHistory,
  } = useImageWorkflow();

  const [cameraOpen, setCameraOpen] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileUploadRef = useRef(null);

  const handleCapture = (dataUrl) => {
    setCameraOpen(false);
    setLocalError(null);
    setImageFromCamera(dataUrl);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      fileUploadRef.current?.processFile(files[0]);
    }
  };

  const loadSample = (sampleSrc) => {
    setLocalError(null);
    setImageFromUpload(sampleSrc);
  };

  return (
    <div className="eco-mesh-background min-h-screen text-slate-100 flex flex-col font-sans">
      {/* Top Luxury Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 transition-transform group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950">
                <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white">EcoSort</span>
                <span className="rounded-md bg-gradient-to-r from-emerald-500 to-teal-400 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-950">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide font-medium">Recycling Intelligence System</p>
            </div>
          </Link>

          {/* Right Status & Actions */}
          <div className="flex items-center gap-3">
            {/* Live Model Status */}
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Model Online</span>
            </div>

            {/* Swagger API Link */}
            <a
              href="http://localhost:5103/swagger"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-white transition-all"
            >
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span>Swagger API</span>
            </a>

            {/* Auth Buttons */}
            <Link
              to="/sign-in"
              className="rounded-xl border border-white/10 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-all"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="rounded-xl bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/25 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main Workspace Section */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        {/* Hero Headline */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold text-emerald-400 mb-3">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            Automated Waste Material Classifier
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            Classify &amp; Recycle with <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">AI Precision</span>
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed font-normal">
            Upload or capture photos of waste materials to detect <span className="text-slate-200 font-medium">Glass, Metal, Paper, or Plastic</span> and get certified bin disposal directives instantly.
          </p>
        </div>

        {/* 3-Column Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* =========================================
              LEFT COLUMN: SCAN HISTORY (lg:col-span-3)
             ========================================= */}
          <div className="lg:col-span-3 h-[600px] glass-panel rounded-3xl p-5 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-white">Scan Log</h2>
                  <p className="text-[10px] text-slate-400 font-medium">{history.length} {history.length === 1 ? 'record' : 'records'}</p>
                </div>
              </div>

              {history.length > 0 && (
                <button
                  type="button"
                  onClick={clearHistory}
                  className="text-[11px] font-semibold text-slate-400 hover:text-rose-400 transition-colors"
                  title="Clear scan history"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex-1 min-h-0">
              <HistoryList
                history={history}
                activeHistoryId={activeHistoryId}
                onSelect={loadFromHistory}
              />
            </div>
          </div>

          {/* =========================================
              CENTER COLUMN: SCANNER STUDIO (lg:col-span-5)
             ========================================= */}
          <div className="lg:col-span-5 h-[600px] glass-panel-elevated rounded-3xl p-5 flex flex-col justify-between">
            {/* Studio Top Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  AI Vision Viewport
                </span>
              </div>

              {selectedImage && (
                <button
                  type="button"
                  onClick={resetImage}
                  className="rounded-lg bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Viewport Dropzone / Image Display */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative flex-1 my-4 flex items-center justify-center rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                isDragging
                  ? "border-emerald-400 bg-emerald-500/15 scale-[1.01]"
                  : selectedImage
                  ? "border-emerald-500/30 bg-black/60 shadow-inner"
                  : "border-dashed border-white/15 bg-slate-900/50 hover:border-emerald-500/40 hover:bg-slate-900/80"
              }`}
            >
              {selectedImage ? (
                <div className="relative h-full w-full flex items-center justify-center bg-black">
                  <img
                    src={selectedImage}
                    alt="Selected material preview"
                    className="h-full w-full object-contain"
                  />

                  {/* Corner reticle marks */}
                  <div className="pointer-events-none absolute inset-4 border border-emerald-500/20 rounded-xl">
                    <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-emerald-400 rounded-tl-md" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-emerald-400 rounded-tr-md" />
                    <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-emerald-400 rounded-bl-md" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-emerald-400 rounded-br-md" />
                  </div>

                  {/* Laser Sweeper animation during analysis */}
                  {loading && (
                    <div className="pointer-events-none absolute inset-x-0 animate-laser z-20">
                      <div className="h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-lg shadow-emerald-400" />
                      <div className="h-12 bg-gradient-to-b from-emerald-500/20 to-transparent" />
                    </div>
                  )}

                  {/* Loading Overlay */}
                  {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-sm z-30 gap-3">
                      <div className="h-10 w-10 animate-spin rounded-full border-3 border-emerald-400 border-t-transparent shadow-lg shadow-emerald-500/30" />
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                        Classifying with Neural Net...
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-inner">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    Drag &amp; Drop photo here
                  </h3>
                  <p className="text-xs text-slate-400 max-w-[220px] mb-4">
                    Supports JPG, PNG, and WebP images up to 10MB
                  </p>

                  {/* 1-Click Test Chips */}
                  <div className="w-full">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                      Instant Sample Demos
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => loadSample(sampleMetal)}
                        className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-300 hover:bg-amber-500/25 transition-all"
                      >
                        🥫 Can (Metal)
                      </button>
                      <button
                        type="button"
                        onClick={() => loadSample(sampleGlass)}
                        className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-500/25 transition-all"
                      >
                        🍾 Bottle (Glass)
                      </button>
                      <button
                        type="button"
                        onClick={() => loadSample(samplePaper)}
                        className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-[11px] font-semibold text-blue-300 hover:bg-blue-500/25 transition-all"
                      >
                        📦 Box (Paper)
                      </button>
                      <button
                        type="button"
                        onClick={() => loadSample(samplePlastic)}
                        className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-[11px] font-semibold text-purple-300 hover:bg-purple-500/25 transition-all"
                      >
                        🧴 Bottle (Plastic)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Local Error message */}
            {localError && (
              <div className="mb-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-center text-xs text-rose-400">
                {localError}
              </div>
            )}

            {/* Bottom Controls / Action Buttons */}
            <div className="space-y-3">
              {selectedImage && !loading ? (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={resetImage}
                    className="rounded-2xl border border-white/10 bg-slate-800/80 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-300 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => fileUploadRef.current?.openFileExplorer()}
                    className="rounded-2xl border border-white/10 bg-slate-800/80 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-300 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={submitForAnalysis}
                    className="shimmer-btn flex-1 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 py-3 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg shadow-emerald-500/30 hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Analyze Material</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <CamptureButton
                    onClick={() => {
                      setLocalError(null);
                      setCameraOpen(true);
                    }}
                  />
                  <UploadButton
                    onClick={() => fileUploadRef.current?.openFileExplorer()}
                  />
                </div>
              )}
            </div>

            {/* Hidden File Input & Camera Modal */}
            <FileUpload
              ref={fileUploadRef}
              onUpload={(dataUrl) => {
                setLocalError(null);
                setImageFromUpload(dataUrl);
              }}
              onError={setLocalError}
            />

            <CameraCapture
              isOpen={cameraOpen}
              onClose={() => setCameraOpen(false)}
              onCapture={handleCapture}
            />
          </div>

          {/* =========================================
              RIGHT COLUMN: AI DIAGNOSTICS (lg:col-span-4)
             ========================================= */}
          <div className="lg:col-span-4 h-[600px] glass-panel rounded-3xl p-5 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-white">Diagnostics</h2>
                  <p className="text-[10px] text-slate-400 font-medium">Recycling Directives &amp; Bin ID</p>
                </div>
              </div>

              {results && (
                <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  Verified
                </span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto pr-1">
              <ResultsView results={results} loading={loading} error={error} />
            </div>
          </div>

        </div>

        {/* Feature Highlights Grid at Bottom */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-card rounded-2xl p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">4 Target Material Categories</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trained deep convolutional network classifying glass, metal, paper, and plastic with high precision.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Certified Bin Allocation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct color-coded bin guidelines matching standard municipal and industrial sorting policies.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Real-time ASP.NET &amp; Keras Bridge</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sub-second model inference powered by a high-throughput .NET 10 API and dedicated Python bridge.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <p className="tracking-wide">
          EcoSort AI &bull; Sustainable Waste Classification Engine &bull; Montserrat Design System
        </p>
      </footer>
    </div>
  );
}
