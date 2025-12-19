import { motion } from "framer-motion";

export const TextReveal = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const words = text.split(" ");
  return (
    <motion.div
      className={`flex flex-wrap overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-[0.25em]"
          variants={{
            hidden: { y: "100%", opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 12, stiffness: 100 } }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};