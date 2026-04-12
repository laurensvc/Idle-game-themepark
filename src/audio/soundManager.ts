import {
  SOUND_BASE_VOLUME,
  SOUND_FILE_PATHS,
  THEME_MUSIC_BASE_VOLUME,
  THEME_MUSIC_PATH,
  type SoundId,
} from './soundConfig';

interface AudioRuntimeSettings {
  isMuted: boolean;
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
}

const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));

class SoundManager {
  private players = new Map<SoundId, HTMLAudioElement>();
  private themeMusic: HTMLAudioElement | null = null;
  private settings: AudioRuntimeSettings = {
    // Matches [gameStore] default before hydration; App syncs from localStorage on mount.
    isMuted: false,
    masterVolume: 0.8,
    sfxVolume: 0.8,
    musicVolume: 0.75,
  };

  setSettings(next: AudioRuntimeSettings): void {
    this.settings = {
      isMuted: next.isMuted,
      masterVolume: clamp01(next.masterVolume),
      sfxVolume: clamp01(next.sfxVolume),
      musicVolume: clamp01(next.musicVolume),
    };
    this.syncThemeMusic();
  }

  /** Call after a user gesture if autoplay blocked the theme loop on load. */
  retryThemeMusicPlayback(): void {
    this.syncThemeMusic();
  }

  preload(): void {
    for (const id of Object.keys(SOUND_FILE_PATHS) as SoundId[]) {
      this.getOrCreatePlayer(id);
    }
    this.getThemeMusic();
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

  private getThemeMusic(): HTMLAudioElement {
    if (!this.themeMusic) {
      const el = new Audio(THEME_MUSIC_PATH);
      el.loop = true;
      el.preload = 'auto';

      this.themeMusic = el;
    }
    return this.themeMusic;
  }

  private syncThemeMusic(): void {
    const el = this.getThemeMusic();
    const volume = this.settings.isMuted
      ? 0
      : clamp01(this.settings.masterVolume * this.settings.musicVolume * THEME_MUSIC_BASE_VOLUME);
    el.volume = volume;
    if (this.settings.isMuted || volume <= 0) {
      el.pause();
      return;
    }
    void el.play().catch(() => undefined);
  }
}

const soundManager = new SoundManager();

export const configureSoundSettings = (settings: AudioRuntimeSettings): void => {
  soundManager.setSettings(settings);
};

export const preloadGameSounds = (): void => {
  soundManager.preload();
};

export const retryThemeMusicAfterUserGesture = (): void => {
  soundManager.retryThemeMusicPlayback();
};

export const playGameSfx = (id: SoundId): void => {
  soundManager.play(id);
};
