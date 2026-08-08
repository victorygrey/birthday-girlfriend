import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function Opening({ onOpen }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-white via-cream to-soft-pink relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-dusty-rose opacity-20"
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
        
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-burgundy/10"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles size={Math.random() * 15 + 8} />
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-warm-white/30"></div>

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 max-w-lg mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-6 sm:mb-8"
        >
          <motion.div 
            className="text-7xl sm:text-8xl md:text-9xl mb-3 sm:mb-4 filter drop-shadow-lg"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💌
          </motion.div>
        </motion.div>

        <motion.p
          className="text-burgundy/60 text-xs sm:text-sm mb-2 font-body tracking-wide uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          A little something for you...
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-burgundy mb-8 sm:mb-12 leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          For You ❤️
        </motion.h1>

        <motion.button
          onClick={onOpen}
          className="group bg-burgundy text-warm-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-body font-medium text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Open Letter</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-burgundy via-dusty-rose to-burgundy"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
      </motion.div>
    </div>
  );
}
