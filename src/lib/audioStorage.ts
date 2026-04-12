import type { AudioSettings } from '@/types/game';

export const AUDIO_STORAGE_KEY = 'idle-park-audio';

export const loadPersistedAudioSettings = (): AudioSettings => {
  try {
    const raw = localStorage.getItem(AUDIO_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AudioSettings;
  } catch {
    /* ignore */
  }
  return { isMuted: false, masterVolume: 0.8, sfxVolume: 0.8, musicVolume: 0.75 };
};
