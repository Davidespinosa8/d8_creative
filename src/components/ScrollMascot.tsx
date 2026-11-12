import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const SCROLL_COUNT = 240;
const SCROLL_TILE_W = 225;
const SCROLL_TILE_H = 385;
const TURN_COUNT = 10;
const TURN_TILE_W = 320;
const TURN_TILE_H = 640;

type Props = { gazePosition: { x: number; y: number }; gazeActive: boolean };

/** A single canvas alternates scroll motion and 10 aligned turntable views.
 * The turntable atlas is optional; scrolling always has its original fallback.
 */
export default function ScrollMascot({ gazePosition, gazeActive }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef(gazePosition);
  const pointerActive = useRef(gazeActive);
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => { pointer.current = gazePosition; }, [gazePosition]);
  useEffect(() => { pointerActive.current = gazeActive; }, [gazeActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = document.getElementById("d8-hero-scroll-scene");
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !section || !ctx) return;
    canvas.width = TURN_TILE_W;
    canvas.height = TURN_TILE_H;
    let disposed = false;
    let raf = 0;
    let scrollTarget = 0;
    let scrollCurrent = 0;
    let turnCurrent = 4.5;
    let scrollingUntil = 0;
    let currentId = "";
    let atlasReady = false;
    const scrollImages: HTMLImageElement[] = [];
    const atlas = new Image();

    const render = (kind: "scroll" | "turn", index: number): boolean => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (kind === "turn") {
        if (!atlasReady) return false;
        const tileX = index % 5;
        const tileY = Math.floor(index / 5);
        ctx.drawImage(atlas, tileX * TURN_TILE_W, tileY * TURN_TILE_H,
          TURN_TILE_W, TURN_TILE_H, 0, 0, canvas.width, canvas.height);
        return true;
      }
      const sheet = scrollImages[Math.floor(index / 64)];
      if (!sheet?.complete || !sheet.naturalWidth) return false;
      const slot = index % 64;
      // Center content and keep the floor baseline aligned between the two systems.
      const drawnWidth = 320;
      const drawnHeight = 548;
      ctx.drawImage(sheet, (slot % 8) * SCROLL_TILE_W,
        Math.floor(slot / 8) * SCROLL_TILE_H,
        SCROLL_TILE_W, SCROLL_TILE_H,
        0, canvas.height - drawnHeight, drawnWidth, drawnHeight);
      return true;
    };
    const updatePosition = () => {
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const percent = Math.max(0, Math.min(1, -rect.top / distance));
      scrollTarget = reducedMotion ? 0 : percent * (SCROLL_COUNT - 1);
    };
    const onScroll = () => {
      updatePosition();
      scrollingUntil = performance.now() + 320;
    };
    const tick = () => {
      if (disposed) return;
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.18;
      turnCurrent += ((pointerActive.current ? Math.max(-1, Math.min(1, pointer.current.x)) : 0) * 4.5 + 4.5 - turnCurrent) * 0.12;

      const useTurn = !reducedMotion && atlasReady && performance.now() > scrollingUntil;
      const index = useTurn
        ? Math.min(TURN_COUNT - 1, Math.max(0, Math.round(turnCurrent)))
        : Math.min(SCROLL_COUNT - 1, Math.max(0, Math.round(scrollCurrent)));
      const id = (useTurn ? "turn" : "scroll") + index;
      if (id !== currentId && render(useTurn ? "turn" : "scroll", index)) {
        currentId = id;
        setReady(true);
      }
      raf = requestAnimationFrame(tick);
    };
    for (let n = 1; n <= 4; n++) {
      const image = new Image();
      image.onload = () => { currentId = ""; };
      scrollImages.push(image);
      image.src = `/d8-frames-${n}.webp`;
    }
    atlas.onload = () => {
      if (!disposed && atlas.naturalWidth === TURN_TILE_W * 5 && atlas.naturalHeight === TURN_TILE_H * 2) {
        atlasReady = true;
        currentId = "";
      }
    };
    atlas.onerror = () => { atlasReady = false; };
    atlas.src = "/d8_turn_10_atlas.webp";
    updatePosition();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updatePosition);
    raf = requestAnimationFrame(tick);
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updatePosition);
      atlas.onload = null;
      atlas.onerror = null;
      scrollImages.forEach(image => { image.onload = null; });
    };
  }, [reducedMotion]);

  return <div className="relative flex h-full w-full items-center justify-center">
    <canvas ref={canvasRef} role="img" aria-label="Personaje D8: gira con el puntero y se anima con el scroll"
      className={`relative z-10 h-full max-h-[min(80vh,800px)] w-auto max-w-full object-contain transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`} />
    {!ready && <img src="/d8-mascot.webp" alt="Personaje D8" className="absolute inset-0 mx-auto h-full max-h-[80vh] w-auto object-contain" />}
  </div>;
}
