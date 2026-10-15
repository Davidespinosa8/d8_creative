import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MonitorPlay, Clapperboard, Palette, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

type Category = "Todos" | "Web & Apps" | "Audiovisual" | "Branding" | "Marketing";
const filters: Category[] = ["Todos", "Web & Apps", "Audiovisual", "Branding", "Marketing"];
const work = [
  { title: "Golden Gym", category: "Web & Apps", type: "Plataforma de gestión", detail: "Socios, rutinas, autenticación y gestión de datos.", url: "https://goldengym.pro/", preview: "https://goldengym.pro/", accent: "#c3a569" },
  { title: "Top Cinema", category: "Web & Apps", type: "Web audiovisual", detail: "Identidad, diseño de interfaz y desarrollo para una marca creativa.", url: "https://topcinema-six.vercel.app/", preview: "https://topcinema-six.vercel.app/", accent: "#aa565f" },
  { title: "Top Cinema IA", category: "Web & Apps", type: "Experiencia digital", detail: "Interacciones y narrativa audiovisual experimental.", url: "https://topcinema-ia.vercel.app/", preview: "https://topcinema-ia.vercel.app/", accent: "#6e69ba" },
  { title: "Edición audiovisual", category: "Audiovisual", type: "Reels, trailers y contenido", detail: "Narrativa, ritmo, montaje y formatos para distintas plataformas.", url: "/audiovisual", youtube: "M531NPaq6pY", accent: "#666666" },
  { title: "Jut Now", category: "Branding", type: "Contenido e identidad", detail: "Piezas de producto, comunicación mayorista y diseño visual para indumentaria.", url: "/branding", accent: "#ea3393" },
  { title: "Campañas y estrategia", category: "Marketing", type: "Marketing digital", detail: "Concepto creativo, planificación y campañas para negocios reales.", url: "/branding", accent: "#c58c48" },
];
export default function FeaturedWorks() {
  const [active, setActive] = useState<Category>("Todos");
  const reduced = useReducedMotion();
  const shown = active === "Todos" ? work : work.filter(item => item.category === active);
  return <section id="trabajos-destacados" className="relative bg-[#0b0b0e] px-5 py-24 text-white md:py-32">
    <div className="container mx-auto">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div><p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-brand-yellow">03 / Portfolio seleccionado</p><h2 className="text-4xl font-black uppercase tracking-tight md:text-7xl">No solo lo <span className="text-brand-yellow">imaginamos.</span></h2><p className="mt-5 max-w-xl text-base text-white/55">Lo diseñamos, lo desarrollamos y lo ponemos en movimiento. Explorá trabajos de distintas disciplinas.</p></div>
        <Link to="/web" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-brand-yellow">Todas las webs <ArrowUpRight size={18}/></Link>
      </div>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filtrar trabajos">
        {filters.map(name => <button type="button" key={name} onClick={() => setActive(name)} aria-pressed={name === active} className={`rounded-full border px-5 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${name === active ? "border-brand-yellow bg-brand-yellow text-black" : "border-white/20 text-white/70 hover:border-brand-yellow"}`}>{name}</button>)}
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {shown.map((item, i) => {
          const icon = item.category === "Audiovisual" ? <Clapperboard size={32}/> : item.category === "Branding" ? <Palette size={32}/> : item.category === "Marketing" ? <Megaphone size={32}/> : <MonitorPlay size={32}/>;
          const external = item.url.startsWith("http");
          return <motion.article key={item.title} initial={reduced ? false : {opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:Math.min(i*0.05,0.2)}} className="group overflow-hidden rounded-3xl border border-white/10 bg-[#17171a] hover:border-brand-yellow/40">
            <div className="relative h-60 overflow-hidden md:h-80" style={{background:`radial-gradient(circle at 65% 35%, ${item.accent}45, #111116 70%)`}}>
              {item.preview ? <iframe title={`Vista en directo: ${item.title}`} src={item.preview} loading="lazy" tabIndex={-1} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[690px] w-[1280px] origin-top-left scale-[0.36] border-0 opacity-70 md:scale-[0.45]" style={{transform:"translateX(-50%) scale(0.45)"}} /> : item.youtube ? <img loading="lazy" alt="Miniatura del video de la galería audiovisual" src={`https://img.youtube.com/vi/${item.youtube}/hqdefault.jpg`} className="h-full w-full object-cover opacity-75" /> : <div className="absolute inset-0 flex items-center justify-center text-brand-yellow/80">{icon}<span className="ml-3 font-black uppercase tracking-widest">{item.title}</span></div>}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent" />
              <span className="absolute left-6 top-6 rounded-full border border-white/25 bg-black/60 px-4 py-2 text-[10px] font-bold uppercase tracking-widest backdrop-blur">{item.type}</span>
              {item.preview && <span className="absolute bottom-5 left-6 rounded-full bg-black/65 px-3 py-2 font-mono text-[10px] tracking-wider text-white/70">VISTA WEB EN DIRECTO · PUEDE ESTAR RESTRINGIDA</span>}
            </div>
            <div className="flex items-end justify-between gap-3 p-7"><div><p className="text-[10px] uppercase tracking-[0.22em] text-brand-yellow">{item.category}</p><h3 className="mt-2 text-2xl font-black uppercase">{item.title}</h3><p className="mt-2 max-w-md text-sm text-white/55">{item.detail}</p></div>{external?<a className="shrink-0 rounded-full border border-white/20 p-4 transition-colors hover:bg-brand-yellow hover:text-black" target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${item.title}`} href={item.url}><ArrowUpRight size={20}/></a>:<Link className="shrink-0 rounded-full border border-white/20 p-4 transition-colors hover:bg-brand-yellow hover:text-black" aria-label={`Explorar ${item.title}`} to={item.url}><ArrowUpRight size={20}/></Link>}</div>
          </motion.article>;
        })}
      </div>
    </div>
  </section>;
}
