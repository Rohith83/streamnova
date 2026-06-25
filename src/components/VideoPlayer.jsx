import { useState, useEffect, useRef, useCallback } from "react";
import {
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiMaximize,
  FiSkipBack,
  FiSkipForward,
} from "react-icons/fi";

const TOTAL_SECONDS = 60 * 96; // simulate a ~96 minute movie

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export default function VideoPlayer({ movie, onProgress }) {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(8); // start a bit in, simulating resume
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef(null);
  const hideTimer = useRef(null);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const next = Math.min(prev + 1, TOTAL_SECONDS);
        if (next >= TOTAL_SECONDS) setPlaying(false);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    const progressPct = Math.round((current / TOTAL_SECONDS) * 100);
    onProgress?.(progressPct);
  }, [current, onProgress]);

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3000);
  }, [playing]);

  useEffect(() => {
    resetHideTimer();
    return () => clearTimeout(hideTimer.current);
  }, [playing, resetHideTimer]);

  const togglePlay = () => setPlaying((p) => !p);
  const skip = (delta) =>
    setCurrent((prev) => Math.max(0, Math.min(TOTAL_SECONDS, prev + delta)));

  const handleSeek = (e) => {
    const pct = parseFloat(e.target.value);
    setCurrent(Math.round((pct / 100) * TOTAL_SECONDS));
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const progressPct = (current / TOTAL_SECONDS) * 100;

  return (
    <div
      ref={containerRef}
      onMouseMove={resetHideTimer}
      className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group"
    >
      <img
        src={movie.backdrop}
        alt={movie.title}
        className="w-full h-full object-cover opacity-60"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />

      <button
        onClick={togglePlay}
        aria-label={playing ? "Pause" : "Play"}
        className="absolute inset-0 flex items-center justify-center"
      >
        {!playing && (
          <span className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/25 transition-colors">
            <FiPlay size={32} className="fill-white text-white ml-1" />
          </span>
        )}
      </button>

      <div
        className={`absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-4 pt-16 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progressPct}
          onChange={handleSeek}
          aria-label="Seek"
          className="w-full mb-3"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => skip(-10)} aria-label="Back 10 seconds" className="text-white hover:text-accent-highlight transition-colors">
              <FiSkipBack size={18} />
            </button>
            <button onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} className="text-white hover:text-accent-highlight transition-colors">
              {playing ? <FiPause size={20} /> : <FiPlay size={20} />}
            </button>
            <button onClick={() => skip(10)} aria-label="Forward 10 seconds" className="text-white hover:text-accent-highlight transition-colors">
              <FiSkipForward size={18} />
            </button>

            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Unmute" : "Mute"}
                className="text-white hover:text-accent-highlight transition-colors"
              >
                {muted || volume === 0 ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={muted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setMuted(false);
                }}
                aria-label="Volume"
                className="w-20 hidden sm:block"
              />
            </div>

            <span className="text-xs text-white/80 ml-2 hidden sm:inline">
              {formatTime(current)} / {formatTime(TOTAL_SECONDS)}
            </span>
          </div>

          <button
            onClick={toggleFullscreen}
            aria-label="Toggle fullscreen"
            className="text-white hover:text-accent-highlight transition-colors"
          >
            <FiMaximize size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
