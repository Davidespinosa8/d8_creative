import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { services } from "../data/portfolio";
import { ArrowUpRight } from "lucide-react";

const Services = () => {
  return (
    <section id="proyectos" className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase text-white leading-none">
              Soluciones <br />
              <span className="text-brand-yellow">Digitales_</span>
            </h2>
          </motion.div>
          <p className="text-brand-gray uppercase tracking-[0.3em] text-[10px] max-w-50 leading-relaxed">
            Creatividad visual + Rendimiento técnico.
          </p>
        </div>

        {/* Grilla de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -10 }}
              className="group relative h-112.5 bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-brand-yellow/30"
            >
              {/* Imagen del Avatar */}
              <div className="absolute inset-0 z-0 flex items-center justify-center p-12">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-contain opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
              </div>

              {/* Contenido */}
              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                <div>
                  <span className="text-brand-yellow font-black text-[10px] tracking-widest uppercase">
                    {service.category}
                  </span>
                  <h3 className="text-3xl font-black text-white uppercase mt-2 group-hover:text-brand-yellow transition-colors">
                    {service.title}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-62.5">
                    {service.description}
                  </p>
                  
                  {service.link.startsWith('http') ? (
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-black uppercase text-xs hover:bg-brand-yellow transition-colors"
                    >
                      {service.cta} <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-black uppercase text-xs hover:bg-brand-yellow transition-colors"
                    >
                      {service.cta} <ArrowUpRight size={16} />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;