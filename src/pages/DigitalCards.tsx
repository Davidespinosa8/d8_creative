import { motion } from "framer-motion";
import { ArrowLeft, Globe, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const digitalCards = [
  {
    id: 1,
    name: "XV - Berenice",
    tag: "Evento Social / XV",
    description: "Invitación digital interactiva con confirmación de asistencia, cuenta regresiva y galería de fotos integrada.",
    stats: ["Google Sites", "UX Eventos", "Mobile First"],
    externalLink: "https://sites.google.com/view/berenicerxv/"
  },
  {
    id: 2,
    name: "Mi Cumple",
    tag: "Cumpleaños Kids",
    description: "Landing page lúdica y colorida diseñada para eventos infantiles con mapa interactivo y detalles de la temática.",
    stats: ["Vercel Hosting", "React/Vite", "Interactive UI"],
    externalLink: "https://tarjeta-micumple.vercel.app/"
  },
  {
    id: 3,
    name: "Lis Coronel - XV",
    tag: "Evento Premium",
    description: "Diseño elegante y minimalista en formato micrositio para una experiencia de gala digital.",
    stats: ["Canva Site", "Branding Social", "High Aesthetic"],
    externalLink: "https://ddavidespinosa8.my.canva.site/lis-coronel"
  },
  {
    id: 4,
    name: "Boda Fede & Vicky",
    tag: "Casamiento",
    description: "Ecosistema digital para bodas: cronograma del evento, lista de regalos y sistema de confirmación personalizado.",
    stats: ["Canva Pro", "Gestión de Invitados", "Storytelling"],
    externalLink: "https://ddavidespinosa8.my.canva.site/casamiento-fedeyvicky"
  },
  {
    id: 5,
    name: "Rodri 15x2",
    tag: "Evento Social",
    description: "Propuesta moderna y dinámica para eventos de cumpleaños, optimizada para compartir por redes sociales y WhatsApp.",
    stats: ["Google Sites", "Fast Load", "Responsive"],
    externalLink: "https://sites.google.com/view/rodri15x2"
  }
];

const DigitalCards = () => {
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
            Tarjetas <span className="text-brand-yellow">Digitales</span>
          </h1>
          <p className="text-brand-gray max-w-2xl mx-auto uppercase tracking-widest text-xs">
            Experiencias interactivas para eventos inolvidables. Diseño y funcionalidad en un solo link.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {digitalCards.map((card) => (
            <motion.div 
              key={card.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#121212] border border-white/5 p-6 rounded-3xl hover:border-brand-yellow/30 transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-brand-yellow text-[9px] font-black uppercase tracking-widest px-3 py-1 border border-brand-yellow/20 rounded">
                    {card.tag}
                  </span>
                  <Sparkles size={16} className="text-brand-yellow/30" />
                </div>
                
                <h2 className="text-2xl font-black text-white uppercase group-hover:text-brand-yellow transition-colors leading-tight mb-4">
                  {card.name}
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">
                  "{card.description}"
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {card.stats.map((stat, idx) => (
                    <span key={idx} className="bg-white/5 text-[9px] text-white px-3 py-1 rounded-full border border-white/5 font-bold uppercase">
                      {stat}
                    </span>
                  ))}
                </div>

                <a 
                  href={card.externalLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-brand-yellow hover:text-black rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all"
                >
                  <Globe size={14} /> Ver Invitación Live
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigitalCards;