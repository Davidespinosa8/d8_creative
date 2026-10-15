import { useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, CloudRain, RotateCcw, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

export function StorySequence() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const figureY = useTransform(scrollYProgress, [0,1], [90,-95]);
  const figureRotate = useTransform(scrollYProgress, [0,1], [-8,10]);
  return <section ref={ref} className="relative isolate overflow-hidden border-y border-white/10 bg-[#111319] px-5 py-24 text-white md:py-36">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(238,184,42,0.12),transparent_50%)]"/>
    <div className="container relative mx-auto grid items-center gap-10 lg:grid-cols-2">
      <div className="relative order-2 flex min-h-[340px] items-center justify-center lg:order-1">
        <div className="absolute h-[72%] w-[65%] rounded-full bg-yellow-400/10 blur-[70px]" />
        <motion.img src="/avatard8.png" alt="Personaje de D8 Creative en una escena de scroll narrativa" loading="lazy" style={reduced ? undefined : { y:figureY, rotate:figureRotate }} className="relative z-10 max-h-[440px] w-auto max-w-full object-contain drop-shadow-[0_22px_30px_rgba(0,0,0,0.65)]" />
        <span className="absolute bottom-0 left-2 rounded border border-white/20 bg-black/60 px-3 py-2 font-mono text-[10px] tracking-widest text-yellow-300">PIXEL ORIGIN / FUTURE MOTION</span>
      </div>
      <div className="order-1 lg:order-2"><span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-yellow">02 / De pixel a experiencia</span><h2 className="mt-6 max-w-xl text-4xl font-black uppercase leading-[1.05] md:text-6xl">Una identidad. <span className="text-brand-yellow">Mil formas de crear.</span></h2><p className="mt-7 max-w-lg text-base leading-relaxed text-white/65">Nacimos con una estética 8-bit. Hoy combinamos desarrollo web, producción audiovisual, identidad visual y estrategia para construir experiencias digitales memorables.</p><p className="mt-5 text-sm text-white/45">Mové el scroll y acompañá la transformación del universo D8.</p></div>
    </div>
  </section>;
}
export function CreativeLab() {
  const [effect,setEffect] = useState<"crt"|"rain"|"glow">("crt");
  const [intensity,setIntensity] = useState(45);
  const [label,setLabel] = useState("D8 CREATIVE");
  const [liked,setLiked] = useState(false);
  const reduced = useReducedMotion();
  return <section id="d8-lab" className="bg-[#0d0d10] px-5 py-24 text-white md:py-32">
    <div className="container mx-auto">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand-yellow">05 / Interaction playground</p><h2 className="mt-4 text-5xl font-black uppercase md:text-7xl">D8 <span className="text-brand-yellow">LAB_</span></h2><p className="mt-5 max-w-2xl text-white/55">No es una promesa: probá cómo una interfaz cambia cuando jugás con sus variables. Una pequeña muestra del pensamiento interactivo detrás de nuestros productos.</p>
      <div className="mt-11 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative flex min-h-[340px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#18191c] p-8 md:min-h-[430px]">
          <div className="pointer-events-none absolute inset-0" style={{background:effect==="glow"?"radial-gradient(circle at center,rgba(246,200,47,0.32),transparent 66%)":effect==="rain"?"repeating-linear-gradient(110deg,transparent 0 16px,rgba(179,202,236,0.17) 17px 18px,transparent 19px 38px)":"repeating-linear-gradient(0deg,transparent 0 4px,rgba(255,255,255,0.10) 5px 6px)",opacity:intensity/100}} />
          <motion.div animate={reduced?undefined:{y:[-4,4,-4]}} transition={{duration:5,repeat:Infinity}} className="relative z-10 flex flex-col items-center gap-4">
            <Sparkles size={38} className="text-brand-yellow"/><p className="break-all text-center text-3xl font-black uppercase tracking-tight md:text-6xl" style={{textShadow:`0 0 ${intensity/2}px rgba(255,220,80,.7)`}}>{label.trim()||"D8 CREATIVE"}</p><p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">{effect} / LIVE EXPERIMENT</p>
          </motion.div>
          <span className="absolute bottom-5 left-6 font-mono text-[10px] text-white/35">D8-LAB / 001</span>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[#19191c] p-6 md:p-8">
          <h3 className="text-xl font-black uppercase">Visual FX Console</h3><p className="mt-2 text-sm text-white/50">Modificá la escena en tiempo real.</p>
          <div className="mt-8 flex flex-wrap gap-2">{(["crt","rain","glow"] as const).map(mode=><button key={mode} type="button" onClick={()=>setEffect(mode)} aria-pressed={effect===mode} className={`rounded-full px-4 py-2 font-mono text-xs uppercase ${effect===mode?"bg-brand-yellow text-black":"border border-white/20 text-white/70"}`}>{mode==="rain"?<CloudRain size={13} className="mr-1 inline"/>:null}{mode}</button>)}</div>
          <label htmlFor="d8-lab-intensity" className="mt-8 block text-xs font-bold uppercase tracking-widest">Intensidad — {intensity}%</label><input id="d8-lab-intensity" type="range" min="5" max="100" value={intensity} onChange={e=>setIntensity(Number(e.target.value))} className="mt-4 w-full accent-yellow-400"/>
          <label htmlFor="d8-lab-text" className="mt-7 block text-xs font-bold uppercase tracking-widest">Texto de la escena</label><input id="d8-lab-text" maxLength={24} value={label} onChange={e=>setLabel(e.target.value)} className="mt-3 w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-brand-yellow"/>
          <div className="mt-7 flex items-center justify-between"><button onClick={()=>{setEffect("crt");setIntensity(45);setLabel("D8 CREATIVE")}} className="flex items-center gap-2 text-xs text-white/65 hover:text-brand-yellow"><RotateCcw size={14}/> Reiniciar</button><button onClick={()=>setLiked(v=>!v)} aria-pressed={liked} className="text-xs font-bold text-brand-yellow">{liked?"★ Guardado en favoritos":"☆ Me gusta este experimento"}</button></div>
        </div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-3">{[{heading:"Desarrollo web",text:"Sistemas y experiencias reales.",url:"/web"},{heading:"Tarjetas interactivas",text:"Historias y eventos convertidos en experiencias.",url:"/tarjetas"},{heading:"Audiovisual",text:"Montaje, motion y creatividad aplicada.",url:"/audiovisual"}].map(x=><Link to={x.url} key={x.heading} className="group rounded-2xl border border-white/10 p-6 transition-colors hover:border-brand-yellow/50"><div className="flex items-center justify-between"><h3 className="font-black uppercase">{x.heading}</h3><ArrowUpRight size={16}/></div><p className="mt-3 text-sm text-white/55">{x.text}</p></Link>)}</div>
    </div>
  </section>;
}
export function BehindD8() {
  const moments=[{name:"Producción audiovisual",desc:"Reels, trailers y postproducción para historias que necesitan ritmo.",to:"/audiovisual"},{name:"Diseño y estrategia",desc:"Experiencias con marcas de indumentaria, gastronomía y servicios.",to:"/branding"},{name:"Nuevas experiencias",desc:"Herramientas, invitaciones y pequeñas ideas llevadas a la web.",to:"/tarjetas"}];
  return <section className="bg-[#151518] px-5 py-24 text-white"><div className="container mx-auto"><p className="font-mono text-xs uppercase tracking-[0.25em] text-brand-yellow">06 / Detrás del estudio</p><h2 className="mt-5 text-4xl font-black uppercase md:text-6xl">El proceso <span className="text-brand-yellow">también importa.</span></h2><p className="mt-6 max-w-xl text-white/55">Más que una galería, D8 es un laboratorio de ideas y soluciones construidas para personas reales.</p><div className="mt-10 grid gap-4 md:grid-cols-3">{moments.map((x,i)=><Link to={x.to} key={x.name} className="rounded-3xl border border-white/10 bg-[#1d1d20] p-8 transition-colors hover:border-brand-yellow/50"><p className="font-mono text-xs text-brand-yellow">0{i+1} / STUDIO</p><h3 className="mt-7 text-xl font-black uppercase">{x.name}</h3><p className="mt-4 text-sm text-white/55">{x.desc}</p><p className="mt-8 text-xs font-bold uppercase text-brand-yellow">Descubrir ↗</p></Link>)}</div></div></section>;
}
