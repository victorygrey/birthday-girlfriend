import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

export default function FinalSurprise({ onShowMusic }) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);

      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#FFE5E5', '#D4A5A5', '#8B4049', '#FFF8F0']
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#FFE5E5', '#D4A5A5', '#8B4049', '#FFF8F0']
        });
      }, 250);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#7d2f3c] via-[#9a4a5d] to-[#f6c7d5]">
      <div className="absolute inset-0 opacity-30">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl text-warm-white/50 sm:text-2xl md:text-3xl"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
            }}
            animate={{ y: -50 }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {['❤️', '💕', '💖', '✨', '🎉', '🎊', '⭐'][Math.floor(Math.random() * 7)]}
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0">
        {[...Array(22)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.2, 0.7, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles className="text-warm-white/35" size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_36%)]" />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={showMessage ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ scale: 0 }}
          animate={showMessage ? { scale: 1 } : {}}
          transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
        >
          <motion.div
            className="text-6xl drop-shadow-[0_15px_30px_rgba(255,255,255,0.35)] sm:text-7xl md:text-8xl"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎉
          </motion.div>
        </motion.div>

        <motion.h1
          className="mb-6 font-display text-4xl leading-tight text-warm-white drop-shadow-lg sm:mb-8 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          animate={showMessage ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Happy Birthday <span className="inline-block">❤️</span>
        </motion.h1>

        <motion.div
          className="mb-10 space-y-4 sm:mb-14 sm:space-y-6"
          initial={{ opacity: 0 }}
          animate={showMessage ? { opacity: 1 } : {}}
          transition={{ delay: 1.3 }}
        >
          <motion.p
            className="mx-auto max-w-3xl font-body text-lg leading-relaxed text-warm-white/95 sm:text-xl md:text-2xl lg:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={showMessage ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Thank you for being part of my life.
          </motion.p>

          <motion.p
            className="mx-auto max-w-2xl font-body text-base leading-relaxed text-warm-white/85 sm:text-lg md:text-xl lg:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={showMessage ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2, duration: 0.8 }}
          >
            I hope I get to celebrate many more birthdays with you.
          </motion.p>
        </motion.div>

        <motion.button
          onClick={onShowMusic}
          className="group relative overflow-hidden rounded-full bg-[#fffaf8] px-8 py-3 text-base font-bold text-burgundy shadow-[0_20px_45px_rgba(255,255,255,0.28)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(255,255,255,0.35)] sm:px-10 sm:py-4 md:px-14 md:py-5 md:text-xl"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={showMessage ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 2.5, duration: 0.8, type: "spring" }}
          whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Play Our Song
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🎵
            </motion.span>
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#ffe8ee] via-[#fff4f6] to-[#fbe0e7]"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
      </motion.div>
    </div>
  );
}
