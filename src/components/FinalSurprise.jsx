import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw, Music, Flame } from 'lucide-react';

export default function FinalSurprise({ onShowMusic, onRestart, onBack }) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishesVisible, setWishesVisible] = useState(false);

  const triggerLuxuryConfetti = () => {
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      // Rose gold & golden foil confetti
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#D4AF37', '#F6E6BE', '#E5889E', '#FFDFE7', '#C59B27'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#D4AF37', '#F6E6BE', '#E5889E', '#FFDFE7', '#C59B27'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Center starburst
    setTimeout(() => {
      confetti({
        particleCount: 70,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFD700', '#FF69B4', '#FFF'],
      });
    }, 500);
  };

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    triggerLuxuryConfetti();
    setTimeout(() => {
      setWishesVisible(true);
    }, 800);
  };

  const handleRelight = () => {
    setCandlesBlown(false);
    setWishesVisible(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-16 relative z-10 text-center">
      {/* Back button */}
      {onBack && (
        <motion.button
          onClick={onBack}
          className="absolute top-6 left-6 text-xs font-royal tracking-widest text-[#7a1b2d] hover:text-[#c59b27] transition-colors uppercase flex items-center gap-1.5 z-20 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ← Kembali ke Kenangan
        </motion.button>
      )}

      {/* Top Header */}
      <motion.div
        className="max-w-xl mx-auto mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fcedc7]/70 border border-[#d4af37]/40 mb-3 text-[10px] sm:text-[11px] font-royal tracking-[0.25em] uppercase text-[#8a650c] font-bold">
          <Sparkles size={13} className="text-[#c59b27]" />
          The Grand Celebration
          <Sparkles size={13} className="text-[#c59b27]" />
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#3d141d] font-bold leading-tight">
          Happy Birthday, <span className="gold-gradient-text">My Love!</span> 🎂
        </h1>
        <p className="font-body text-xs sm:text-sm text-[#6e3540] mt-2 max-w-md mx-auto">
          {candlesBlown
            ? 'Semua doa dan harapan terindahmu telah melesat menuju semesta ✨'
            : 'Tutup matamu, buat satu permohonan tulus di dalam hati, lalu tiup lilinnya.'}
        </p>
      </motion.div>

      {/* 3D-styled Birthday Cake Container */}
      <motion.div
        className="relative my-4 sm:my-6 w-72 sm:w-80 h-72 flex flex-col items-center justify-end select-none"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Glow behind cake */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/25 via-[#e5889e]/20 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Candles on top */}
        <div className="relative z-20 flex items-end justify-center gap-6 sm:gap-8 mb-[-4px]">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* Candle Flame */}
              <AnimatePresence>
                {!candlesBlown ? (
                  <motion.div
                    className="candle-flame w-4 h-6 sm:w-4.5 sm:h-7 rounded-full bg-gradient-to-t from-[#ff7a00] via-[#ffd000] to-[#ffffff] shadow-[0_0_16px_rgba(255,200,60,0.95)] cursor-pointer"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{
                      scale: 0,
                      opacity: 0,
                      y: -10,
                      transition: { duration: 0.3 },
                    }}
                    onClick={handleBlowCandles}
                  />
                ) : (
                  /* Smoke puff when blown */
                  <motion.div
                    className="w-2 h-6 flex flex-col items-center"
                    initial={{ opacity: 0.9, y: 0 }}
                    animate={{ opacity: 0, y: -25, scale: 1.8 }}
                    transition={{ duration: 1 }}
                  >
                    <span className="text-[10px] text-[#781829]/60">💨</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candle Wick */}
              <div className="w-[1.5px] h-2.5 bg-[#40121a]" />

              {/* Candle Stick */}
              <div
                className={`w-3 sm:w-3.5 h-12 rounded-t-sm shadow-md border-x border-[#d4af37]/50 ${
                  idx === 1
                    ? 'h-14 bg-gradient-to-b from-[#fcebb6] via-[#d4af37] to-[#8a650c]'
                    : 'bg-gradient-to-b from-[#ffe5eb] via-[#f7cad0] to-[#e5889e]'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Cake Tier 1 (Top Tier) */}
        <div className="relative z-10 w-44 sm:w-48 h-16 rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#fff0f4] to-[#fde2e8] border-2 border-[#d4af37]/60 shadow-[0_8px_20px_rgba(100,20,35,0.15)] flex items-center justify-around px-3 overflow-hidden">
          {/* Gold pearls trim */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#d4af37]/30 flex justify-between px-1">
            {[...Array(9)].map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-sm" />
            ))}
          </div>
          <span className="text-xs">🍓</span>
          <span className="text-xs font-serif text-[#781829] font-bold tracking-widest">
            LOVE
          </span>
          <span className="text-xs">🍓</span>
        </div>

        {/* Cake Tier 2 (Bottom Tier) */}
        <div className="relative z-0 w-64 sm:w-72 h-20 rounded-2xl bg-gradient-to-b from-[#781829] via-[#8c2235] to-[#5e1220] border-2 border-[#d4af37] shadow-[0_15px_35px_rgba(90,20,35,0.25)] -mt-2 flex flex-col items-center justify-center overflow-hidden">
          {/* Golden ribbon wrap */}
          <div className="w-full h-3 bg-gradient-to-r from-[#d4af37] via-[#fcebb6] to-[#d4af37] opacity-80 shadow-inner" />
          <p className="font-cursive text-2xl sm:text-3xl text-[#fcebb6] mt-1 drop-shadow">
            For You, Sayang ❤️
          </p>
        </div>

        {/* Cake Pedestal / Stand */}
        <div className="w-72 sm:w-80 h-4 rounded-full bg-gradient-to-r from-[#b8861b] via-[#e2be58] to-[#b8861b] shadow-[0_10px_25px_rgba(212,175,55,0.35)] border border-[#fcebb6]" />
      </motion.div>

      {/* Blow Candle Action Button / Relight */}
      <div className="my-4 z-20">
        {!candlesBlown ? (
          <motion.button
            onClick={handleBlowCandles}
            className="luxury-gold-button px-8 sm:px-12 py-3.5 sm:py-4 rounded-full font-royal text-sm sm:text-base tracking-wider font-semibold shadow-2xl flex items-center gap-2.5 mx-auto group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Flame size={18} className="text-[#ffffff] animate-bounce" />
            <span>Tiup Lilin & Buat Harapan</span>
            <Sparkles size={16} />
          </motion.button>
        ) : (
          <motion.button
            onClick={handleRelight}
            className="text-xs font-royal tracking-widest text-[#7a1b2d] hover:text-[#c59b27] transition-colors uppercase flex items-center gap-1.5 mx-auto py-2 font-bold cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <RotateCcw size={13} /> Nyalakan Lilin Lagi
          </motion.button>
        )}
      </div>

      {/* Birthday Wish Card (Appears after blowing candles) */}
      <AnimatePresence>
        {wishesVisible && (
          <motion.div
            className="w-full max-w-xl mx-auto parchment-texture rounded-3xl p-6 sm:p-8 border border-[#d4af37]/70 shadow-[0_25px_60px_rgba(90,20,35,0.18)] text-[#2b1419] my-6 text-center"
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            <div className="w-10 h-10 mx-auto rounded-full bg-[#781829] text-[#fcebb6] flex items-center justify-center mb-3 border border-[#d4af37] shadow-sm">
              <Heart size={18} fill="currentColor" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#521321] font-bold">
              Harapanku Untukmu di Usia Baru Ini
            </h3>

            <p className="font-cursive text-xl sm:text-2xl text-[#872036] mt-1 font-semibold">
              "Semoga bahagia selalu menjadi sahabat setiamu."
            </p>

            <div className="my-4 h-[1px] w-24 mx-auto bg-[#d4af37]" />

            <div className="space-y-3 font-body text-xs sm:text-sm md:text-base text-[#38161d] leading-relaxed">
              <p>
                Terima kasih sudah lahir ke dunia ini dan memilih untuk berjalan bersamaku. Semoga setiap langkahmu selalu dipenuhi kemudahan, kesehatan, dan senyuman yang tak pernah padam.
              </p>
              <p className="font-serif italic text-[#781829] font-medium">
                Aku mencintaimu hari ini, esok, dan di setiap lembaran waktu yang akan kita lalui bersama.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#d4af37]/30 flex flex-wrap items-center justify-center gap-3">
              <motion.button
                onClick={triggerLuxuryConfetti}
                className="px-5 py-2.5 rounded-full bg-[#781829] text-[#fffdfa] hover:bg-[#912135] text-xs font-royal tracking-wider font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>🎉 Hujan Konfeti Lagi</span>
              </motion.button>

              <motion.button
                onClick={onShowMusic}
                className="px-5 py-2.5 rounded-full bg-[#fcedc7] border border-[#d4af37] text-[#521321] hover:bg-[#f6e4bc] text-xs font-royal tracking-wider font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Music size={13} />
                <span>Putar Lagu Kita</span>
              </motion.button>

              {onRestart && (
                <motion.button
                  onClick={onRestart}
                  className="px-5 py-2.5 rounded-full bg-white/80 border border-[#781829]/30 text-[#521321] hover:bg-white text-xs font-royal tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer font-semibold shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw size={13} />
                  <span>Ulangi Cerita</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
