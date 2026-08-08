import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function Opening({ onOpen }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fffaf8] via-[#fff1f4] to-[#fde7ee] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="romantic-orb absolute -top-20 left-10 h-56 w-56 rounded-full bg-[#ffdfe7]/70 blur-3xl" />
        <div className="romantic-orb absolute bottom-0 right-8 h-64 w-64 rounded-full bg-[#f7d7d7]/70 blur-3xl" style={{ animationDelay: '1.5s' }} />
        <div className="romantic-glow absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.9),_transparent_55%)]" />

        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#d48ea4] opacity-25"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Heart size={Math.random() * 20 + 10} fill="currentColor" />
          </motion.div>
        ))}

        {[...Array(18)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-burgundy/15"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              scale: [1, 1.7, 1],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles size={Math.random() * 16 + 8} />
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#fff4f2]/60"></div>

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6 sm:mb-8"
        >
          <motion.div
            className="text-7xl sm:text-8xl md:text-[9rem] mb-3 sm:mb-4 filter drop-shadow-[0_18px_40px_rgba(139,64,73,0.25)]"
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            💌
          </motion.div>
        </motion.div>

        <motion.p
          className="text-burgundy/70 text-xs sm:text-sm mb-3 font-body tracking-[0.25em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          A little something for you...
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-burgundy mb-8 sm:mb-10 leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          For You <span className="inline-block">❤️</span>
        </motion.h1>

        <motion.p
          className="mx-auto max-w-md text-sm sm:text-base md:text-lg text-dark-brown/75 mb-8 font-body leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          A little world made of love, memories, and the sweetest birthday wishes just for you.
        </motion.p>

        <motion.button
          onClick={onOpen}
          className="romantic-button group relative overflow-hidden rounded-full bg-gradient-to-r from-[#8b4049] via-[#af5a67] to-[#8b4049] px-8 py-3 text-base font-medium text-[#fffaf8] shadow-xl sm:px-10 sm:py-4 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Open Letter</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#f7d1d9] via-[#ffe6eb] to-[#f7d1d9] opacity-0 group-hover:opacity-20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.7 }}
          />
        </motion.button>
      </motion.div>
    </div>
  );
}
