import { motion } from "framer-motion";
import { brands } from "../data/portfolio";
import { Instagram } from "lucide-react";

const BrandGrid = () => {
  return (
    <section className="py-24 bg-brand-dark">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-2">
            Marcas que <span className="text-brand-yellow">Confían_</span>
          </h2>
          <p className="text-brand-gray uppercase tracking-[0.3em] text-[10px]">Estrategia & Gestión de Identidad</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {brands.map((brand) => (
            <motion.a
              key={brand.id}
              href={`https://instagram.com/${brand.handle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, backgroundColor: "rgba(255, 215, 0, 0.1)" }}
              className="group p-8 border border-white/5 bg-[#0a0a0a] rounded-2xl flex flex-col items-center justify-center text-center transition-all hover:border-brand-yellow/30"
            >
              <Instagram className="text-brand-gray group-hover:text-brand-yellow mb-4 transition-colors" size={24} />
              <h3 className="text-white font-bold uppercase tracking-wider text-sm group-hover:text-white transition-colors">
                {brand.name}
              </h3>
              <span className="text-[10px] text-brand-gray mt-1 group-hover:text-brand-yellow/80">
                {brand.handle}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandGrid;