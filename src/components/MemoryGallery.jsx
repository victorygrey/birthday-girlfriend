import { motion } from 'framer-motion';
import { memories } from '../data/memories';
import { Heart } from 'lucide-react';

export default function MemoryGallery({ onComplete }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-warm-white via-soft-pink to-cream py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Heart className="text-burgundy/20" size={Math.random() * 20 + 15} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="max-w-6xl w-full relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-burgundy mb-3 sm:mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Before you go...
          </motion.h2>

          <motion.p
            className="font-body text-dark-brown/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Some moments we've shared together
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14">
          {memories.map((memory, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 60, rotate: index % 2 === 0 ? -8 : 8 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ 
                delay: 0.8 + index * 0.25,
                duration: 0.7,
                type: "spring",
                bounce: 0.4
              }}
              whileHover={{ 
                scale: 1.08, 
                rotate: index % 2 === 0 ? 3 : -3,
                zIndex: 10
              }}
            >
              <div className="bg-warm-white p-3 sm:p-4 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-2 border-dusty-rose/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-burgundy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="aspect-square bg-gradient-to-br from-soft-pink to-cream rounded-lg overflow-hidden mb-3 sm:mb-4 flex items-center justify-center relative">
                  <img
                    src={memory.image}
                    alt={memory.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-5xl sm:text-6xl md:text-7xl animate-pulse">💕</div>';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="relative z-10">
                  <p className="font-body text-xs sm:text-sm md:text-base text-dark-brown/80 text-center italic leading-relaxed">
                    {memory.caption}
                  </p>
                </div>

                <motion.div
                  className="absolute top-2 right-2 text-burgundy/0 group-hover:text-burgundy/80 transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Heart size={20} fill="currentColor" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          <motion.button
            onClick={onComplete}
            className="group bg-burgundy text-warm-white px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-full font-body font-semibold text-base sm:text-lg md:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2 justify-center">
              One More Thing 
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ❤️
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-burgundy via-dusty-rose to-burgundy"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.7 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
