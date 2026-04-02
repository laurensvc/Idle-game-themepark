export type SoundId =
  | 'ui_click'
  | 'ui_toggle'
  | 'cash_collect'
  | 'purchase'
  | 'upgrade'
  | 'breakdown'
  | 'repair_start'
  | 'repair_done'
  | 'warning';

export const SOUND_FILE_PATHS: Record<SoundId, string> = {
  ui_click: '/audio/sfx/ui-click.wav',
  ui_toggle: '/audio/sfx/ui-toggle.wav',
  cash_collect: '/audio/sfx/cash-collect.ogg',
  purchase: '/audio/sfx/purchase-confirm.wav',
  upgrade: '/audio/sfx/upgrade-unlock.wav',
  breakdown: '/audio/sfx/ride-breakdown-alert.wav',
  repair_start: '/audio/sfx/repair-start.wav',
  repair_done: '/audio/sfx/repair-complete.wav',
  warning: '/audio/sfx/warning-soft.wav',
};

export const SOUND_BASE_VOLUME: Record<SoundId, number> = {
  ui_click: 0.05,
  ui_toggle: 0.5,
  cash_collect: 0.7,
  purchase: 0.65,
  upgrade: 0.75,
  breakdown: 0.8,
  repair_start: 0.6,
  repair_done: 0.7,
  warning: 0.55,
};

/** Looping background theme: path under `public/audio/`. */
export const THEME_MUSIC_PATH = '/audio/music/theme-music.ogg';

/**
 * Intrinsic gain for theme music (before master × music sliders).
 * Keep low so SFX stay readable when both sliders are up.
 */
export const THEME_MUSIC_BASE_VOLUME = 0.18;
