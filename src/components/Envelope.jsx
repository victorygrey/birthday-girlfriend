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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-white via-cream to-soft-pink relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
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
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {i % 2 === 0 ? (
              <div className="w-2 h-2 bg-dusty-rose rounded-full"></div>
            ) : (
              <Sparkles className="text-burgundy/20" size={16} />
            )}
          </motion.div>
        ))}
      </div>

      <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg px-4 sm:px-6">
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative w-full drop-shadow-2xl"
            animate={isOpening ? { y: -10 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <svg viewBox="0 0 400 300" className="w-full h-auto">
              <defs>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3"/>
                </filter>
              </defs>
              
              <motion.path
                d="M 50 150 L 200 50 L 350 150 L 350 250 L 50 250 Z"
                fill="#D4A5A5"
                stroke="#8B4049"
                strokeWidth="3"
                filter="url(#shadow)"
              />
              
              <motion.path
                d="M 50 150 L 200 250 L 350 150"
                fill="none"
                stroke="#8B4049"
                strokeWidth="2"
              />

              <motion.path
                d="M 50 150 L 200 50 L 350 150 L 200 250 Z"
                fill="#FFFBF5"
                stroke="#8B4049"
                strokeWidth="2"
                initial={{ translateY: 0 }}
                animate={isOpening ? { translateY: -80, opacity: 0.3 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
              />

              <motion.path
                d="M 50 150 L 200 50 L 350 150"
                fill="#FFE5E5"
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
                opacity="0.1"
                initial={{ scale: 0 }}
                animate={isOpening ? {} : { scale: [0, 1.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>

            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 sm:w-40 md:w-48"
              initial={{ y: 0, opacity: 0 }}
              animate={isOpening ? { y: -80, opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.5, delay: 1.5 }}
            >
              <div className="w-full aspect-[3/4] bg-warm-white border-2 border-burgundy/30 rounded-lg shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-warm-white via-cream/50 to-soft-pink/30"></div>
                <div className="relative p-3 sm:p-4 text-center flex flex-col items-center justify-center h-full">
                  <motion.p 
                    className="text-3xl sm:text-4xl md:text-5xl mb-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💌
                  </motion.p>
                  <p className="font-display text-burgundy text-xs sm:text-sm md:text-base mt-1">For You</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
