import { useGameStore } from '@/store/gameStore';
import type { NotificationType } from '@/types/game';
import { toast } from 'sonner';

let lastSeenTick = 0;

const typeToSonner: Record<NotificationType, typeof toast.success> = {
  info: toast.info,
  success: toast.success,
  warning: toast.warning,
  error: toast.error,
};

export const startNotificationSync = (): (() => void) =>
  useGameStore.subscribe((state) => {
    for (let i = 0; i < state.notifications.length; i++) {
      const notif = state.notifications[i];
      if (notif.tick > lastSeenTick) {
        const show = typeToSonner[notif.type] ?? toast;
        show(notif.message, { duration: 3000 });
      }
    }
    lastSeenTick = state.tickCount;
  });
