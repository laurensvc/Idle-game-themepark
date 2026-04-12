export type SoundId =
  | 'ui_click'
  | 'ui_toggle'
  | 'cash_collect'
  | 'purchase'
  | 'upgrade'
  | 'warning'
  | 'crit_hit'
  | 'golden_ticket';

export const SOUND_FILE_PATHS: Record<SoundId, string> = {
  ui_click: '/audio/sfx/ui-click.wav',
  ui_toggle: '/audio/sfx/ui-toggle.wav',
  cash_collect: '/audio/sfx/cash-collect.ogg',
  purchase: '/audio/sfx/purchase-confirm.wav',
  upgrade: '/audio/sfx/upgrade-unlock.wav',
  warning: '/audio/sfx/warning-soft.wav',
  crit_hit: '/audio/sfx/purchase-confirm.wav',
  golden_ticket: '/audio/sfx/upgrade-unlock.wav',
};

export const SOUND_BASE_VOLUME: Record<SoundId, number> = {
  ui_click: 0.05,
  ui_toggle: 0.5,
  cash_collect: 0.7,
  purchase: 0.65,
  upgrade: 0.75,
  warning: 0.55,
  crit_hit: 0.85,
  golden_ticket: 0.8,
};

/** Looping background theme: path under `public/audio/`. */
export const THEME_MUSIC_PATH = '/audio/music/theme-music.ogg';

/**
 * Intrinsic gain for theme music (before master × music sliders).
 * Keep low so SFX stay readable when both sliders are up.
 */
export const THEME_MUSIC_BASE_VOLUME = 0.18;
