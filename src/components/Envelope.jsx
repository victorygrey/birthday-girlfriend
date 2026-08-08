import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function Envelope({ onComplete }) {
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpening(true);
    }, 500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fffaf8] via-[#fff1f3] to-[#fbe7ee] relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(22)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {i % 2 === 0 ? (
              <div className="h-2.5 w-2.5 rounded-full bg-[#d8a4ab] shadow-[0_0_18px_rgba(216,164,171,0.4)]" />
            ) : (
              <Sparkles className="text-burgundy/25" size={18} />
            )}
          </motion.div>
        ))}
      </div>

      <div className="relative w-full max-w-xs px-4 sm:max-w-md sm:px-6 lg:max-w-lg">
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative w-full drop-shadow-[0_25px_50px_rgba(139,64,73,0.2)]"
            animate={isOpening ? { y: -10 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <svg viewBox="0 0 400 300" className="w-full h-auto">
              <defs>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.28"/>
                </filter>
              </defs>

              <motion.path
                d="M 50 150 L 200 50 L 350 150 L 350 250 L 50 250 Z"
                fill="#e9c5cc"
                stroke="#8B4049"
                strokeWidth="3"
                filter="url(#shadow)"
              />

              <motion.path
                d="M 50 150 L 200 250 L 350 150"
                fill="none"
                stroke="#8B4049"
                strokeWidth="2.5"
              />

              <motion.path
                d="M 50 150 L 200 50 L 350 150 L 200 250 Z"
                fill="#fffaf8"
                stroke="#8B4049"
                strokeWidth="2"
                initial={{ translateY: 0 }}
                animate={isOpening ? { translateY: -80, opacity: 0.32 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
              />

              <motion.path
                d="M 50 150 L 200 50 L 350 150"
                fill="#ffe7ee"
                stroke="#8B4049"
                strokeWidth="3"
                initial={{ rotateX: 0 }}
                animate={isOpening ? { rotateX: 180 } : {}}
                style={{ originX: '200px', originY: '150px' }}
                transition={{ duration: 1.2, delay: 0.5 }}
                filter="url(#shadow)"
              />

              <motion.circle
                cx="200"
                cy="200"
                r="20"
                fill="#8B4049"
                opacity="0.12"
                initial={{ scale: 0 }}
                animate={isOpening ? {} : { scale: [0, 1.6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>

            <motion.div
              className="absolute left-1/2 top-1/2 w-32 -translate-x-1/2 -translate-y-1/2 sm:w-40 md:w-48"
              initial={{ y: 0, opacity: 0 }}
              animate={isOpening ? { y: -80, opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.5, delay: 1.5 }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.5rem] border-2 border-[#8b4049]/30 bg-[#fffaf8] shadow-[0_25px_50px_rgba(139,64,73,0.18)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#fffefc] via-[#fff4f6] to-[#fde4ea]" />
                <div className="relative flex h-full flex-col items-center justify-center p-3 text-center sm:p-4">
                  <motion.p
                    className="mb-2 text-3xl sm:text-4xl md:text-5xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💌
                  </motion.p>
                  <p className="mt-1 font-display text-xs text-burgundy sm:text-sm md:text-base">For You</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
