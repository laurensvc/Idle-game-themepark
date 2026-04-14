import type { AudioSettings } from '@/types/game';

export const AUDIO_STORAGE_KEY = 'idle-park-audio';

const DEFAULT_AUDIO: AudioSettings = {
  isMuted: false,
  masterVolume: 0.8,
  sfxVolume: 0.8,
  musicVolume: 0.75,
};

const clamp01 = (n: number): number => (Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0);

export const parseAudioSettings = (value: unknown): AudioSettings | null => {
  if (!value || typeof value !== 'object') return null;
  const o = value as Record<string, unknown>;
  const isMuted = typeof o.isMuted === 'boolean' ? o.isMuted : DEFAULT_AUDIO.isMuted;
  const masterVolume = typeof o.masterVolume === 'number' ? clamp01(o.masterVolume) : DEFAULT_AUDIO.masterVolume;
  const sfxVolume = typeof o.sfxVolume === 'number' ? clamp01(o.sfxVolume) : DEFAULT_AUDIO.sfxVolume;
  const musicVolume = typeof o.musicVolume === 'number' ? clamp01(o.musicVolume) : DEFAULT_AUDIO.musicVolume;
  return { isMuted, masterVolume, sfxVolume, musicVolume };
};

export const loadPersistedAudioSettings = (): AudioSettings => {
  try {
    const raw = localStorage.getItem(AUDIO_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_AUDIO };
    const parsed = parseAudioSettings(JSON.parse(raw) as unknown);
    return parsed ?? { ...DEFAULT_AUDIO };
  } catch {
    /* ignore */
  }
  return { ...DEFAULT_AUDIO };
};
