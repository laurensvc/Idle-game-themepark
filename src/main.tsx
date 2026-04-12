import { configureSoundSettings, preloadGameSounds } from '@/audio/soundManager';
import { loadPersistedAudioSettings } from '@/lib/audioStorage';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

configureSoundSettings(loadPersistedAudioSettings());
preloadGameSounds();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
