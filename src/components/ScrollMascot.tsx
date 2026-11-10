import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TOTAL_FRAMES = 240;
const FRAMES_PER_SHEET = 64;
const COLUMNS = 8;
const FRAME_W = 225;
const FRAME_H = 385;
const SHEET_PATHS = [1, 2, 3, 4].map(n => `/d8-frames-${n}.webp`);

type Props = { gazePosition: { x: number; y: number }; gazeActive: boolean };

/** The experimental 15-frame turntable is intentionally disabled until the source assets are clean. */
export default function ScrollMascot(_props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = document.getElementById("d8-hero-scroll-scene");
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context || !section) return;

    const sheets: HTMLImageElement[] = [];
    let disposed = false;
    let raf = 0;
    let current = 0;
    let target = 0;
    let last = -1;

    canvas.width = FRAME_W;
    canvas.height = FRAME_H;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      target = reducedMotion ? 0 : Math.max(0, Math.min(1, -rect.top / distance)) * (TOTAL_FRAMES - 1);
    };
    const draw = (index: number) => {
      const sheet = sheets[Math.floor(index / FRAMES_PER_SHEET)];
      if (!sheet?.complete || !sheet.naturalWidth) return false;
      const tile = index % FRAMES_PER_SHEET;
      context.clearRect(0, 0, FRAME_W, FRAME_H);
      context.drawImage(sheet, (tile % COLUMNS) * FRAME_W, Math.floor(tile / COLUMNS) * FRAME_H, FRAME_W, FRAME_H, 0, 0, FRAME_W, FRAME_H);
      return true;
    };
    const tick = () => {
      if (disposed) return;
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.08) current = target;
      const index = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(current)));
      if (index !== last && draw(index)) {
        last = index;
        setReady(true);
      }
      raf = window.requestAnimationFrame(tick);
    };
    SHEET_PATHS.forEach(src => {
      const img = new Image();
      img.onload = () => { if (!disposed) draw(Math.round(current)); };
      img.onerror = () => { if (!disposed) setFailed(true); };
      sheets.push(img);
      img.src = src;
    });
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    raf = window.requestAnimationFrame(tick);
    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      sheets.forEach(img => { img.onload = null; img.onerror = null; });
    };
  }, [reducedMotion]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <canvas
        ref={canvasRef}
        className={`relative z-10 h-full max-h-[min(80vh,800px)] w-auto max-w-full object-contain transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
        role="img"
        aria-label="Personaje D8 animado por desplazamiento"
      />
      {!ready && <img src="/d8-mascot.webp" alt="Mascota D8" className="absolute inset-0 mx-auto h-full max-h-[80vh] w-auto object-contain" />}
      {failed && <span className="sr-only">No se pudo cargar la animación.</span>}
    </div>
  );
}
