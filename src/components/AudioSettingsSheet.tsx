import { playGameSfx } from '@/audio/soundManager';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { useGameStore } from '@/store/gameStore';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { memo, useCallback } from 'react';

interface AudioSettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AudioSettingsSheet: React.FC<AudioSettingsSheetProps> = memo(({ open, onOpenChange }) => {
  const audioSettings = useGameStore((s) => s.audioSettings);
  const setAudioSettings = useGameStore((s) => s.setAudioSettings);

  const handleMuteToggle = useCallback(() => {
    playGameSfx('ui_toggle');
    setAudioSettings({ isMuted: !audioSettings.isMuted });
  }, [audioSettings.isMuted, setAudioSettings]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[85vh]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Sound
          </SheetTitle>
          <SheetDescription>Adjust music, effects, and mute. Settings are saved on this device.</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <Button
            type="button"
            variant={audioSettings.isMuted ? 'destructive' : 'outline'}
            className="w-full gap-2"
            onClick={handleMuteToggle}
            aria-pressed={audioSettings.isMuted}
          >
            {audioSettings.isMuted ? (
              <>
                <Volume2 className="h-4 w-4" />
                Unmute audio
              </>
            ) : (
              <>
                <VolumeX className="h-4 w-4" />
                Mute all
              </>
            )}
          </Button>

          <Separator />

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="slider-master">
              Master volume
            </label>
            <Slider
              id="slider-master"
              min={0}
              max={1}
              step={0.05}
              value={[audioSettings.masterVolume]}
              onValueChange={([v]) => setAudioSettings({ masterVolume: v })}
              disabled={audioSettings.isMuted}
              aria-valuetext={`${Math.round(audioSettings.masterVolume * 100)} percent`}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="slider-sfx">
              Effects (rides, UI, tickets)
            </label>
            <Slider
              id="slider-sfx"
              min={0}
              max={1}
              step={0.05}
              value={[audioSettings.sfxVolume]}
              onValueChange={([v]) => setAudioSettings({ sfxVolume: v })}
              disabled={audioSettings.isMuted}
              aria-valuetext={`${Math.round(audioSettings.sfxVolume * 100)} percent`}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium" htmlFor="slider-music">
              <Music className="h-4 w-4" />
              Theme music
            </label>
            <Slider
              id="slider-music"
              min={0}
              max={1}
              step={0.05}
              value={[audioSettings.musicVolume]}
              onValueChange={([v]) => setAudioSettings({ musicVolume: v })}
              disabled={audioSettings.isMuted}
              aria-valuetext={`${Math.round(audioSettings.musicVolume * 100)} percent`}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
});

AudioSettingsSheet.displayName = 'AudioSettingsSheet';

export default AudioSettingsSheet;
