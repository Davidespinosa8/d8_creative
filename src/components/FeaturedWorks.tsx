import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const featured = [
  { name: "Golden Gym", category: "Desarrollo web", desc: "Plataforma digital para gestión de gimnasios.", href: "https://goldengym.pro/", number: "01" },
  { name: "Top Cinema", category: "Web & audiovisual", desc: "Experiencia digital para una marca audiovisual.", href: "https://topcinema-six.vercel.app/", number: "02" },
  { name: "Top Cinema IA", category: "Tecnología creativa", desc: "Exploración visual y audiovisual con tecnología.", href: "https://topcinema-ia.vercel.app/", number: "03" },
  { name: "Tarjetas digitales", category: "Diseño interactivo", desc: "Invitaciones personalizadas que conectan personas.", href: "/tarjetas", number: "04" },
];

export default function FeaturedWorks() {
  return (
    <section id="trabajos-destacados" className="relative bg-[#0b0b0e] px-5 py-20 text-white md:py-28">
      <div className="container mx-auto">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-brand-yellow">Una muestra de lo que hacemos</p>
            <h2 className="text-4xl font-black uppercase tracking-tight md:text-6xl">Proyectos <span className="text-brand-yellow">reales.</span></h2>
          </div>
          <Link to="/web" className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white hover:text-brand-yellow">Explorar proyectos web <ArrowUpRight size={18}/></Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((item, index) => {
            const isExternal = item.href.startsWith("http");
            const className = "group relative flex min-h-[310px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#232126] via-[#111113] to-[#181407] p-7 transition-all hover:-translate-y-1 hover:border-brand-yellow/60";
            const children = <>
              <div className="flex items-start justify-between"><span className="font-mono text-xs text-brand-yellow">{item.number} / D8</span><ArrowUpRight size={22} className="text-white/50 transition-colors group-hover:text-brand-yellow" /></div>
              <div className="absolute right-[-24px] top-[75px] select-none text-[125px] font-black leading-none text-brand-yellow/[0.07]" aria-hidden="true">{item.number}</div>
              <div className="relative"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-yellow">{item.category}</span><h3 className="mt-3 text-2xl font-black uppercase">{item.name}</h3><p className="mt-3 text-sm leading-relaxed text-white/55">{item.desc}</p></div>
            </>;
            return <motion.div key={item.name} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.08 }}>
              {isExternal ? <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a> : <Link to={item.href} className={className}>{children}</Link>}
            </motion.div>;
          })}
        </div>
      </div>
    </section>
  );
}
