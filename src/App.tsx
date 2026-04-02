import { useEffect } from 'react';
import { HUD } from './components/HUD';
import { ParkView } from './components/ParkView';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { configureSoundSettings, preloadGameSounds, retryThemeMusicAfterUserGesture } from './audio/soundManager';
import { startGameLoop, stopGameLoop } from './store/gameStore';
import { useGameStore } from './store/gameStore';
import { useSyncNotificationsToSonner } from '@/lib/syncNotificationsToSonner';

const App = () => {
  const isAudioMuted = useGameStore((s) => s.isAudioMuted);
  const masterVolume = useGameStore((s) => s.masterVolume);
  const sfxVolume = useGameStore((s) => s.sfxVolume);
  const musicVolume = useGameStore((s) => s.musicVolume);

  useSyncNotificationsToSonner();

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

  useEffect(() => {
    const onFirstPointer = () => {
      retryThemeMusicAfterUserGesture();
    };
    document.addEventListener('pointerdown', onFirstPointer, { capture: true, once: true });
    return () => document.removeEventListener('pointerdown', onFirstPointer, { capture: true });
  }, []);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="dark crt-overlay bg-background text-foreground flex h-screen flex-col overflow-hidden">
        <HUD />
        <ParkView />
        <Toaster position="bottom-right" />
      </div>
    </TooltipProvider>
  );
};

export default App;
