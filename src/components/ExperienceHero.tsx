import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Play, X } from "lucide-react";
import { Link } from "react-router-dom";

type ExperienceHeroProps = { onContactClick: () => void };

export default function ExperienceHero({ onContactClick }: ExperienceHeroProps) {
  const reducedMotion = useReducedMotion();
  const [booting, setBooting] = useState(true);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [tvOpen, setTvOpen] = useState(false);
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const [introVideoUnavailable, setIntroVideoUnavailable] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const videoDurationRef = useRef(0);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setTimeout(() => setBooting(false), 4800);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  // El timeline del personaje se controla por scroll, no por autoplay.
  useEffect(() => {
    if (reducedMotion || videoUnavailable) return;
    const video = heroVideoRef.current;
    const section = heroSectionRef.current;
    if (!video || !section) return;
    let frame = 0;
    let lastTime = -1;
    let targetTime = 0;
    let running = true;
    const updateTarget = () => {
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const distance = Math.max(0, -section.getBoundingClientRect().top);
      const progress = Math.min(1, distance / travel);
      targetTime = progress * Math.max(0, videoDurationRef.current - 0.08);
    };
    const tick = () => {
      if (!running) return;
      const duration = videoDurationRef.current;
      if (duration > 0 && video.readyState >= 1) {
        const difference = targetTime - video.currentTime;
        // Evita saltos innecesarios y no disputa seeks en curso.
        if (!video.seeking && Math.abs(difference) > 0.045 && Math.abs(targetTime - lastTime) > 0.025) {
          const next = video.currentTime + difference * 0.32;
          try { video.currentTime = Math.min(duration - 0.04, Math.max(0, next)); lastTime = targetTime; } catch { /* metadata todavía no lista */ }
        }
      }
      frame = window.requestAnimationFrame(tick);
    };
    const onMetadata = () => { videoDurationRef.current = video.duration || 0; video.pause(); updateTarget(); };
    video.addEventListener("loadedmetadata", onMetadata);
    if (video.readyState >= 1) onMetadata();
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);
    updateTarget();
    frame = window.requestAnimationFrame(tick);
    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      video.removeEventListener("loadedmetadata", onMetadata);
    };
  }, [reducedMotion, videoUnavailable]);

  const skipIntro = () => setBooting(false);

  return (
    <>
      {!reducedMotion && booting && (
        <motion.div initial={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050505] px-5 text-white" role="dialog" aria-modal="true" aria-label="Presentación D8 Creative">
          <div className="pointer-events-none absolute inset-0 opacity-25" style={{background:"repeating-linear-gradient(0deg,transparent 0 3px,#ffffff22 4px 5px)"}}/>
          <div className="relative w-full max-w-[730px] overflow-hidden rounded-[2rem] border-[10px] border-[#252525] bg-black shadow-[0_0_100px_#facc1530]">
            {!introVideoUnavailable ? <video src="/d8-intro.mp4" muted autoPlay playsInline preload="metadata" onError={()=>setIntroVideoUnavailable(true)} onEnded={skipIntro} aria-label="Presentación cinematográfica de la mascota D8" className="aspect-video w-full object-cover"/> : <div className="flex aspect-video flex-col items-center justify-center"><span className="font-mono text-xs tracking-[0.3em] text-brand-yellow">D8 CREATIVE / BOOTING</span><p className="mt-5 text-7xl font-black">D<span className="text-brand-yellow">8</span></p></div>}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between gap-3 bg-black/65 px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-white/70 backdrop-blur">
              <span>WELCOME TO D8 / SIGNAL 01</span><span className="text-brand-yellow">REC ●</span>
            </div>
          </div>
          <button type="button" onClick={skipIntro} className="absolute bottom-7 right-6 rounded-full border border-white/30 bg-black/65 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:border-brand-yellow hover:text-brand-yellow">Omitir intro <X size={15} className="ml-2 inline"/></button>
        </motion.div>
      )}

      <section
        ref={heroSectionRef}
        className="relative isolate min-h-[165vh] border-b border-white/10 bg-[#0b0b0e] text-white"
        onPointerMove={(event) => {
          if (reducedMotion || event.pointerType !== "mouse") return;
          const rect = event.currentTarget.getBoundingClientRect();
          setPointer({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 });
        }}
        onPointerLeave={() => setPointer({ x: 0, y: 0 })}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(255,215,0,0.12),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-15" style={{ background: "repeating-linear-gradient(0deg,transparent 0 5px,#fefefe0a 6px 7px)" }} />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-30" style={{ backgroundImage: "linear-gradient(90deg,transparent 95%,#eab30820 100%)", backgroundSize: "90px 100%" }} />

        <div className="container sticky top-0 z-10 mx-auto grid min-h-screen items-center gap-8 px-5 pb-16 pt-28 lg:grid-cols-[1.03fr_0.97fr]">
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.75 }} className="relative z-10">
            <div className="mb-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em] text-brand-yellow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" /> Estudio creativo & tecnológico
            </div>
            <h1 className="max-w-3xl text-[clamp(3.25rem,6.4vw,6.9rem)] font-black uppercase leading-[0.95] tracking-[-0.065em]">
              Ideas que se convierten en <span className="text-brand-yellow">experiencias.</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-white/65 md:text-lg">
              Web, producción audiovisual, diseño y estrategia digital. Combinamos creatividad y tecnología para marcas que quieren destacarse.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#trabajos-destacados" className="inline-flex items-center gap-3 rounded-full bg-brand-yellow px-7 py-4 text-xs font-black uppercase tracking-wider text-black transition-transform hover:-translate-y-1">Explorar proyectos <ArrowDownRight size={17} /></a>
              <button type="button" onClick={onContactClick} className="inline-flex items-center gap-3 rounded-full border border-white/30 px-7 py-4 text-xs font-black uppercase tracking-wider text-white transition-colors hover:border-brand-yellow hover:text-brand-yellow">Hablemos de tu idea <ArrowUpRight size={17} /></button>
            </div>
            <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Diseño • Tecnología • Historias • Impacto</p>
          </motion.div>
          <div className="relative mx-auto flex min-h-[390px] w-full max-w-[610px] items-center justify-center md:min-h-[570px]">
            <div className="pointer-events-none absolute inset-[10%] rounded-full bg-brand-yellow/10 blur-[90px]" />
            <motion.div style={reducedMotion ? undefined : { x: pointer.x * -22, y: pointer.y * -18 }} transition={{ type: "spring", damping: 22, stiffness: 90 }} className="absolute left-0 top-8 z-20 rounded-xl border border-white/15 bg-black/60 px-4 py-3 font-mono text-[10px] leading-relaxed tracking-widest text-white/65 backdrop-blur-md">
              <span className="text-brand-yellow">D8/SYSTEM</span><br />CREATIVITY: ONLINE
            </motion.div>
            <motion.div
              animate={reducedMotion ? undefined : { y: [-9, 9, -9] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={reducedMotion ? undefined : { rotateY: pointer.x * 9, rotateX: pointer.y * -7 }}
              className="relative z-10 w-[84%] max-w-[490px] [transform-style:preserve-3d]"
            >
              {!reducedMotion && !videoUnavailable ? (
                <video ref={heroVideoRef} muted playsInline preload="auto" poster="/d8-hero-poster.webp" onError={() => setVideoUnavailable(true)} aria-label="Mascota D8 Creative animada" className="h-auto w-full rounded-3xl object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.65)]">
                  <source src="/d8-hero-loop.mp4" type="video/mp4" />
                </video>
              ) : (
                <img src="/d8-mascot.webp" onError={(e) => { e.currentTarget.src = "/avatard8.png"; }} alt="Mascota voxel D8 Creative" fetchPriority="high" className="h-auto w-full object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.65)]" />
              )}
            </motion.div>
            <div className="absolute bottom-6 right-0 z-20 max-w-[210px] rounded-2xl border border-brand-yellow/25 bg-black/65 p-4 backdrop-blur-xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-yellow">D8 / PLAY</span>
              <p className="mt-2 text-sm font-semibold">Lo diferente empieza con una idea.</p>
              <button type="button" onClick={() => setTvOpen(true)} className="mt-3 flex items-center gap-2 text-xs text-white/70 hover:text-brand-yellow"><Play size={14} /> Activar señal</button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-9 left-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 md:left-12"><span className="h-px w-10 bg-brand-yellow" /> Scroll para animar al personaje</div>
      </section>

      {tvOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-5 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Señal D8">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border-[10px] border-[#29292b] bg-[#050505] p-10 text-center shadow-[0_0_80px_#facc1530]">
            <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "repeating-linear-gradient(0deg,transparent 0 3px,#ffffff20 4px 5px)" }} />
            <span className="relative font-mono text-xs tracking-widest text-brand-yellow">D8 CREATIVE / TRANSMISIÓN</span>
            <h2 className="relative mt-8 text-5xl font-black uppercase">La señal está <span className="text-brand-yellow">activa.</span></h2>
            <p className="relative mt-5 text-white/60">Bienvenido a un espacio donde conviven diseño, tecnología y creatividad.</p>
            <Link to="/web" onClick={() => setTvOpen(false)} className="relative mt-9 inline-flex rounded-full bg-brand-yellow px-7 py-4 text-xs font-black uppercase text-black">Ver trabajos</Link>
          </div>
          <button type="button" onClick={() => setTvOpen(false)} className="absolute right-6 top-6 text-white" aria-label="Cerrar señal"><X size={26} /></button>
        </div>
      )}
    </>
  );
}
