import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function Opening({ onOpen }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative z-10">
      <motion.div
        className="w-full max-w-xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Luxury Invitation Card Container */}
        <div className="relative p-7 sm:p-12 rounded-3xl luxury-glass-card overflow-hidden">
          {/* Subtle Golden Ornaments / Corner Filigrees */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/70 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/70 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/70 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/70 rounded-br-lg pointer-events-none" />

          {/* Top Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fcedc7]/60 border border-[#d4af37]/40 mb-6 text-[#8a650c]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles size={14} className="text-[#c59b27] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-royal tracking-[0.25em] uppercase font-bold text-[#8a650c]">
              An Exclusive Invitation
            </span>
            <Sparkles size={14} className="text-[#c59b27] animate-pulse" />
          </motion.div>

          {/* Golden Royal Crest / Wax Seal Centerpiece */}
          <motion.div
            className="relative mx-auto mb-7 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
          >
            {/* Pulsing Aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#f5d061]/35 to-[#e84368]/25 blur-xl animate-pulse" />

            {/* Concentric Gold Rings */}
            <div className="absolute inset-0 rounded-full border border-[#d4af37]/40 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-dashed border-[#d4af37]/35 animate-[spin_25s_linear_infinite_reverse]" />

            {/* Wax Seal Core */}
            <motion.div
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full wax-seal flex flex-col items-center justify-center cursor-pointer select-none"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 10px 25px rgba(90, 15, 30, 0.35)',
                  '0 15px 35px rgba(212, 175, 55, 0.45)',
                  '0 10px 25px rgba(90, 15, 30, 0.35)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Heart size={26} className="text-[#fff5ea] fill-[#fff5ea] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
              <span className="text-[9px] font-royal tracking-widest text-[#fff5ea] font-bold mt-1 uppercase">
                Special
              </span>
            </motion.div>
          </motion.div>

          {/* Script Subheading */}
          <motion.p
            className="font-cursive text-3xl sm:text-4xl text-[#942539] mb-1 leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Untuk Bidadari Tercantikku,
          </motion.p>

          {/* Main Title */}
          <motion.h1
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#3d141d] leading-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Happy Birthday, <span className="gold-gradient-text block sm:inline font-serif font-bold">Sayang ❤️</span>
          </motion.h1>

          {/* Romantic Divider */}
          <div className="flex items-center justify-center gap-3 my-5">
            <span className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <Heart size={14} className="text-[#8f1930] fill-[#8f1930]" />
            <span className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          {/* Description */}
          <motion.p
            className="font-body text-sm sm:text-base text-[#612933] max-w-md mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Sebuah lembaran khusus yang kuciptakan penuh cinta, berisi kenangan manis dan doa terbaikku di hari kelahiranmu.
          </motion.p>

          {/* Open Invitation Button */}
          <motion.button
            onClick={onOpen}
            className="luxury-gold-button relative overflow-hidden px-8 sm:px-12 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-royal tracking-wider font-semibold group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              <span>Buka Surat Cinta</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💌
              </motion.span>
            </span>

            {/* Shimmer light sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </motion.button>

          {/* Footnote */}
          <motion.p
            className="mt-6 text-[11px] font-royal tracking-widest text-[#8a650c]/80 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            ✨ Sentuh untuk membuka & dengarkan lagunya ✨
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
