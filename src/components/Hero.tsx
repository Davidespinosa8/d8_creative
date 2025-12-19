import { motion } from "framer-motion";
import { TextReveal } from "./ui/TextReveal";

const Hero = ({ onContactClick }: { onContactClick?: () => void }) => {
  return (
    <>
      <section className="relative pt-32 pb-12 min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.1),transparent_40%)]" />

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center md:text-left">
            <TextReveal text="IMPACTO VISUAL" className="text-5xl md:text-7xl font-black uppercase text-white justify-center md:justify-start" />
            <TextReveal text="& ESTRATEGIA." className="text-5xl md:text-7xl font-black uppercase text-brand-yellow justify-center md:justify-start" delay={0.3} />
            
            <p className="text-brand-gray text-lg mt-6 mb-8 max-w-lg mx-auto md:mx-0">
              Fusionamos narrativa audiovisual, desarrollo web y growth marketing. 
              No solo hacemos que tu marca se vea brutal, hacemos que funcione y venda.
            </p>
            
            <button 
              onClick={onContactClick}
              className="px-8 py-3 bg-brand-yellow text-brand-darker font-bold uppercase tracking-wider hover:shadow-[0_0_20px_#FFD700] transition-shadow cursor-pointer"
            >
              Potenciar mi Marca
            </button>
          </div>

          <motion.div 
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-brand-yellow blur-[100px] opacity-20 rounded-full" />
            <img src="/avatard8.png" alt="Avatar" className="relative z-10 w-[80%] max-w-112.5 drop-shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* --- STATS CON GLOW (RESPLANDOR) --- */}
      <div className="container mx-auto px-4 py-32 perspective-[2000px]"> 
        <div className="flex flex-col md:flex-row justify-center items-center gap-20 md:gap-40">
          
          {/* FICHA IZQUIERDA */}
          <div className="relative group">
            <div className="absolute inset-0 bg-brand-yellow blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full" />
            
            <motion.div 
              whileHover={{ rotateY: 30, scale: 1.05, z: 50 }}
              initial={{ rotateY: 15 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative z-10 w-64 h-64 rounded-3xl bg-linear-to-br from-[#2a2a2a] to-black border-t border-l border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center text-center overflow-hidden hover:shadow-[0_0_40px_rgba(255,215,0,0.2)]"
            >
              {/* Brillo en la superficie */}
              <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />
              
              <h3 className="text-6xl font-black text-white mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">+20</h3>
              <p className="text-brand-gray uppercase text-xs font-bold tracking-[0.2em] max-w-30">Marcas Potenciadas</p>
            </motion.div>
          </div>

          {/* FICHA DERECHA */}
          <div className="relative group">
            <div className="absolute inset-0 bg-brand-yellow blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full" />

            <motion.div 
              whileHover={{ rotateY: -30, scale: 1.05, z: 50 }}
              initial={{ rotateY: -15 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative z-10 w-64 h-64 rounded-3xl bg-linear-to-br from-[#2a2a2a] to-black border-t border-l border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center text-center overflow-hidden hover:shadow-[0_0_40px_rgba(255,215,0,0.2)]"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />

              <h3 className="text-6xl font-black text-white mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">360°</h3>
              <p className="text-brand-gray uppercase text-xs font-bold tracking-[0.2em] max-w-30">Visión Digital</p>
            </motion.div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Hero;