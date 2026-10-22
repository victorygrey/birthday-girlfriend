import { motion } from 'framer-motion';
import { letterContent } from '../data/letter';
import { Heart, Sparkles, Feather, ChevronRight, ArrowLeft } from 'lucide-react';

export default function Letter({ onComplete, onBack }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:py-16 relative z-10">
      {/* Back button */}
      {onBack && (
        <motion.button
          onClick={onBack}
          className="absolute top-6 left-6 text-xs font-royal tracking-widest text-[#7a1b2d] hover:text-[#c59b27] transition-colors uppercase flex items-center gap-1.5 z-20 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ArrowLeft size={14} /> Kembali
        </motion.button>
      )}

      {/* Main Parchment Letter Container */}
      <motion.div
        className="relative w-full max-w-3xl parchment-texture rounded-3xl p-6 sm:p-10 md:p-14 lg:p-16 border border-[#d4af37]/60 shadow-[0_30px_70px_rgba(90,20,35,0.15)] overflow-hidden text-[#2b1419]"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Ornate Gold Foil Filigree Corners */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#d4af37] rounded-tl-xl pointer-events-none" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#d4af37] rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#d4af37] rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#d4af37] rounded-br-xl pointer-events-none" />

        {/* Double inner gold frame line */}
        <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-[#d4af37]/35 pointer-events-none" />

        {/* Letterhead Header */}
        <div className="text-center mb-8 sm:mb-10 relative z-10">
          {/* Monogram Seal */}
          <motion.div
            className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-[#781829] to-[#9c2438] border-2 border-[#d4af37] shadow-md flex items-center justify-center mb-3 text-[#fcebb6]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <Feather size={20} />
          </motion.div>

          <motion.p
            className="font-royal text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#7a1528] font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            A Handwritten Letter For You
          </motion.p>

          <motion.h1
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#521321] font-bold mt-2 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {letterContent.greeting}
          </motion.h1>

          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <Heart size={14} className="text-[#872036] fill-[#872036]" />
            <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>
        </div>

        {/* Letter Body Paragraphs */}
        <div className="relative z-10 space-y-5 sm:space-y-6 text-[#38161d] font-body text-sm sm:text-base md:text-lg leading-relaxed">
          {letterContent.paragraphs.map((paragraph, index) => {
            const isFirst = index === 0;
            const isHighlight = index === 1;

            if (isHighlight) {
              return (
                <motion.div
                  key={index}
                  className="my-6 p-4 sm:p-5 rounded-2xl bg-[#fff4e8]/80 border-l-4 border-[#872036] shadow-sm italic font-serif text-base sm:text-lg md:text-xl text-[#5c1626]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.15 }}
                >
                  <p className="leading-relaxed">"{paragraph}"</p>
                </motion.div>
              );
            }

            return (
              <motion.p
                key={index}
                className={`text-justify ${
                  isFirst
                    ? 'first-letter:float-left first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#781829] first-letter:mr-2.5 first-letter:leading-none'
                    : ''
                }`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.12 }}
              >
                {paragraph}
              </motion.p>
            );
          })}
        </div>

        {/* Letter Closing & Signature */}
        <motion.div
          className="relative z-10 mt-10 sm:mt-14 pt-6 border-t border-[#d4af37]/35 flex flex-col sm:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {/* Left subtle stamp */}
          <div className="flex items-center gap-2 text-xs font-royal text-[#7a1528] tracking-wider font-semibold">
            <Sparkles size={14} className="text-[#c59b27]" />
            <span>Abadi Dalam Setiap Doa</span>
          </div>

          {/* Right Signature */}
          <div className="text-center sm:text-right">
            <p className="font-serif italic text-sm text-[#521321]/80 mb-1">
              {letterContent.closing}
            </p>
            <p className="font-cursive text-3xl sm:text-4xl text-[#781829] font-bold tracking-wide">
              {letterContent.signature}
            </p>
          </div>
        </motion.div>

        {/* Next Step Button (Take control, read whenever ready) */}
        <motion.div
          className="relative z-10 mt-10 sm:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            onClick={onComplete}
            className="luxury-wine-button px-8 sm:px-12 py-3.5 sm:py-4 rounded-full font-royal text-sm sm:text-base tracking-wider font-semibold shadow-xl inline-flex items-center gap-2.5 group cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span>Lanjut ke Galeri Kenangan</span>
            <ChevronRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.button>

          <p className="mt-3 text-[11px] font-royal tracking-widest text-[#7a1528]/80 uppercase font-semibold">
            Buka lembaran foto momen terindah kita
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
