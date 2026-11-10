import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Real alpha WebP frame sequences, driven by the position of the page scroll.
 * Four 8×8 atlases, 240 sequential source frames, no playing video.
 */
const TOTAL_FRAMES = 240;
const FRAMES_PER_SHEET = 64;
const COLUMNS = 8;
const FRAME_W = 225;
const FRAME_H = 385;
const SHEET_PATHS = [1, 2, 3, 4].map((n) => `/d8-frames-${n}.webp`);

type Gaze = "left" | "center" | "right";

export default function ScrollMascot({ gaze, gazeActive }: { gaze: Gaze; gazeActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();
  const [gazeAssetsReady, setGazeAssetsReady] = useState(false);
  const [scrollActive, setScrollActive] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all(["left", "center", "right"].map(direction => new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("gaze image unavailable"));
      img.src = `/d8_look_${direction}.webp`;
    }))).then(() => { if (active) setGazeAssetsReady(true); }).catch(() => {});
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = document.getElementById("d8-hero-scroll-scene");
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context || !section) return;

    const images: HTMLImageElement[] = [];
    let cancelled = false;
    let rafId = 0;
    let currentFrame = 0;
    let targetFrame = 0;
    let lastFrame = -1;
    let initialized = 0;
    let loaded = 0;

    const render = (index: number) => {
      if (cancelled) return;
      const frame = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
      const sheet = images[Math.floor(frame / FRAMES_PER_SHEET)];
      if (!sheet?.complete || sheet.naturalWidth === 0) return;
      const offset = frame % FRAMES_PER_SHEET;
      const x = (offset % COLUMNS) * FRAME_W;
      const y = Math.floor(offset / COLUMNS) * FRAME_H;
      context.clearRect(0, 0, FRAME_W, FRAME_H);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(sheet, x, y, FRAME_W, FRAME_H, 0, 0, FRAME_W, FRAME_H);
    };
    let releaseScroll: number | undefined;
    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      targetFrame = reducedMotion ? 0 : progress * (TOTAL_FRAMES - 1);
      if (!reducedMotion) {
        setScrollActive(true);
        window.clearTimeout(releaseScroll);
        releaseScroll = window.setTimeout(() => setScrollActive(false), 280);
      }
    };
    const tick = () => {
      if (cancelled) return;
      // Smoothing is proportional to frame-distance and works in both directions.
      currentFrame += (targetFrame - currentFrame) * 0.18;
      if (Math.abs(currentFrame - targetFrame) < 0.08) currentFrame = targetFrame;
      const nextFrame = Math.round(currentFrame);
      if (nextFrame !== lastFrame) {
        render(nextFrame);
        lastFrame = nextFrame;
      }
      rafId = window.requestAnimationFrame(tick);
    };
    const onReady = () => {
      initialized += 1;
      loaded += 1;
      if (cancelled) return;
      render(Math.round(currentFrame));
      if (initialized === SHEET_PATHS.length) setReady(loaded === SHEET_PATHS.length);
    };
    const onFailed = () => {
      initialized += 1;
      if (!cancelled) {
        setFailed(true);
        if (initialized === SHEET_PATHS.length) setReady(false);
      }
    };
    SHEET_PATHS.forEach((src) => {
      const img = new Image();
      img.onload = onReady;
      img.onerror = onFailed;
      images.push(img);
      img.src = src;
    });
    canvas.width = FRAME_W;
    canvas.height = FRAME_H;
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    rafId = window.requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(releaseScroll);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      images.forEach(img => { img.onload = null; img.onerror = null; });
    };
  }, [reducedMotion]);

  const showGaze = gazeActive && gazeAssetsReady && !scrollActive && !reducedMotion;

  return (
    <div className="relative flex h-full w-full items-center justify-center" aria-label="Mascota D8 animada mediante el desplazamiento">
      <canvas
        ref={canvasRef}
        className={`relative z-10 h-full max-h-[min(80vh,800px)] w-auto max-w-full object-contain drop-shadow-[0_0_44px_rgba(255,199,45,0.15)] transition-opacity duration-200 ${ready && !failed && !showGaze ? "opacity-100" : "opacity-0"}`}
        role="img"
        aria-label="Personaje D8: desplazate para controlar sus movimientos"
      />
      {showGaze && (["left","center","right"] as const).map(direction => (
        <img key={direction} src={`/d8_look_${direction}.webp`} alt="" aria-hidden="true" draggable={false} className={`pointer-events-none absolute z-20 h-full max-h-[min(80vh,800px)] w-auto max-w-full object-contain drop-shadow-[0_0_44px_rgba(255,199,45,0.15)] transition-opacity duration-200 ${gaze === direction ? "opacity-100" : "opacity-0"}`} />
      ))}
      {(!ready || failed) && !showGaze && (
        <img
          src="/d8-mascot.webp"
          alt="Mascota D8"
          className="absolute inset-0 mx-auto h-full max-h-[80vh] w-auto object-contain"
          onError={(e) => { if (!e.currentTarget.src.endsWith("avatard8.png")) e.currentTarget.src = "/avatard8.png"; }}
        />
      )}
    </div>
  );
}
