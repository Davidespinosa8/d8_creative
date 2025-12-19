import { motion } from "framer-motion";
import { ArrowLeft, Instagram, Globe, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const brandingProjects = [
  {
    id: 1,
    name: "J-Barber",
    handle: "@j.barber_ok",
    tag: "Web & Gestión",
    description: "Desarrollo de ecosistema digital integral: Landing page, central de turnos con calendarios inteligentes y sistema de notificaciones personalizadas.",
    stats: ["Sistema de Turnos", "App Web", "Optimización de Flujo"],
    externalLink: "https://j-barber.vercel.app"
  },
  {
    id: 2,
    name: "City Rock",
    handle: "@cityrock.restobar",
    tag: "Gastronomía / Web",
    description: "Digitalización de la experiencia del cliente mediante el desarrollo de una carta web dinámica, optimizando tiempos de atención y branding.",
    stats: ["Carta Digital", "UX Design", "Identidad Online"],
    externalLink: "https://cityrock.netlify.app"
  },
  {
    id: 3,
    name: "Coronada Jeans",
    handle: "@coronadajeans",
    tag: "Ads & Trafficker",
    description: "Estrategia avanzada de pauta en Meta Ads. Gestión de campañas de tráfico y conversión para maximizar ventas en el sector indumentaria.",
    stats: ["Meta Ads Expert", "ROI Positivo", "Escalado de Ventas"],
  },
  {
    id: 4,
    name: "Rayitos y Colores",
    handle: "@rayitosycolores",
    tag: "Social Media",
    description: "Gestión creativa de comunidad y creación de contenido estratégico para conectar con familias mediante una comunicación empática y visual.",
    stats: ["Content Strategy", "Growth Orgánico", "Community Management"],
  },
  {
    id: 5,
    name: "Wakamole",
    handle: "@wakamolejunin",
    tag: "Gastronomía",
    description: "Estrategia visual y narrativa audiovisual para redes sociales, elevando el perfil de la marca en el mercado local.",
    stats: ["Engagement Boost", "Branding", "Creative Ads"],
  },
  {
    id: 6,
    name: "Ecoplak",
    handle: "@eecoplak",
    tag: "Construcción",
    description: "Posicionamiento premium de marca y generación de leads calificados para proyectos de construcción en seco.",
    stats: ["B2B Leads", "Estrategia 360", "Brand Authority"],
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
            Casos de éxito: Desde la primera línea de código hasta el último click en tus Ads.
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
                
                <h2 className="text-2xl font-black text-white uppercase group-hover:text-brand-yellow transition-colors">{project.name}</h2>
                <a 
                  href={`https://instagram.com/${project.handle.replace('@','')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-brand-gray hover:text-white transition-colors text-xs flex items-center gap-1 mt-1 mb-4"
                >
                  <Instagram size={12} /> {project.handle}
                </a>

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
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-brand-yellow hover:text-black rounded-xl text-xs font-black uppercase tracking-tighter transition-all"
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