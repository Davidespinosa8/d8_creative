import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Code2, Dumbbell, Clapperboard, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  { title: "Golden Gym", category: "Plataforma de gestión", description: "Aplicación para gimnasios con acceso de socios, administración de rutinas, roles y datos persistentes en Supabase.", stack: ["React", "TypeScript", "Supabase"], url: "https://goldengym.pro/", live: true, icon: "gym" },
  { title: "Top Cinema", category: "Experiencia digital audiovisual", description: "Web de presentación audiovisual con trabajos destacados, servicios y experiencia visual interactiva.", stack: ["Next.js", "React", "Tailwind CSS"], url: "https://github.com/Davidespinosa8/topcinema", live: false, icon: "cinema" },
  { title: "Top Cinema IA", category: "Proyecto experimental", description: "Experiencia web enfocada en creatividad audiovisual e inteligencia artificial, con animaciones y diseño interactivo.", stack: ["Next.js", "React", "Framer Motion"], url: "https://github.com/Davidespinosa8/topcinema-ia", live: false, icon: "cinema" },
  { title: "Hinchada Vibra", category: "Web institucional", description: "Sitio de una agrupación artística, con identidad de marca, sponsors y galería de imágenes.", stack: ["Next.js", "Tailwind CSS", "TypeScript"], url: "https://hinchadavibra.com.ar/", live: true, icon: "web" },
  { title: "J-Barber", category: "Sitio para barbería", description: "Experiencia visual para un negocio de barbería, con interfaz moderna y animaciones.", stack: ["Next.js", "Tailwind CSS"], url: "https://j-barber.vercel.app/", live: true, icon: "web" },
  { title: "CityRock", category: "Menú digital", description: "Carta online pensada para facilitar la consulta desde dispositivos móviles.", stack: ["HTML", "Bootstrap", "JavaScript"], url: "https://cityrock.netlify.app/", live: true, icon: "web" },
  { title: "Landing Bank", category: "Landing page conceptual", description: "Concepto de interfaz bancaria enfocado en presentación visual y experiencia de usuario.", stack: ["Next.js", "Tailwind CSS"], url: "https://landing-bank-six.vercel.app/", live: true, icon: "web" },
  { title: "Menú La Birrería", category: "Carta digital", description: "Proyecto de menú digital con interfaz responsive.", stack: ["HTML", "CSS", "Bootstrap"], url: "https://main--majestic-fox-44c86d.netlify.app/", live: true, icon: "web" },
  { title: "Drycraft", category: "Web en desarrollo", description: "Proyecto web para el sector de construcción y servicios.", stack: ["Next.js", "TypeScript", "Tailwind CSS"], url: "https://drycraft-lis.vercel.app/", live: true, icon: "web" },
];

export default function WebPortfolio() {
  return (
    <main className="min-h-screen bg-brand-dark pb-28 pt-32 font-kanit">
      <div className="container mx-auto px-4">
        <Link to="/" className="mb-12 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-gray transition-colors hover:text-brand-yellow"><ArrowLeft size={18} /> Volver al inicio</Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14 max-w-4xl">
          <span className="text-xs font-black uppercase tracking-[0.35em] text-brand-yellow">D8 Creative / Desarrollo</span>
          <h1 className="mt-5 text-5xl font-black uppercase leading-none text-white md:text-7xl">Experiencias <span className="text-brand-yellow">web_</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-brand-gray md:text-lg">Sitios, plataformas y experiencias digitales que conectan diseño, tecnología y objetivos de negocio. Explorá una selección de trabajos realizados.</p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article key={project.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.2) }} className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#171717] transition-colors hover:border-brand-yellow/50">
              <div className="relative flex h-48 items-center justify-center overflow-hidden border-b border-white/5 bg-[radial-gradient(ellipse_at_top_right,rgba(255,215,0,0.17),transparent_65%)]">
                <div className="absolute left-6 top-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">{String(index + 1).padStart(2, "0")} / PROYECTO</div>
                {project.icon === "gym" ? <Dumbbell className="text-brand-yellow" size={64} strokeWidth={1.2} /> : project.icon === "cinema" ? <Clapperboard className="text-brand-yellow" size={64} strokeWidth={1.2} /> : <Globe2 className="text-brand-yellow" size={64} strokeWidth={1.2} />}
                <div className="absolute bottom-5 left-6 text-[10px] font-bold uppercase tracking-[0.17em] text-white/55">{project.category}</div>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h2 className="text-2xl font-black uppercase text-white group-hover:text-brand-yellow">{project.title}</h2>
                <p className="my-5 flex-1 text-sm leading-relaxed text-brand-gray">{project.description}</p>
                <div className="mb-7 flex flex-wrap gap-2">{project.stack.map((technology) => <span key={technology} className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white/70">{technology}</span>)}</div>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-yellow px-5 py-3 text-xs font-black uppercase tracking-widest text-black transition-transform hover:-translate-y-1">{project.live ? "Explorar sitio" : "Ver repositorio"} <ArrowUpRight size={16} /></a>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start gap-4 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between"><div><h2 className="text-2xl font-black uppercase text-white">¿Tenés un proyecto en mente?</h2><p className="mt-2 text-sm text-brand-gray">Diseñemos una experiencia digital para tu negocio.</p></div><a href="mailto:ddavidespinosa8@gmail.com?subject=Consulta%20desarrollo%20web" className="inline-flex items-center gap-2 rounded-xl border border-brand-yellow px-6 py-3 text-xs font-black uppercase tracking-widest text-brand-yellow transition-colors hover:bg-brand-yellow hover:text-black"><Code2 size={17} /> Hablemos de tu web</a></div>
      </div>
    </main>
  );
}