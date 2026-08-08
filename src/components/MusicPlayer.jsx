import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    const newTime = percent * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-[95%] sm:w-auto max-w-md px-2"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <motion.div 
        className="bg-warm-white/98 backdrop-blur-md rounded-2xl sm:rounded-full shadow-2xl border-2 border-burgundy/30 px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <audio ref={audioRef} src="/music/our-song.mp3" />

        <motion.button
          onClick={togglePlay}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-burgundy text-warm-white flex items-center justify-center hover:bg-burgundy/90 transition-colors flex-shrink-0 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="pause"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <Pause size={20} fill="currentColor" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <Play size={20} fill="currentColor" className="ml-0.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="font-body text-xs sm:text-sm text-burgundy font-semibold truncate mr-2">
              Our Song
            </p>
            <motion.div
              animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-burgundy/60"
            >
              🎵
            </motion.div>
          </div>
          
          <div
            className="w-full h-2 bg-dusty-rose/30 rounded-full cursor-pointer overflow-hidden group relative"
            onClick={handleProgressClick}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-burgundy to-dusty-rose rounded-full relative"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              initial={{ width: 0 }}
            >
              <motion.div
                className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-warm-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.3 }}
              />
            </motion.div>
          </div>
          
          <div className="flex justify-between text-[10px] sm:text-xs text-dark-brown/60 mt-1 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <motion.button
          onClick={toggleMute}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full text-burgundy hover:bg-burgundy/10 flex items-center justify-center transition-colors flex-shrink-0"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isMuted ? (
              <motion.div
                key="muted"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
              >
                <VolumeX size={18} />
              </motion.div>
            ) : (
              <motion.div
                key="unmuted"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
              >
                <Volume2 size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
