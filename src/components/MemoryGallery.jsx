import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { memories } from '../data/memories';
import { Heart, Sparkles, X, Maximize2, ArrowLeft } from 'lucide-react';

export default function MemoryGallery({ onComplete, onBack }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [likedPhotos, setLikedPhotos] = useState({});

  const toggleLike = (id, e) => {
    e?.stopPropagation();
    setLikedPhotos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-16 relative z-10">
      {/* Back button */}
      {onBack && (
        <motion.button
          onClick={onBack}
          className="absolute top-6 left-6 text-xs font-royal tracking-widest text-[#7a1b2d] hover:text-[#c59b27] transition-colors uppercase flex items-center gap-1.5 z-20 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ArrowLeft size={14} /> Kembali ke Surat
        </motion.button>
      )}

      {/* Header */}
      <motion.div
        className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fcedc7]/70 border border-[#d4af37]/40 mb-4 text-[#8a650c]">
          <Sparkles size={13} className="text-[#c59b27]" />
          <span className="text-[10px] sm:text-[11px] font-royal tracking-[0.25em] uppercase font-bold text-[#8a650c]">
            Chapter II • Our Treasured Moments
          </span>
          <Sparkles size={13} className="text-[#c59b27]" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3d141d] font-bold leading-tight">
          Galeri Kenangan <span className="gold-gradient-text">Terindah</span>
        </h2>

        <p className="font-body text-xs sm:text-sm md:text-base text-[#612933] mt-3 leading-relaxed">
          Setiap detik bersamamu adalah lembaran cerita yang paling kusyukuri. Inilah beberapa potongan memori manis kita.
        </p>

        <p className="text-[11px] font-royal tracking-wider text-[#8a650c] mt-2 uppercase font-semibold">
          (Ketuk foto untuk melihat dalam ukuran penuh)
        </p>
      </motion.div>

      {/* Photo Cards Grid */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {memories.map((memory, index) => {
          const isLiked = likedPhotos[memory.id];

          return (
            <motion.div
              key={memory.id || index}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 + index * 0.18,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedPhoto(memory)}
            >
              {/* Luxury Frame Container */}
              <div className="relative rounded-2xl p-3 sm:p-4 bg-white/90 backdrop-blur-md border border-[#d4af37]/40 shadow-[0_20px_45px_rgba(100,20,35,0.08)] group-hover:shadow-[0_25px_55px_rgba(212,175,55,0.22)] group-hover:border-[#d4af37]/80 transition-all duration-500 overflow-hidden">
                {/* Gold corner ornaments */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#d4af37]/60 rounded-tl" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#d4af37]/60 rounded-tr" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#d4af37]/60 rounded-bl" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#d4af37]/60 rounded-br" />

                {/* Top Badge: Moment Number & Like Button */}
                <div className="flex items-center justify-between pb-2 px-1">
                  <span className="text-[10px] font-royal tracking-widest text-[#8a650c] font-bold uppercase">
                    Momen {String(index + 1).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => toggleLike(memory.id, e)}
                    className="p-1 rounded-full text-[#7a1d2e]/60 hover:text-[#d4af37] transition-colors"
                    aria-label="Suka foto"
                  >
                    <Heart
                      size={16}
                      className={isLiked ? 'text-[#e63946] fill-[#e63946]' : ''}
                    />
                  </button>
                </div>

                {/* Image Aspect Box */}
                <div className="relative aspect-[4/5] sm:aspect-square rounded-xl overflow-hidden bg-[#faf4f2] mb-3 group-hover:ring-1 group-hover:ring-[#d4af37]/50 transition-all">
                  <img
                    src={memory.image}
                    alt={memory.title || memory.caption}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const parent = e.target.parentElement;
                      if (parent) {
                        parent.innerHTML =
                          '<div class="flex flex-col items-center justify-center h-full text-center p-4 text-[#d4af37]"><span class="text-4xl mb-2">📸</span><span class="text-xs font-serif italic text-[#3d141d]">Momen Indah Kita</span></div>';
                      }
                    }}
                  />

                  {/* Gradient vignette on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3d141d]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-[11px] font-royal tracking-wider text-[#fffdfa] flex items-center gap-1 font-semibold">
                      <Maximize2 size={13} /> Perbesar Foto
                    </span>
                  </div>
                </div>

                {/* Card Captions */}
                <div className="px-1 pt-1 pb-2">
                  <p className="font-serif text-sm sm:text-base font-bold text-[#3d141d] group-hover:text-[#8a650c] transition-colors">
                    {memory.title}
                  </p>
                  <p className="font-cursive text-base sm:text-lg text-[#942539] mb-1 leading-snug">
                    "{memory.subtitle}"
                  </p>
                  <p className="font-body text-xs text-[#6e3540] line-clamp-2 leading-relaxed">
                    {memory.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Next Action Button */}
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          onClick={onComplete}
          className="luxury-gold-button px-9 sm:px-14 py-3.5 sm:py-4 rounded-full font-royal text-sm sm:text-base tracking-wider font-semibold shadow-2xl inline-flex items-center gap-2.5 group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Masuk ke Kejutan Terakhir</span>
          <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
        </motion.button>

        <p className="mt-3 text-[11px] font-royal tracking-widest text-[#8a650c] uppercase font-bold">
          ✨ Satu harapan spesial menantimu ✨
        </p>
      </motion.div>

      {/* Lightbox Modal (Zoomed View) */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="relative max-w-xl w-full bg-white rounded-3xl p-4 sm:p-6 border border-[#d4af37]/60 shadow-[0_30px_90px_rgba(0,0,0,0.5)] overflow-hidden"
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/40 text-white flex items-center justify-center hover:bg-[#872036] transition-colors cursor-pointer"
                aria-label="Tutup foto"
              >
                <X size={18} />
              </button>

              {/* Photo */}
              <div className="relative aspect-[4/4.5] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-[#faf4f2] mb-4 border border-[#d4af37]/40 shadow-inner">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Description */}
              <div className="text-center px-2">
                <span className="text-[10px] font-royal tracking-[0.25em] uppercase text-[#8a650c] font-bold">
                  {selectedPhoto.date || 'Memori Abadi'}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#3d141d] font-bold mt-1">
                  {selectedPhoto.title}
                </h3>
                <p className="font-cursive text-xl sm:text-2xl text-[#942539] mt-0.5">
                  "{selectedPhoto.subtitle}"
                </p>
                <p className="font-body text-xs sm:text-sm text-[#54212a] mt-2 leading-relaxed max-w-md mx-auto">
                  {selectedPhoto.caption}
                </p>

                {/* Love reaction button in modal */}
                <div className="mt-4 pt-4 border-t border-[#d4af37]/25 flex items-center justify-center gap-3">
                  <motion.button
                    onClick={() => toggleLike(selectedPhoto.id)}
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#781829] hover:bg-[#912135] text-xs font-royal tracking-wider text-white transition-colors cursor-pointer shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart
                      size={15}
                      className={
                        likedPhotos[selectedPhoto.id]
                          ? 'text-[#ff758f] fill-[#ff758f]'
                          : 'text-white'
                      }
                    />
                    <span>
                      {likedPhotos[selectedPhoto.id]
                        ? 'Tersimpan di Hatiku ❤️'
                        : 'Sukai Momen Ini'}
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
