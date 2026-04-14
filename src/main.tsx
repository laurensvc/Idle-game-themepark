import { configureSoundSettings, preloadGameSounds } from '@/audio/soundManager';
import { getBootAudioSettings } from '@/lib/gameSave';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

configureSoundSettings(getBootAudioSettings());
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
