import { SOUND_BASE_VOLUME, SOUND_FILE_PATHS, type SoundId } from './soundConfig';

interface AudioRuntimeSettings {
  isMuted: boolean;
  masterVolume: number;
  sfxVolume: number;
}

const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));

class SoundManager {
  private players = new Map<SoundId, HTMLAudioElement>();
  private settings: AudioRuntimeSettings = {
    // Start muted so missing files never spam requests on first run.
    isMuted: true,
    masterVolume: 0.8,
    sfxVolume: 0.8,
  };

  setSettings(next: AudioRuntimeSettings): void {
    this.settings = {
      isMuted: next.isMuted,
      masterVolume: clamp01(next.masterVolume),
      sfxVolume: clamp01(next.sfxVolume),
    };
  }

  preload(): void {
    for (const id of Object.keys(SOUND_FILE_PATHS) as SoundId[]) {
      this.getOrCreatePlayer(id);
    }
  }

  play(id: SoundId): void {
    if (this.settings.isMuted) return;

    const player = this.getOrCreatePlayer(id);
    const volume = clamp01(this.settings.masterVolume * this.settings.sfxVolume * SOUND_BASE_VOLUME[id]);
    if (volume <= 0) return;

    player.currentTime = 0;
    player.volume = volume;
    void player.play().catch(() => undefined);
  }

  private getOrCreatePlayer(id: SoundId): HTMLAudioElement {
    const existing = this.players.get(id);
    if (existing) return existing;

    const player = new Audio(SOUND_FILE_PATHS[id]);
    player.preload = 'auto';
    this.players.set(id, player);
    return player;
  }
}

const soundManager = new SoundManager();

export const configureSoundSettings = (settings: AudioRuntimeSettings): void => {
  soundManager.setSettings(settings);
};

export const preloadGameSounds = (): void => {
  soundManager.preload();
};

export const playGameSfx = (id: SoundId): void => {
  soundManager.play(id);
};
