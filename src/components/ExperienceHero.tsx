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
        if (!video.seeking && Math.abs(difference) > 0.045) {
          const next = video.currentTime + difference * 0.32;
          try { video.currentTime = Math.min(duration - 0.04, Math.max(0, next)); } catch { /* metadata todavía no lista */ }
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
        className="relative isolate h-[230vh] border-b border-white/10 bg-[#080a0d] text-white"
        onPointerMove={(event) => {
          if (reducedMotion || event.pointerType !== "mouse") return;
          const rect = event.currentTarget.getBoundingClientRect();
          setPointer({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 });
        }}
        onPointerLeave={() => setPointer({ x: 0, y: 0 })}
      >
        <div className="sticky top-0 isolate h-screen w-full overflow-hidden">
          {/* Escena a pantalla completa: video y tipografía son capas del mismo escenario. */}
          <div className="pointer-events-none absolute inset-0 bg-[#090b0e]">
            <div className="absolute inset-0 opacity-80" style={{ background: "radial-gradient(ellipse at 78% 55%,#30200f 0%,#10151f 35%,#090a0d 75%)" }} />
            <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(90deg,#fbbf2413 1px,transparent 1px),linear-gradient(0deg,#fbbf2409 1px,transparent 1px)",backgroundSize:"100px 100px" }} />
            <div className="absolute right-0 top-0 h-1/2 w-1/2 opacity-20 blur-3xl" style={{background:"radial-gradient(ellipse,#facc15,transparent 65%)"}} />
          </div>
          <motion.div className="pointer-events-none absolute -right-[7%] bottom-0 top-0 z-[1] flex h-full w-[100%] items-center justify-end overflow-hidden md:w-[78%]"
            style={reducedMotion ? undefined : {x:pointer.x * -16,y:pointer.y * -9}}>
            {!reducedMotion && !videoUnavailable ? (
              <video ref={heroVideoRef} muted playsInline preload="auto" poster="/d8-hero-poster.webp" onError={() => setVideoUnavailable(true)} aria-label="Mascota D8 Creative: el movimiento responde al desplazamiento" className="h-full w-full object-cover object-[65%_center] opacity-95 [mask-image:linear-gradient(to_right,transparent_0%,black_23%,black_100%)] md:object-center">
                <source src="/d8-hero-loop.mp4" type="video/mp4" />
              </video>
            ) : (
              <img src="/d8-mascot.webp" onError={e=>{if(!e.currentTarget.src.includes("avatard8"))e.currentTarget.src="/avatard8.png"}} alt="Mascota voxel D8 Creative" className="h-full w-full object-contain object-right opacity-90 [mask-image:linear-gradient(to_right,transparent,black_35%)]" />
            )}
          </motion.div>
          {/* Degradado editorial para asegurar que el texto sea legible sobre la secuencia. */}
          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#080a0d] via-[#080a0deb] to-transparent md:via-[#080a0dc0]" />
          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#080a0dba] via-transparent to-[#080a0d44]" />
          <div className="pointer-events-none absolute inset-0 z-[3] opacity-[0.11]" style={{background:"repeating-linear-gradient(0deg,transparent 0 4px,#ffffff21 5px 6px)"}} />
          <div className="container relative z-10 mx-auto flex h-full items-center px-5 pb-24 pt-28 md:px-8">
            <motion.div initial={reducedMotion ? false : {opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="max-w-[740px]">
              <div className="mb-7 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-brand-yellow"><span className="h-1.5 w-1.5 rounded-full bg-brand-yellow"/> Diseño × Tecnología × Impacto</div>
              <h1 className="text-[clamp(3.25rem,6.9vw,7.2rem)] font-black uppercase leading-[0.92] tracking-[-0.063em]">Digital <br/>experiences <br/>that <span className="text-brand-yellow">move people.</span></h1>
              <p className="mt-8 max-w-[480px] text-sm leading-relaxed text-white/75 md:text-lg">Creamos sitios web, contenido audiovisual, identidad y productos digitales para marcas con ideas que merecen destacarse.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#trabajos-destacados" className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-4 text-xs font-black uppercase text-black transition-transform hover:-translate-y-1">Ver proyectos <ArrowDownRight size={16}/></a>
                <button onClick={onContactClick} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/30 px-6 py-4 text-xs font-black uppercase text-white hover:border-brand-yellow">Iniciar proyecto <ArrowUpRight size={16}/></button>
              </div>
            </motion.div>
          </div>
          <div className="pointer-events-none absolute bottom-6 left-6 z-20 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-white/60 md:left-10"><span className="h-px w-8 bg-brand-yellow"/> Scroll para dar vida a la escena</div>
          <button type="button" onClick={()=>setTvOpen(true)} className="absolute bottom-6 right-6 z-20 rounded-full border border-white/25 bg-black/50 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-brand-yellow backdrop-blur hover:border-brand-yellow"><Play size={12} className="mr-2 inline"/> Señal D8</button>
        </div>
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
