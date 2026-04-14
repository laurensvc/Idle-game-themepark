import { VISITOR_TYPES } from '@/config/gameConstants';
import { getRideDefinition } from '@/config/rideDataConfig';
import { PATH_MAX_LEVEL } from '@/config/ridePathConfig';
import { UPGRADE_DEFINITIONS } from '@/config/upgradesConfig';
import { loadPersistedAudioSettings, parseAudioSettings } from '@/lib/audioStorage';
import type {
  ActiveBuff,
  ActiveBuffKind,
  AudioSettings,
  GameNotification,
  GameState,
  GameStore,
  GoldenTicketState,
  NotificationType,
  PurchasedUpgrade,
  RideInstance,
  Visitor,
  VisitorType,
} from '@/types/game';

export const GAME_SAVE_KEY = 'idle-park-save';
export const GAME_SAVE_VERSION = 1;

const UPGRADE_IDS = new Set(UPGRADE_DEFINITIONS.map((u) => u.id));

const BUFF_KINDS = new Set<ActiveBuffKind>(['ride_income', 'ticket_cash', 'visitor_spawn']);

const NOTIFICATION_TYPES = new Set<NotificationType>(['info', 'success', 'warning', 'error']);

const VISITOR_TYPE_SET = new Set<string>(VISITOR_TYPES);

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const finiteNum = (v: unknown, fallback: number): number =>
  typeof v === 'number' && Number.isFinite(v) ? v : fallback;

const intNonNeg = (v: unknown, fallback: number): number => {
  const n = finiteNum(v, fallback);
  return Number.isInteger(n) && n >= 0 ? n : fallback;
};

const parsePathTrackLevels = (raw: unknown): RideInstance['pathTrackLevels'] => {
  if (!isRecord(raw)) return {};
  const out: RideInstance['pathTrackLevels'] = {};
  for (const [k, val] of Object.entries(raw)) {
    if (typeof k !== 'string' || k.length === 0) continue;
    const n = intNonNeg(val, 0);
    out[k] = Math.min(PATH_MAX_LEVEL, n);
  }
  return out;
};

const parseRide = (raw: unknown): RideInstance | null => {
  if (!isRecord(raw)) return null;
  const id = typeof raw.id === 'string' && raw.id.length > 0 ? raw.id : null;
  const definitionId = typeof raw.definitionId === 'string' ? raw.definitionId : '';
  if (!id || !getRideDefinition(definitionId)) return null;
  return {
    id,
    definitionId,
    ticksSincePurchase: intNonNeg(raw.ticksSincePurchase, 0),
    visitors: intNonNeg(raw.visitors, 0),
    pathTrackLevels: parsePathTrackLevels(raw.pathTrackLevels),
  };
};

const parseVisitor = (raw: unknown): Visitor | null => {
  if (!isRecord(raw)) return null;
  const id = typeof raw.id === 'string' && raw.id.length > 0 ? raw.id : null;
  const type = typeof raw.type === 'string' && VISITOR_TYPE_SET.has(raw.type) ? (raw.type as VisitorType) : null;
  if (!id || !type) return null;
  return {
    id,
    type,
    ticksRemaining: intNonNeg(raw.ticksRemaining, 0),
    groupSize: Math.max(1, intNonNeg(raw.groupSize, 1)),
  };
};

const parsePurchasedUpgrade = (raw: unknown): PurchasedUpgrade | null => {
  if (!isRecord(raw)) return null;
  const upgradeId = typeof raw.upgradeId === 'string' ? raw.upgradeId : '';
  if (!UPGRADE_IDS.has(upgradeId)) return null;
  return { upgradeId, purchasedAtTick: intNonNeg(raw.purchasedAtTick, 0) };
};

const parseNotification = (raw: unknown): GameNotification | null => {
  if (!isRecord(raw)) return null;
  const id = typeof raw.id === 'string' && raw.id.length > 0 ? raw.id : null;
  const message = typeof raw.message === 'string' ? raw.message : '';
  const type = typeof raw.type === 'string' && NOTIFICATION_TYPES.has(raw.type as NotificationType) ? (raw.type as NotificationType) : null;
  if (!id || !type) return null;
  return {
    id,
    message,
    type,
    tick: intNonNeg(raw.tick, 0),
  };
};

const parseActiveBuff = (raw: unknown): ActiveBuff | null => {
  if (!isRecord(raw)) return null;
  const id = typeof raw.id === 'string' && raw.id.length > 0 ? raw.id : null;
  const kind = typeof raw.kind === 'string' && BUFF_KINDS.has(raw.kind as ActiveBuffKind) ? (raw.kind as ActiveBuffKind) : null;
  if (!id || !kind) return null;
  const magnitude = finiteNum(raw.magnitude, 1);
  return {
    id,
    kind,
    expiresAtTick: intNonNeg(raw.expiresAtTick, 0),
    magnitude: magnitude > 0 ? magnitude : 1,
  };
};

const parseGoldenTicket = (raw: unknown): GoldenTicketState | null => {
  if (!isRecord(raw)) return null;
  const visible = typeof raw.visible === 'boolean' ? raw.visible : false;
  return {
    visible,
    expiresAtTick: intNonNeg(raw.expiresAtTick, 0),
    spawnAfterTick: intNonNeg(raw.spawnAfterTick, 0),
    variant: intNonNeg(raw.variant, 0),
  };
};

