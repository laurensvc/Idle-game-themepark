import { useEffect } from 'react';
import { toast } from 'sonner';
import { NOTIFICATION_TTL_MS, useGameStore } from '@/store/gameStore';
import type { Notification, NotificationType } from '@/types/game';

const toastOptionsForType = (type: NotificationType) => {
  switch (type) {
    case 'breakdown':
      return { tone: 'error' as const };
    case 'repair':
    case 'income':
    case 'upgrade':
      return { tone: 'success' as const };
    case 'visitor':
      return { tone: 'info' as const };
    case 'warning':
      return { tone: 'warning' as const };
    default:
      return { tone: 'message' as const };
  }
};

function pushGameToast(n: Notification): void {
  const dismissFromStore = () => {
    useGameStore.getState().dismissNotification(n.id);
  };

  const opts = {
    id: n.id,
    duration: NOTIFICATION_TTL_MS,
    onDismiss: dismissFromStore,
    onAutoClose: dismissFromStore,
  };

  const { tone } = toastOptionsForType(n.type);

  switch (tone) {
    case 'error':
      toast.error(n.message, opts);
      break;
    case 'success':
      toast.success(n.message, opts);
      break;
    case 'info':
      toast.info(n.message, opts);
      break;
    case 'warning':
      toast.warning(n.message, opts);
      break;
    default:
      toast.message(n.message, opts);
      break;
  }
}

/** Subscribes to game store notifications and mirrors them to Sonner. */
export function useSyncNotificationsToSonner(): void {
  useEffect(() => {
    let previousIdSet = new Set(useGameStore.getState().notifications.map((n) => n.id));

    return useGameStore.subscribe((state) => {
      const next = state.notifications;
      const nextIdSet = new Set(next.map((n) => n.id));

      for (const n of next) {
        if (!previousIdSet.has(n.id)) {
          pushGameToast(n);
        }
      }

      for (const id of previousIdSet) {
        if (!nextIdSet.has(id)) {
          toast.dismiss(id);
        }
      }

      previousIdSet = nextIdSet;
    });
  }, []);
}
