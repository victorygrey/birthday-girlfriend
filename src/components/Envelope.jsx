import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Envelope({ onComplete, onBack }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sealBroken, setSealBroken] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setSealBroken(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10">
      {/* Back button */}
      {onBack && (
        <motion.button
          onClick={onBack}
          className="absolute top-6 left-6 text-xs font-royal tracking-widest text-[#7a1b2d] hover:text-[#c59b27] transition-colors uppercase flex items-center gap-1.5 z-20 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ← Kembali ke Undangan
        </motion.button>
      )}

      {/* Header Prompt */}
      <motion.div
        className="text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[11px] font-royal tracking-[0.3em] uppercase text-[#8a650c] block mb-1.5 font-bold">
          Exclusive Royal Delivery
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#3d141d] font-bold">
          {isOpen ? 'Suratmu Telah Terbuka...' : 'Ada Sepucuk Surat Untukmu'}
        </h2>
        <p className="font-body text-xs sm:text-sm text-[#6e3540] mt-1.5">
          {isOpen
            ? 'Sentuh tombol di bawah untuk membaca isi surat dengan tenang'
            : 'Ketuk stempel lilin emas untuk merobek segel dan membukanya'}
        </p>
      </motion.div>

      {/* 3D Envelope Container */}
      <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] aspect-[4/3] perspective-1000 flex items-center justify-center">
        {/* Golden ambient aura behind envelope */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/25 via-[#e8899e]/25 to-[#f6e6be]/30 blur-2xl rounded-3xl" />

        {/* Envelope Body */}
        <div className="relative w-full h-[250px] sm:h-[300px] md:h-[320px] rounded-2xl bg-[#7a1d2e] border border-[#d4af37]/50 shadow-[0_25px_60px_rgba(100,20,35,0.25),inset_0_1px_2px_rgba(255,255,255,0.3)] overflow-visible">
          {/* Inner lining: Rose-gold pattern */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#4a101b] to-[#691827] overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          {/* Letter Card (Inside, slides out when opened) */}
          <motion.div
            className="absolute left-[6%] right-[6%] bottom-3 top-3 rounded-xl parchment-texture p-4 sm:p-6 shadow-2xl flex flex-col items-center justify-center text-center cursor-pointer border border-[#d4af37]/60"
            initial={{ y: 0, scale: 0.95 }}
            animate={
              isOpen
                ? {
                    y: -140,
                    scale: 1.05,
                    zIndex: 25,
                    boxShadow: '0 25px 50px rgba(90,20,35,0.25)',
                  }
                : { y: 0, scale: 0.95, zIndex: 5 }
            }
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            onClick={isOpen ? onComplete : handleOpenEnvelope}
          >
            {/* Monogram on peek */}
            <div className="w-9 h-9 rounded-full border border-[#d4af37] flex items-center justify-center mb-2 bg-[#fffdfa] shadow-sm">
              <Heart size={16} className="text-[#872036] fill-[#872036]" />
            </div>
            <p className="font-royal text-[10px] tracking-[0.25em] uppercase text-[#872036] font-bold">
              Private & Confidential
            </p>
            <p className="font-cursive text-2xl sm:text-3xl text-[#521321] mt-1 font-semibold">
              Happy Birthday, Sayang
            </p>
            <p className="font-serif italic text-[11px] sm:text-xs text-[#521321]/80 mt-1">
              "Setiap hari bersamamu adalah hadiah terindah..."
            </p>

            {isOpen && (
              <motion.span
                className="mt-3 text-[10px] font-royal tracking-widest text-[#fff] font-bold bg-[#781829] px-3.5 py-1.5 rounded-full uppercase shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Klik untuk baca lembaran penuh ➔
              </motion.span>
            )}
          </motion.div>

          {/* Envelope Pocket (Front flap triangle layers) */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-2xl">
            {/* Bottom triangular flap */}
            <svg
              viewBox="0 0 460 320"
              className="w-full h-full preserve-3d"
              preserveAspectRatio="none"
            >
              {/* Left flap */}
              <polygon
                points="0,0 230,160 0,320"
                fill="#611422"
                opacity="0.96"
              />
              {/* Right flap */}
              <polygon
                points="460,0 230,160 460,320"
                fill="#54111d"
                opacity="0.98"
              />
              {/* Bottom fold */}
              <polygon
                points="0,320 230,150 460,320"
                fill="#73192b"
                stroke="#d4af37"
                strokeWidth="0.8"
                strokeOpacity="0.45"
              />
            </svg>
          </div>

          {/* Top Flap (Opens Upwards with 3D Flip) */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 origin-top z-20 overflow-visible"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ rotateX: 0 }}
            animate={isOpen ? { rotateX: 180, zIndex: 1 } : { rotateX: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <svg
              viewBox="0 0 460 160"
              className="w-full h-full drop-shadow-[0_10px_18px_rgba(80,15,30,0.3)]"
              preserveAspectRatio="none"
            >
              <polygon
                points="0,0 230,160 460,0"
                fill="#821f31"
                stroke="#d4af37"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
            </svg>
          </motion.div>

          {/* Wax Seal Center (Positioned at flap tip) */}
          <AnimatePresence>
            {!sealBroken && (
              <motion.div
                className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer"
                onClick={handleOpenEnvelope}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{
                  scale: 1.5,
                  opacity: 0,
                  filter: 'blur(8px)',
                  transition: { duration: 0.4 },
                }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
              >
                {/* Golden pulsing ring around wax seal */}
                <div className="absolute -inset-3 rounded-full border border-[#d4af37]/60 animate-ping opacity-60" />
                <div className="absolute -inset-1.5 rounded-full border border-[#d4af37]/80 animate-pulse" />

                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full wax-seal flex flex-col items-center justify-center shadow-[0_15px_30px_rgba(90,15,30,0.4),0_0_20px_rgba(212,175,55,0.4)]">
                  <Heart size={20} className="text-[#fff5ea] fill-[#fff5ea] drop-shadow-md" />
                  <span className="text-[8px] font-royal tracking-widest text-[#fff5ea] font-bold mt-0.5 uppercase">
                    Buka
                  </span>
                </div>

                {/* Floating tooltip */}
                <motion.div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 px-3 py-1 rounded-full border border-[#d4af37]/60 text-[10px] font-royal tracking-wider text-[#781829] font-bold shadow-lg pointer-events-none"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ✨ Sentuh Untuk Membuka ✨
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Action Button (When open, smooth manual progression) */}
      <div className="mt-14 sm:mt-16 text-center z-20">
        {isOpen ? (
          <motion.button
            onClick={onComplete}
            className="luxury-gold-button px-8 sm:px-12 py-3 sm:py-3.5 rounded-full font-royal text-sm sm:text-base tracking-wider font-semibold shadow-2xl flex items-center gap-2 mx-auto cursor-pointer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Baca Surat Selengkapnya</span>
            <Sparkles size={16} />
          </motion.button>
        ) : (
          <motion.button
            onClick={handleOpenEnvelope}
            className="text-xs font-royal tracking-widest text-[#7a1b2d] hover:text-[#c59b27] underline underline-offset-8 transition-colors uppercase font-semibold cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Atau klik di sini untuk membuka amplop
          </motion.button>
        )}
      </div>
    </div>
  );
}
