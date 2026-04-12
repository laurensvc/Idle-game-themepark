import { configureSoundSettings, preloadGameSounds } from '@/audio/soundManager';
import { loadPersistedAudioSettings } from '@/lib/audioStorage';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

configureSoundSettings(loadPersistedAudioSettings());
preloadGameSounds();

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Missing #root element');
}
createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
