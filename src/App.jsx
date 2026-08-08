import { useState } from 'react';
import Opening from './components/Opening';
import Envelope from './components/Envelope';
import Letter from './components/Letter';
import MemoryGallery from './components/MemoryGallery';
import FinalSurprise from './components/FinalSurprise';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const [stage, setStage] = useState('opening');
  const [showMusic, setShowMusic] = useState(false);

  const handleOpenLetter = () => {
    setStage('envelope');
  };

  const handleEnvelopeComplete = () => {
    setStage('letter');
  };

  const handleLetterComplete = () => {
    setStage('memories');
  };

  const handleMemoriesComplete = () => {
    setStage('final');
  };

  const handleShowMusic = () => {
    setShowMusic(true);
  };

  return (
    <div className="relative">
      {stage === 'opening' && <Opening onOpen={handleOpenLetter} />}
      {stage === 'envelope' && <Envelope onComplete={handleEnvelopeComplete} />}
      {stage === 'letter' && <Letter onComplete={handleLetterComplete} />}
      {stage === 'memories' && <MemoryGallery onComplete={handleMemoriesComplete} />}
      {stage === 'final' && <FinalSurprise onShowMusic={handleShowMusic} />}
      {showMusic && <MusicPlayer />}
    </div>
  );
}

export default App;
