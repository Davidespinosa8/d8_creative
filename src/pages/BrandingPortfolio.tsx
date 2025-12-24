import { motion } from "framer-motion";
import { ArrowLeft, Instagram, Globe, TrendingUp, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const brandingProjects = [
  {
    id: 1,
    name: "Top Cinema",
    handle: "YouTube (500k subs)",
    tag: "YouTube / Motion Graphics",
    description: "Edición integral de video para plataforma de alta escala. Diseño de identidad visual, placas dinámicas y Motion Graphics para retención de audiencia.",
    stats: ["Motion Design", "Engagement Opt.", "High-End Editing"],
  },
  {
    id: 2,
    name: "J-Barber",
    handle: "@j.barber_ok",
    tag: "Web & Gestión",
    description: "Desarrollo de ecosistema digital integral: Landing page, central de turnos con calendarios inteligentes y sistema de notificaciones personalizadas.",
    stats: ["Sistema de Turnos", "App Web", "Optimización de Flujo"],
    externalLink: "https://j-barber.vercel.app"
  },
  {
    id: 3,
    name: "City Rock",
    handle: "@cityrock.restobar",
    tag: "Gastronomía / Web",
    description: "Digitalización de la experiencia del cliente mediante el desarrollo de una carta web dinámica, optimizando tiempos de atención y branding.",
    stats: ["Carta Digital", "UX Design", "Identidad Online"],
    externalLink: "https://cityrock.netlify.app"
  },
  {
    id: 4,
    name: "Coronada Jeans",
    handle: "@coronadajeans",
    tag: "Ads & Trafficker",
    description: "Estrategia avanzada de pauta en Meta Ads. Gestión de campañas de tráfico y conversión para maximizar ventas en el sector indumentaria.",
    stats: ["Meta Ads Expert", "ROI Positivo", "Escalado de Ventas"],
  },
  {
    id: 5,
    name: "Rayitos y Colores",
    handle: "@rayitosycolores",
    tag: "Social Media",
    description: "Gestión creativa de comunidad y creación de contenido estratégico para conectar con familias mediante una comunicación empática y visual.",
    stats: ["Content Strategy", "Growth Orgánico", "Community Management"],
  },
  {
    id: 6,
    name: "Wakamole",
    handle: "@wakamolejunin",
    tag: "Gastronomía",
    description: "Estrategia visual y narrativa audiovisual para redes sociales, elevando el perfil de la marca en el mercado local.",
    stats: ["Engagement Boost", "Branding", "Creative Ads"],
  },
  {
    id: 7,
    name: "Ecoplak",
    handle: "@eecoplak",
    tag: "Construcción",
    description: "Posicionamiento premium de marca y generación de leads calificados para proyectos de construcción en seco.",
    stats: ["B2B Leads", "Estrategia 360", "Brand Authority"],
  },
  {
    id: 8,
    name: "Susy Bombonería",
    handle: "@susy.bomboneria",
    tag: "Tercerizado / Filmación",
    description: "Captura técnica de producto y narrativa visual enfocada en el detalle para flujos de post-producción externa.",
    stats: ["Visual Assets", "Lighting", "Product Film"],
  },
  {
    id: 9,
    name: "Center Gol",
    handle: "@centergol.ok",
    tag: "Tercerizado / Filmación",
    description: "Cobertura cinematográfica de dinámica deportiva e instalaciones. Generación de recursos para campañas publicitarias.",
    stats: ["Action Cam", "Dynamic Shots", "RAW Assets"],
  },
  {
    id: 10,
    name: "Piedra Negra",
    handle: "@piedranegra.junin",
    tag: "Tercerizado / Filmación",
    description: "Captura de contenido bruto (RAW) optimizado para edición de alta velocidad y cobertura de marca.",
    stats: ["Filming", "Capture Specialist", "Workflow"],
  }
];

const BrandingPortfolio = () => {
  return (
    <div className="min-h-screen bg-brand-dark font-kanit pb-20">
      <nav className="p-8 sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-md">
        <Link to="/" className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-yellow transition-colors font-bold uppercase tracking-widest text-sm">
          <ArrowLeft size={20} /> Volver al Inicio
        </Link>
      </nav>

      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-white mb-4">
            Branding & <span className="text-brand-yellow">Estrategia</span>
          </h1>
          <p className="text-brand-gray max-w-2xl mx-auto uppercase tracking-widest text-xs">
            Desde canales de 500k subs hasta el desarrollo de tu próxima App Web.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandingProjects.map((project) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#121212] border border-white/5 p-6 rounded-3xl hover:border-brand-yellow/30 transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-brand-yellow text-[9px] font-black uppercase tracking-widest px-2 py-1 border border-brand-yellow/20 rounded">
                    {project.tag}
                  </span>
                </div>
                
                <h2 className="text-2xl font-black text-white uppercase group-hover:text-brand-yellow transition-colors leading-tight">{project.name}</h2>
                <div className="text-brand-gray text-xs flex items-center gap-1 mt-1 mb-4">
                  {project.id === 1 ? <Youtube size={12} /> : <Instagram size={12} />} {project.handle}
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 italic min-h-15">
                  "{project.description}"
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stats.map((stat, idx) => (
                    <span key={idx} className="bg-white/5 text-[9px] text-white px-3 py-1 rounded-full border border-white/5 font-bold uppercase flex items-center gap-1">
                      <TrendingUp size={10} className="text-brand-yellow" /> {stat}
                    </span>
                  ))}
                </div>

                {project.externalLink && (
                  <a 
                    href={project.externalLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-brand-yellow hover:text-black rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all"
                  >
                    <Globe size={14} /> Visitar Web
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandingPortfolio;