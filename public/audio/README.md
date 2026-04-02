# Audio assets

## Theme music (looping)

Place your main theme here:

- `public/audio/music/theme-music.ogg`

The game loads it with `loop` enabled. Intrinsic gain is kept low in code (`THEME_MUSIC_BASE_VOLUME` in `src/audio/soundConfig.ts`); use the **Music** slider in the HUD on top of that.

You can use `.mp3` instead: update `THEME_MUSIC_PATH` in `src/audio/soundConfig.ts` to match your filename.

## SFX

See filenames listed in `src/audio/soundConfig.ts` under `SOUND_FILE_PATHS`.
