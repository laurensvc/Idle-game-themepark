import { useGameStore } from '@/store/gameStore';
import type { NotificationType } from '@/types/game';
import { toast } from 'sonner';

/** Dedupe by id so toasts still fire when `tick` matches `tickCount` (e.g. shop buys between game ticks). */
const toastedNotificationIds = new Set<string>();

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
      if (toastedNotificationIds.has(notif.id)) continue;
      toastedNotificationIds.add(notif.id);
      const show = typeToSonner[notif.type] ?? toast;
      show(notif.message, { duration: 3000 });
    }
    for (const id of toastedNotificationIds) {
      if (!state.notifications.some((n) => n.id === id)) {
        toastedNotificationIds.delete(id);
      }
    }
  });
