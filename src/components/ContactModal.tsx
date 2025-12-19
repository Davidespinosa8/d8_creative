import { X, Mail, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Ventana Modal */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-brand-darker border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
              <X size={24} />
            </button>

            <h2 className="text-2xl font-black uppercase text-center mb-2 text-white">¿Hablamos?</h2>
            <p className="text-gray-400 text-center mb-8 text-sm">Elige tu canal preferido para conectar.</p>

            <div className="space-y-4">
              <a 
                href="https://wa.me/5492364357363" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 hover:bg-[#25D366] hover:text-white border border-white/10 hover:border-transparent rounded-xl transition-all group cursor-pointer"
              >
                <div className="bg-[#25D366]/20 p-3 rounded-full text-[#25D366] group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold uppercase text-lg">WhatsApp</h3>
                  <p className="text-xs text-gray-400 group-hover:text-white/90">Respuesta rápida</p>
                </div>
              </a>

              <a 
                href="mailto:legionserviciosdigitales@gmail.com"
                className="flex items-center gap-4 p-4 bg-white/5 hover:bg-brand-yellow hover:text-brand-darker border border-white/10 hover:border-transparent rounded-xl transition-all group cursor-pointer"
              >
                <div className="bg-brand-yellow/20 p-3 rounded-full text-brand-yellow group-hover:bg-black/10 group-hover:text-black transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold uppercase text-lg">Email</h3>
                  <p className="text-xs text-gray-400 group-hover:text-brand-darker/80">Propuestas formales</p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;