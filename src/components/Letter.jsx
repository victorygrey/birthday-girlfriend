import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { letterContent } from '../data/letter';

export default function Letter({ onComplete }) {
  const [visibleParagraphs, setVisibleParagraphs] = useState(0);

  useEffect(() => {
    const timers = letterContent.paragraphs.map((_, index) => {
      return setTimeout(() => {
        setVisibleParagraphs(index + 1);
      }, (index + 1) * 1200);
    });

    const completeTimer = setTimeout(() => {
      onComplete();
    }, (letterContent.paragraphs.length + 1) * 1200 + 2000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-warm-white to-soft-pink py-8 sm:py-12 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl sm:text-3xl"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: -50,
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <span className="text-burgundy/10">✨</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-3xl w-full bg-warm-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16 border-2 border-dusty-rose/20"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute -top-5 -right-5 sm:-top-6 sm:-right-6 text-5xl sm:text-6xl md:text-7xl filter drop-shadow-lg"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          💌
        </motion.div>

        <motion.div
          className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 text-4xl sm:text-5xl md:text-6xl opacity-60"
          animate={{ 
            rotate: [0, -10, 10, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          ❤️
        </motion.div>

        <motion.h1
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-burgundy text-center mb-6 sm:mb-8 md:mb-10 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {letterContent.greeting}
        </motion.h1>

        <div className="space-y-4 sm:space-y-5 md:space-y-6 text-dark-brown/90 leading-relaxed">
          {letterContent.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              className="font-body text-sm sm:text-base md:text-lg lg:text-xl text-justify first-letter:text-3xl first-letter:font-display first-letter:text-burgundy first-letter:mr-1"
              initial={{ opacity: 0, y: 20 }}
              animate={
                visibleParagraphs > index
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.8 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="mt-8 sm:mt-10 md:mt-12 text-right"
          initial={{ opacity: 0 }}
          animate={
            visibleParagraphs >= letterContent.paragraphs.length
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="font-body text-sm sm:text-base md:text-lg text-dark-brown/70 italic mb-2">
            {letterContent.closing}
          </p>
          <p className="font-display text-xl sm:text-2xl md:text-3xl text-burgundy">
            {letterContent.signature}
          </p>
        </motion.div>

        <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-burgundy/10 rounded-tl-xl"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-burgundy/10 rounded-br-xl"></div>
      </motion.div>
    </div>
  );
}
