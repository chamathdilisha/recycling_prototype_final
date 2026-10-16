import { useCallback, useEffect, useRef, useState } from "react";

export default function CameraCapture({ isOpen, onClose, onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [permissionError, setPermissionError] = useState(null);
  const [isStarting, setIsStarting] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const [flashActive, setFlashActive] = useState(false);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startStream = useCallback(async (mode) => {
    stopStream();
    setPermissionError(null);
    setIsStarting(true);

    try {
      const stream = await navigator.mediaDevices?.getUserMedia({
        video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsStarting(false);
    } catch (err) {
      setIsStarting(false);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setPermissionError("Camera access denied. Please allow camera permissions in your browser address bar.");
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setPermissionError("No camera found on this device.");
      } else {
        setPermissionError("Unable to initialize camera stream. Please try again.");
      }
    }
  }, [stopStream]);

  useEffect(() => {
    if (!isOpen) {
      stopStream();
      return;
    }

    startStream(facingMode);

    return () => {
      stopStream();
    };
  }, [isOpen, facingMode, startStream, stopStream]);

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 200);

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    stopStream();
    onCapture(dataUrl);
  };

  const handleClose = () => {
    stopStream();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-4 sm:p-6 animate-fadeIn">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-emerald-500/30 bg-slate-900/90 shadow-2xl shadow-emerald-950/50 flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase text-white">Live AI Viewfinder</h3>
              <p className="text-[11px] text-slate-400">Position the item clearly in the center</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close camera"
          >
            ✕
          </button>
        </div>

        {/* Viewfinder Window */}
        <div className="relative aspect-4/3 w-full bg-black overflow-hidden flex items-center justify-center">
          {permissionError ? (
            <div className="flex flex-col items-center justify-center p-8 text-center max-w-sm">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-rose-400 mb-2">Camera Unavailable</p>
              <p className="text-xs text-slate-400 leading-relaxed">{permissionError}</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />

              {/* Viewfinder Reticle Corners */}
              <div className="pointer-events-none absolute inset-6 border border-emerald-500/20 rounded-2xl">
                {/* Top-Left */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-emerald-400 rounded-tl-lg" />
                {/* Top-Right */}
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-emerald-400 rounded-tr-lg" />
                {/* Bottom-Left */}
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-emerald-400 rounded-bl-lg" />
                {/* Bottom-Right */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-emerald-400 rounded-br-lg" />

                {/* Center Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Flash effect */}
              {flashActive && <div className="absolute inset-0 bg-white opacity-80 transition-opacity duration-150 pointer-events-none" />}

              {isStarting && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
                  <span className="text-xs font-medium text-emerald-300 tracking-wider uppercase">Connecting Camera...</span>
                </div>
              )}
            </>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {/* Modal Controls */}
        <div className="flex items-center justify-between bg-slate-900/95 border-t border-white/10 px-6 py-4">
          <button
            type="button"
            onClick={toggleFacingMode}
            disabled={!!permissionError || isStarting}
            className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Flip Lens
          </button>

          {/* Shutter Button */}
          <button
            type="button"
            onClick={handleCapture}
            disabled={!!permissionError || isStarting}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30 transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-emerald-400"
            aria-label="Capture frame"
          >
            <span className="h-10 w-10 rounded-full border-2 border-slate-900 bg-white transition-transform group-hover:scale-95" />
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
