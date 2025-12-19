import { motion } from "framer-motion";

const VideoGallery = () => {
  return (
    <section id="audiovisual" className="py-24 bg-brand-darker relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.03),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-white">
            Producción <span className="text-brand-yellow">Audiovisual_</span>
          </h2>
          <p className="text-brand-gray mt-4 max-w-xl mx-auto italic">
            "Narrativas que cortan el aliento. Edición dinámica para la era de la atención inmediata."
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          
          {/* VIDEO PRINCIPAL (YOUTUBE - 16:9) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative group w-full lg:w-2/3"
          >
            <div className="absolute -inset-1 bg-brand-yellow blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl" />
            <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video w-full">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="YouTube video player" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 border-t border-white/5 bg-black/50">
                <span className="text-brand-yellow text-xs font-bold tracking-widest uppercase">Video Case Study</span>
                <h3 className="text-xl font-bold text-white uppercase mt-1">High-End Production</h3>
              </div>
            </div>
          </motion.div>

          {/* REEL (PORTRAIT - 9:16) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative group w-full lg:w-[350px] mx-auto"
          >
            <div className="absolute -inset-1 bg-brand-yellow blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl" />
            <div className="relative bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[9/16] w-full">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Aquí iría el link del Short o Reel
                  title="Reel player" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black via-black/80 to-transparent">
                <span className="text-brand-yellow text-xs font-bold tracking-widest uppercase">Social Media</span>
                <h3 className="text-lg font-bold text-white uppercase mt-1">Short Form Content</h3>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VideoGallery;