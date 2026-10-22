import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, ChevronDown } from 'lucide-react';

const MusicPlayer = forwardRef(function MusicPlayer({ isAutoPlayRequested }, ref) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  useImperativeHandle(ref, () => ({
    playAudio: () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Audio autoplay prevented, awaiting user gesture:", err);
        });
      }
    },
    pauseAudio: () => {
      audioRef.current?.pause();
      setIsPlaying(false);
    },
    togglePlay: () => {
      togglePlay();
    }
  }));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => {
      // Loop music smoothly
      audio.currentTime = 0;
      audio.play().catch(() => setIsPlaying(false));
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    if (isAutoPlayRequested && audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isAutoPlayRequested]);

  const togglePlay = (e) => {
    e?.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Play error:", err));
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = (e) => {
    e.stopPropagation();
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - bounds.left) / bounds.width));
    const newTime = percent * duration;
    if (audioRef.current && !isNaN(newTime)) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <audio ref={audioRef} src="/music/our-song.mp3" preload="auto" loop />

      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-[calc(100vw-2rem)]"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* Compact Pill */
            <motion.div
              key="compact"
              onClick={() => setIsExpanded(true)}
              className="group cursor-pointer flex items-center gap-3 py-2 px-3.5 sm:px-4 rounded-full bg-white/95 hover:bg-white border border-[#d4af37]/50 shadow-[0_10px_30px_rgba(90,20,35,0.15),0_0_15px_rgba(212,175,55,0.25)] backdrop-blur-xl transition-all duration-300"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              whileHover={{ scale: 1.04 }}
            >
              {/* Rotating Vinyl Icon */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#c59b27] via-[#8c1d32] to-[#f4e6be] p-[1.5px]"
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-full h-full rounded-full bg-[#781829] flex items-center justify-center">
                    <Music size={13} className="text-[#fcebb6]" />
                  </div>
                </motion.div>
                {isPlaying && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d4af37]"></span>
                  </span>
                )}
              </div>

              {/* Sound waves animation */}
              <div className="flex items-center gap-0.5 h-4">
                {[0.4, 0.9, 0.6, 1, 0.5].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-[2.5px] rounded-full bg-gradient-to-t from-[#8c1d32] to-[#d4af37]"
                    animate={
                      isPlaying
                        ? { height: ['4px', `${h * 16}px`, '4px'] }
                        : { height: '4px' }
                    }
                    transition={{
                      duration: 0.8 + i * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <div className="text-left hidden xs:block sm:block">
                <p className="text-[11px] font-serif tracking-wider text-[#3d141d] font-bold leading-none">
                  Our Melody
                </p>
                <p className="text-[9px] text-[#7a1b2d] tracking-widest uppercase mt-0.5 font-semibold">
                  {isPlaying ? 'Playing' : 'Paused'}
                </p>
              </div>

              {/* Quick Play/Pause button */}
              <button
                type="button"
                onClick={togglePlay}
                className="w-7 h-7 rounded-full bg-[#fcedc7] hover:bg-[#f6e4bc] text-[#781829] flex items-center justify-center transition-colors ml-1 cursor-pointer border border-[#d4af37]/40 shadow-sm"
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="ml-0.5" />}
              </button>
            </motion.div>
          ) : (
            /* Expanded Player */
            <motion.div
              key="expanded"
              className="w-72 sm:w-80 p-4 rounded-2xl bg-white/95 border border-[#d4af37]/50 shadow-[0_20px_50px_rgba(90,20,35,0.2)] backdrop-blur-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/25">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                  <span className="text-[11px] font-royal tracking-widest text-[#8a650c] uppercase font-bold">
                    Our Love Song
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="p-1 rounded-full text-black/50 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              <div className="py-3 flex items-center gap-3">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#781829] via-[#d4af37] to-[#ffe5eb] p-[1.5px] shadow-md flex-shrink-0"
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-full h-full rounded-[10px] bg-[#781829] flex items-center justify-center">
                    <Music size={18} className="text-[#fcebb6]" />
                  </div>
                </motion.div>

                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm text-[#3d141d] font-bold truncate">
                    A Thousand Years & Memories
                  </p>
                  <p className="font-cursive text-base text-[#781829] truncate leading-tight font-semibold">
                    Dedicated to you, Sayang ❤️
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div
                  className="w-full h-2 bg-[#f4e6eb] hover:bg-[#ebd3dc] rounded-full cursor-pointer relative overflow-hidden group transition-all"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-gradient-to-r from-[#781829] to-[#d4af37] rounded-full relative transition-all"
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#6e3540] font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2 rounded-full text-[#781829] hover:text-[#c59b27] transition-colors cursor-pointer"
                  aria-label="Toggle mute"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                <motion.button
                  type="button"
                  onClick={togglePlay}
                  className="w-11 h-11 rounded-full luxury-gold-button flex items-center justify-center shadow-lg transition-transform cursor-pointer"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? (
                    <Pause size={18} fill="currentColor" />
                  ) : (
                    <Play size={18} fill="currentColor" className="ml-0.5" />
                  )}
                </motion.button>

                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="text-[10px] text-[#781829] hover:text-black uppercase tracking-wider font-royal font-bold cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
});

export default MusicPlayer;
