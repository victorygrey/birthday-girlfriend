import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Opening from './components/Opening';
import Envelope from './components/Envelope';
import Letter from './components/Letter';
import MemoryGallery from './components/MemoryGallery';
import FinalSurprise from './components/FinalSurprise';
import MusicPlayer from './components/MusicPlayer';
import RomanticBackground from './components/RomanticBackground';

const STAGES = [
  { id: 'opening', label: 'Undangan' },
  { id: 'envelope', label: 'Segel Lilin' },
  { id: 'letter', label: 'Surat Kasih' },
  { id: 'memories', label: 'Kenangan' },
  { id: 'final', label: 'Kue & Harapan' },
];

function App() {
  const [stage, setStage] = useState('opening');
  const [isAutoPlayRequested, setIsAutoPlayRequested] = useState(false);
  const musicRef = useRef(null);

  const startMusicAndProceed = () => {
    setIsAutoPlayRequested(true);
    musicRef.current?.playAudio();
    setStage('envelope');
  };

  const handleStageChange = (newStage) => {
    setStage(newStage);
  };

  const currentStageIndex = STAGES.findIndex((s) => s.id === stage);

  return (
    <div className="relative min-h-screen text-[#3d141d] font-body selection:bg-[#d4af37]/30 selection:text-[#3d141d]">
      {/* Ambient Romantic Background (Cream & Rose Silk) */}
      <RomanticBackground />

      {/* Top Luxury Breadcrumb / Step Indicator */}
      {stage !== 'opening' && (
        <motion.header
          className="fixed top-3 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <nav className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full luxury-glass-nav border border-[#d4af37]/40 shadow-[0_8px_25px_rgba(100,20,35,0.08)]">
            {STAGES.map((s, index) => {
              const isActive = s.id === stage;
              const isPast = index <= currentStageIndex;

              return (
                <button
                  key={s.id}
                  onClick={() => handleStageChange(s.id)}
                  className={`flex items-center gap-1 px-2.5 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-royal tracking-wider uppercase transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#781829] text-[#fffdfa] font-bold shadow-[0_2px_8px_rgba(120,24,41,0.35)]'
                      : isPast
                      ? 'text-[#781829] hover:text-[#c59b27] font-semibold'
                      : 'text-[#8f5a67]/70 hover:text-[#781829]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              );
            })}
          </nav>
        </motion.header>
      )}

      {/* Main Content Transitions */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {stage === 'opening' && (
            <motion.div
              key="opening"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              <Opening onOpen={startMusicAndProceed} />
            </motion.div>
          )}

          {stage === 'envelope' && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              <Envelope
                onComplete={() => setStage('letter')}
                onBack={() => setStage('opening')}
              />
            </motion.div>
          )}

          {stage === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              <Letter
                onComplete={() => setStage('memories')}
                onBack={() => setStage('envelope')}
              />
            </motion.div>
          )}

          {stage === 'memories' && (
            <motion.div
              key="memories"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              <MemoryGallery
                onComplete={() => setStage('final')}
                onBack={() => setStage('letter')}
              />
            </motion.div>
          )}

          {stage === 'final' && (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              <FinalSurprise
                onShowMusic={() => musicRef.current?.togglePlay()}
                onRestart={() => setStage('opening')}
                onBack={() => setStage('memories')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Global Luxury Music Player */}
      <MusicPlayer ref={musicRef} isAutoPlayRequested={isAutoPlayRequested} />
    </div>
  );
}

export default App;
