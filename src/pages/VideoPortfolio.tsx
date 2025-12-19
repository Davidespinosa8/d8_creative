import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const VideoPortfolio = () => {
  const getIgEmbed = (url: string) => {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}embed`;
  };

  const youtubeVideos = [
    "https://www.youtube.com/embed/M531NPaq6pY",
    "https://www.youtube.com/embed/YD_Ds6NAgnY",
    "https://www.youtube.com/embed/45_Jw4isF-I",
    "https://www.youtube.com/embed/RYMbKA2KJB4"
  ];

  const instagramReels = [
    "https://www.instagram.com/reel/DGYs7ocuvAz/",
    "https://www.instagram.com/reel/DP2IzCCiTqC/",
    "https://www.instagram.com/reel/DSVlOMMkiWl/",
    "https://www.instagram.com/reel/DQVKoFmDzKZ/",
    "https://www.instagram.com/reel/DGMopjQOTdg/"
  ];

  return (
    <div className="min-h-screen bg-brand-dark font-kanit pb-20">
      {/* Navbar de Navegación */}
      <nav className="p-8 sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-md">
        <Link to="/" className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-yellow transition-colors font-bold uppercase tracking-widest text-sm">
          <ArrowLeft size={20} /> Volver al Inicio
        </Link>
      </nav>

      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-white mb-4">
            Audiovisual <span className="text-brand-yellow">Portfolio</span>
          </h1>
          <p className="text-brand-gray max-w-2xl mx-auto uppercase tracking-widest text-xs">
            Formatos de alto impacto para la era digital.
          </p>
        </div>

        {/* SECCIÓN YOUTUBE (Landscape) */}
        <div className="mb-32">
          <h2 className="text-2xl font-black uppercase text-white mb-10 border-l-4 border-brand-yellow pl-4 italic">
            Digital Series / YouTube
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {youtubeVideos.map((url, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }} 
                className="relative aspect-video bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <iframe 
                  className="w-full h-full" 
                  src={url} 
                  title={`YouTube video ${index}`} 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECCIÓN REELS (Portrait) */}
        <div>
          <h2 className="text-2xl font-black uppercase text-white mb-10 border-l-4 border-brand-yellow pl-4 italic">
            Social Media / Reels & Instagram
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {instagramReels.map((url, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.02, rotateY: 5 }} 
                className="relative aspect-9/16 bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10 shadow-xl"
              >
                <iframe 
                  className="w-full h-full" 
                  src={getIgEmbed(url)} 
                  frameBorder="0" 
                  scrolling="no" 
                  allowTransparency={true}
                  title={`Instagram Reel ${index}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPortfolio;