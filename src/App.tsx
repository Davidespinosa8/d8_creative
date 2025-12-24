import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Hero from "./components/Hero";
import Services from "./components/Services";
import VideoPortfolio from "./pages/VideoPortfolio";
import BrandingPortfolio from "./pages/BrandingPortfolio";
import ContactModal from "./components/ContactModal";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Home({ onContact }: { onContact: () => void }) {
  return (
    <main>
      <Hero onContactClick={onContact} />
      <div className="bg-brand-yellow text-brand-darker py-3 overflow-hidden -rotate-1 border-y-4 border-black relative z-20 shadow-2xl">
        <div className="whitespace-nowrap animate-marquee font-black text-xl uppercase flex gap-4">
          <span>✦ Edición de Video ✦ Desarrollo Web ✦ Growth Marketing ✦ Producción Audiovisual ✦ Estrategia Digital ✦ Edición de Video ✦ Desarrollo Web ✦ Growth Marketing</span>
          <span>✦ Edición de Video ✦ Desarrollo Web ✦ Growth Marketing ✦ Producción Audiovisual ✦ Estrategia Digital ✦ Edición de Video ✦ Desarrollo Web ✦ Growth Marketing</span>
        </div>
      </div>
      <Services />
    </main>
  );
}

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-brand-dark selection:bg-brand-yellow selection:text-black font-kanit overflow-x-hidden">
        
        <nav className="fixed top-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/5 transition-all">
          <div className="container mx-auto px-4 h-24 flex items-center justify-between">
            <a href="/">
              <img src="/Logod8.png" alt="D-8 Logo" className="h-16 md:h-24 object-contain cursor-pointer" />
            </a>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="text-sm font-bold uppercase tracking-widest border border-brand-yellow/30 px-6 py-2 hover:bg-brand-yellow hover:text-black hover:border-brand-yellow transition-all duration-300 cursor-pointer"
            >
              Contacto
            </button>
          </div>
        </nav>

        <div className="pt-4">
          <Routes>
            <Route path="/" element={<Home onContact={() => setIsContactOpen(true)} />} />
            <Route path="/audiovisual" element={<VideoPortfolio />} />
            <Route path="/branding" element={<BrandingPortfolio />} />
          </Routes>
        </div>

        <footer className="py-20 text-center bg-brand-darker border-t border-white/5">
          <div className="container mx-auto px-4">
            <img src="/Logod8.png" alt="D-8 Logo" className="h-14 mx-auto mb-8 opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500" />
            <p className="text-brand-gray text-xs tracking-[0.3em] uppercase mb-8">
              © 2025 D-8 Creative. Impacto Visual & Estrategia.
            </p>
            <div className="flex justify-center gap-10">
              <a href="https://instagram.com/d8_creative" target="_blank" rel="noreferrer" className="text-white/40 hover:text-brand-yellow transition-colors font-black text-[10px] uppercase tracking-widest">Instagram</a>
              <a href="https://www.linkedin.com/in/dar%C3%ADo-david-espinosa-b50972258/" className="text-white/40 hover:text-brand-yellow transition-colors font-black text-[10px] uppercase tracking-widest">LinkedIn</a>
            </div>
          </div>
        </footer>

        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </Router>
  );
}

export default App;