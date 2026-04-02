import { useEffect } from 'react';
import { HUD } from './components/HUD';
import { ParkView } from './components/ParkView';
import { Notifications } from './components/Notifications';
import {
  configureSoundSettings,
  preloadGameSounds,
  retryThemeMusicAfterUserGesture,
} from './audio/soundManager';
import { startGameLoop, stopGameLoop } from './store/gameStore';
import { useGameStore } from './store/gameStore';

const App = () => {
  const isAudioMuted = useGameStore((s) => s.isAudioMuted);
  const masterVolume = useGameStore((s) => s.masterVolume);
  const sfxVolume = useGameStore((s) => s.sfxVolume);
  const musicVolume = useGameStore((s) => s.musicVolume);

  useEffect(() => {
    startGameLoop();
    preloadGameSounds();
    return () => stopGameLoop();
  }, []);

  useEffect(() => {
    configureSoundSettings({
      isMuted: isAudioMuted,
      masterVolume,
      sfxVolume,
      musicVolume,
    });
  }, [isAudioMuted, masterVolume, sfxVolume, musicVolume]);

  // Browsers often block autoplay until a gesture; retry once so the theme loop can start.
  useEffect(() => {
    const onFirstPointer = () => {
      retryThemeMusicAfterUserGesture();
    };
    document.addEventListener('pointerdown', onFirstPointer, { capture: true, once: true });
    return () => document.removeEventListener('pointerdown', onFirstPointer, { capture: true });
  }, []);

  return (
    <div className="crt-overlay flex h-screen flex-col overflow-hidden bg-[#0a0a1a] text-white">
      {/* Top HUD bar */}
      <HUD />

      {/* Main game view */}
      <ParkView />

      {/* Toast notifications */}
      <Notifications />
    </div>
  );
};

export default App;
