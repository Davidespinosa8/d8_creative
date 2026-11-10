import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Independent input channels:
 * - scroll controls 240-frame narrative action
 * - mouse / touch selects one of 15 consistent turn-around poses
 * The character is drawn on one canvas, with no double-image crossfades.
 */
const SCROLL_FRAMES = 240;
const SHEET_SIZE = 64;
const SHEET_COLS = 8;
const SOURCE_W = 225;
const SOURCE_H = 385;
const VIEW_W = 480;
const VIEW_H = 760;
const TURN_COUNT = 15;

type GazePosition = { x: number; y: number };
type Props = { gazePosition: GazePosition; gazeActive: boolean };

export default function ScrollMascot({ gazePosition, gazeActive }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const positionRef = useRef(gazePosition);
  const activeRef = useRef(gazeActive);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => { positionRef.current = gazePosition; }, [gazePosition]);
  useEffect(() => { activeRef.current = gazeActive; }, [gazeActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = document.getElementById("d8-hero-scroll-scene");
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx || !section) return;

    let disposed = false;
    let raf = 0;
    let lastWheelAt = -10000;
    let scrollTarget = 0;
    let currentScroll = 0;
    let currentTurn = (TURN_COUNT - 1) / 2;
    let lastDrawn = "";
    let scrollLoaded = 0;
    let rotationLoaded = 0;
    let rotationFailed = false;
    const sheets: HTMLImageElement[] = [];
    const rotations: HTMLImageElement[] = [];

    canvas.width = VIEW_W;
    canvas.height = VIEW_H;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const maxDistance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / maxDistance));
      scrollTarget = reducedMotion ? 0 : progress * (SCROLL_FRAMES - 1);
      lastWheelAt = performance.now();
    };

    const drawScroll = (index: number) => {
      const clamped = Math.min(SCROLL_FRAMES - 1, Math.max(0, index));
      const sheet = sheets[Math.floor(clamped / SHEET_SIZE)];
      if (!sheet?.complete || !sheet.naturalWidth) return false;
      const position = clamped % SHEET_SIZE;
      const sx = (position % SHEET_COLS) * SOURCE_W;
      const sy = Math.floor(position / SHEET_COLS) * SOURCE_H;
      ctx.clearRect(0, 0, VIEW_W, VIEW_H);
      ctx.drawImage(sheet, sx, sy, SOURCE_W, SOURCE_H, 0, 0, VIEW_W, VIEW_H);
      return true;
    };

    const drawRotation = (index: number) => {
      const img = rotations[index];
      if (!img?.complete || !img.naturalWidth) return false;
      ctx.clearRect(0, 0, VIEW_W, VIEW_H);
      ctx.drawImage(img, 0, 0, VIEW_W, VIEW_H);
      return true;
    };

    const tick = () => {
      if (disposed) return;
      const now = performance.now();
      const scrolling = !reducedMotion && now - lastWheelAt < 350;
      const canTurn = !reducedMotion && !rotationFailed && rotationLoaded === TURN_COUNT;
      const targetTurn = activeRef.current
        ? ((Math.max(-1, Math.min(1, positionRef.current.x)) + 1) / 2) * (TURN_COUNT - 1)
        : (TURN_COUNT - 1) / 2;
      // A stable ease-in/out motion, equally smooth returning toward the center.
      currentTurn += (targetTurn - currentTurn) * 0.11;
      currentScroll += (scrollTarget - currentScroll) * 0.17;

      // Mouse overrides the scroll pose while stationary; wheel temporarily takes precedence.
      const showTurn = canTurn && !scrolling;
      const frame = showTurn ? Math.round(currentTurn) : Math.round(currentScroll);
      const id = (showTurn ? "turn-" : "scroll-") + frame;
      if (id !== lastDrawn) {
        const displayed = showTurn ? drawRotation(frame) : drawScroll(frame);
        if (displayed) {
          lastDrawn = id;
          setReady(previous => previous || true);
        }
      }
      raf = window.requestAnimationFrame(tick);
    };

    const onSheetLoad = () => { scrollLoaded += 1; };
    const onSheetError = () => { if (!disposed) setFailed(true); };
    const onTurnLoad = () => { rotationLoaded += 1; };
    const onTurnError = () => { rotationFailed = true; };

    [1, 2, 3, 4].forEach(n => {
      const img = new Image();
      img.onload = onSheetLoad;
      img.onerror = onSheetError;
      sheets.push(img);
      img.src = `/d8-frames-${n}.webp`;
    });
    for (let n = 1; n <= TURN_COUNT; n += 1) {
      const img = new Image();
      img.onload = onTurnLoad;
      img.onerror = onTurnError;
      rotations.push(img);
      img.src = `/d8_turn_${String(n).padStart(2, "0")}.webp`;
    }

    const handleScroll = () => onScroll();
    const handleResize = () => {
      const rect = section.getBoundingClientRect();
      const maxDistance = Math.max(1, rect.height - window.innerHeight);
      scrollTarget = Math.max(0, Math.min(1, -rect.top / maxDistance)) * (SCROLL_FRAMES - 1);
    };
    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    raf = window.requestAnimationFrame(tick);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      [...sheets, ...rotations].forEach(img => { img.onload = null; img.onerror = null; });
    };
  }, [reducedMotion]);

  return (
    <div className="relative flex h-full w-full items-center justify-center" aria-label="Mascota D8: seguimiento del puntero y animación por scroll">
      <canvas
        ref={canvasRef}
        className={`relative z-10 h-full max-h-[min(80vh,800px)] w-auto max-w-full object-contain drop-shadow-[0_0_34px_rgba(255,199,45,0.12)] transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
        role="img"
        aria-label="Desplazate para animar al personaje, mové el puntero para girarlo"
      />
      {!ready && (
        <img
          src="/d8-mascot.webp"
          alt="Mascota D8"
          className="absolute inset-0 mx-auto h-full max-h-[80vh] w-auto object-contain"
          onError={e => {
            if (!e.currentTarget.src.endsWith("avatard8.png")) e.currentTarget.src = "/avatard8.png";
          }}
        />
      )}
      {failed && <span className="sr-only">Algunas imágenes de animación no se pudieron cargar.</span>}
    </div>
  );
}
