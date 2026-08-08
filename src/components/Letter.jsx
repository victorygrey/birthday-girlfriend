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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fffaf8] via-[#fff1f4] to-[#fde9ee] py-8 px-4 sm:py-12 sm:px-6 relative overflow-hidden">
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
        className="romantic-panel relative z-10 w-full max-w-3xl rounded-[2rem] p-6 sm:p-8 md:p-12 lg:p-16"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="heart-pattern absolute inset-2 rounded-[1.6rem] opacity-70" />

        <motion.div
          className="absolute -right-5 -top-5 text-5xl sm:-right-6 sm:-top-6 sm:text-6xl md:text-7xl"
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          💌
        </motion.div>

        <motion.div
          className="absolute -bottom-4 -left-4 text-4xl opacity-60 sm:-bottom-6 sm:-left-6 sm:text-5xl md:text-6xl"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          ❤️
        </motion.div>

        <motion.h1
          className="relative z-10 mb-6 text-center font-display text-2xl text-burgundy sm:text-3xl md:mb-10 md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {letterContent.greeting}
        </motion.h1>

        <div className="relative z-10 space-y-4 text-dark-brown/90 sm:space-y-5 md:space-y-6">
          {letterContent.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              className="font-body text-justify text-sm leading-relaxed sm:text-base md:text-lg lg:text-xl first-letter:mr-1 first-letter:text-3xl first-letter:font-display first-letter:text-burgundy"
              initial={{ opacity: 0, y: 20 }}
              animate={visibleParagraphs > index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="relative z-10 mt-8 text-right sm:mt-10 md:mt-12"
          initial={{ opacity: 0 }}
          animate={visibleParagraphs >= letterContent.paragraphs.length ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="mb-2 font-body text-sm italic text-dark-brown/70 sm:text-base md:text-lg">
            {letterContent.closing}
          </p>
          <p className="font-display text-xl text-burgundy sm:text-2xl md:text-3xl">
            {letterContent.signature}
          </p>
        </motion.div>

        <div className="absolute left-4 top-4 h-16 w-16 rounded-tl-xl border-l-2 border-t-2 border-burgundy/15" />
        <div className="absolute bottom-4 right-4 h-16 w-16 rounded-br-xl border-b-2 border-r-2 border-burgundy/15" />
      </motion.div>
    </div>
  );
}