const sanitizeSelectedRideId = (rides: RideInstance[], selectedRideId: string | null): string | null => {
  if (rides.length === 0) return null;
  if (selectedRideId !== null && rides.some((r) => r.id === selectedRideId)) return selectedRideId;
  return rides[0].id;
};

/** Copies only serializable game fields (never store actions). */
export const pickPersistableState = (s: GameStore): GameState => ({
  money: s.money,
  rides: s.rides,
  happiness: s.happiness,
  visitors: s.visitors,
  upgrades: s.upgrades,
  notifications: s.notifications,
  tickCount: s.tickCount,
  totalMoneyEarned: s.totalMoneyEarned,
  totalVisitorsServed: s.totalVisitorsServed,
  audioSettings: s.audioSettings,
  selectedRideId: s.selectedRideId,
  activeBuffs: s.activeBuffs,
  goldenTicket: s.goldenTicket,
  ticketComboCount: s.ticketComboCount,
  lastTicketClickMs: s.lastTicketClickMs,
  ticketStock: s.ticketStock,
  bankedTicketCash: s.bankedTicketCash,
});

const parseGameState = (raw: unknown): GameState | null => {
  if (!isRecord(raw)) return null;

  const ridesIn = Array.isArray(raw.rides) ? raw.rides : [];
  const rides: RideInstance[] = [];
  for (let i = 0; i < ridesIn.length; i++) {
    const r = parseRide(ridesIn[i]);
    if (r) rides.push(r);
  }
  if (rides.length === 0) return null;

  const visitorsIn = Array.isArray(raw.visitors) ? raw.visitors : [];
  const visitors: Visitor[] = [];
  for (let i = 0; i < visitorsIn.length; i++) {
    const v = parseVisitor(visitorsIn[i]);
    if (v) visitors.push(v);
  }

  const upgradesIn = Array.isArray(raw.upgrades) ? raw.upgrades : [];
  const upgrades: PurchasedUpgrade[] = [];
  for (let i = 0; i < upgradesIn.length; i++) {
    const u = parsePurchasedUpgrade(upgradesIn[i]);
    if (u) upgrades.push(u);
  }

  const notificationsIn = Array.isArray(raw.notifications) ? raw.notifications : [];
  const notifications: GameNotification[] = [];
  for (let i = 0; i < notificationsIn.length; i++) {
    const n = parseNotification(notificationsIn[i]);
    if (n) notifications.push(n);
  }

  const buffsIn = Array.isArray(raw.activeBuffs) ? raw.activeBuffs : [];
  const activeBuffs: ActiveBuff[] = [];
  for (let i = 0; i < buffsIn.length; i++) {
    const b = parseActiveBuff(buffsIn[i]);
    if (b) activeBuffs.push(b);
  }

  const goldenParsed = parseGoldenTicket(raw.goldenTicket);
  if (!goldenParsed) return null;

  const audioParsed = parseAudioSettings(raw.audioSettings);
  if (!audioParsed) return null;

  const selectedRideId =
    raw.selectedRideId === null
      ? sanitizeSelectedRideId(rides, null)
      : typeof raw.selectedRideId === 'string'
        ? sanitizeSelectedRideId(rides, raw.selectedRideId)
        : sanitizeSelectedRideId(rides, null);

  return {
    money: Math.max(0, finiteNum(raw.money, 0)),
    rides,
    happiness: Math.max(0, Math.min(100, finiteNum(raw.happiness, 50))),
    visitors,
    upgrades,
    notifications,
    tickCount: intNonNeg(raw.tickCount, 0),
    totalMoneyEarned: Math.max(0, finiteNum(raw.totalMoneyEarned, 0)),
    totalVisitorsServed: Math.max(0, intNonNeg(raw.totalVisitorsServed, 0)),
    audioSettings: audioParsed,
    selectedRideId,
    activeBuffs,
    goldenTicket: goldenParsed,
    ticketComboCount: Math.max(0, intNonNeg(raw.ticketComboCount, 0)),
    lastTicketClickMs: Math.max(0, finiteNum(raw.lastTicketClickMs, 0)),
    ticketStock: Math.max(0, intNonNeg(raw.ticketStock, 0)),
    bankedTicketCash: Math.max(0, finiteNum(raw.bankedTicketCash, 0)),
  };
};

export const loadGameFromLocalStorage = (): GameState | null => {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(GAME_SAVE_KEY);
    if (!raw) return null;
    const envelope = JSON.parse(raw) as unknown;
    if (!isRecord(envelope)) return null;
    if (envelope.version !== GAME_SAVE_VERSION) return null;
    return parseGameState(envelope.state);
  } catch {
    return null;
  }
};

export const saveGameToLocalStorage = (getState: () => GameStore): void => {
  if (typeof localStorage === 'undefined') return;
  try {
    const state = pickPersistableState(getState());
    const payload = {
      version: GAME_SAVE_VERSION,
      savedAt: new Date().toISOString(),
      state,
    };
    localStorage.setItem(GAME_SAVE_KEY, JSON.stringify(payload));
  } catch {
    /* quota / private mode */
  }
};

/** Prefer audio from full save when present so boot matches restored game. */
export const getBootAudioSettings = (): AudioSettings => {
  const loaded = loadGameFromLocalStorage();
  if (loaded) return loaded.audioSettings;
  return loadPersistedAudioSettings();
};
