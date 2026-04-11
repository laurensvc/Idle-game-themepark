import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  RIDE_BATTERY_CHARGE_PER_CLICK,
  RIDE_BATTERY_DRAIN_PER_TICK,
  TICKET_BOOTH_CASH_MAX,
  TICKET_BOOTH_CASH_MIN,
  resetGameStore,
  useGameStore,
} from './gameStore';

describe('gameStore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    resetGameStore();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with empty park battery, idle rides, no earnings until charged', () => {
    const { money, rides, parkBatteryLevel } = useGameStore.getState();
    expect(money).toBe(500);
    expect(rides).toHaveLength(1);
    expect(rides[0].definitionId).toBe('ferris_wheel');
    expect(rides[0].status).toBe('idle');
    expect(parkBatteryLevel).toBe(0);
  });

  it('buyRide subtracts cost and adds the ride idle (park battery unchanged)', () => {
    useGameStore.setState({ money: 500, parkBatteryLevel: 0 });
    useGameStore.getState().buyRide('carousel');
    const { money, rides, parkBatteryLevel } = useGameStore.getState();
    expect(money).toBe(350);
    const carousel = rides.find((r) => r.definitionId === 'carousel');
    expect(carousel).toBeDefined();
    expect(carousel!.status).toBe('idle');
    expect(parkBatteryLevel).toBe(0);
  });

  it('buyRide does nothing when too poor', () => {
    useGameStore.setState({ money: 100 });
    useGameStore.getState().buyRide('carousel');
    expect(useGameStore.getState().rides).toHaveLength(1);
  });

  it('repairRide moves a broken ride to repairing', () => {
    const instanceId = useGameStore.getState().rides[0].instanceId;
    useGameStore.setState({
      rides: [
        {
          ...useGameStore.getState().rides[0],
          status: 'broken',
        },
      ],
    });
    useGameStore.getState().repairRide(instanceId);
    expect(useGameStore.getState().rides[0].status).toBe('repairing');
  });

  it('cleanPark clears dirt', () => {
    useGameStore.setState({
      parkDirt: 50,
      rides: useGameStore.getState().rides.map((r) => ({ ...r, dirtLevel: 40 })),
    });
    useGameStore.getState().cleanPark();
    const { parkDirt, rides } = useGameStore.getState();
    expect(parkDirt).toBe(0);
    expect(rides.every((r) => r.dirtLevel === 0)).toBe(true);
  });

  it('cleanRide clears dirt for a specific ride', () => {
    const instanceId = useGameStore.getState().rides[0].instanceId;
    useGameStore.setState({
      rides: useGameStore.getState().rides.map((r) => ({ ...r, dirtLevel: 60 })),
    });
    useGameStore.getState().cleanRide(instanceId);
    expect(useGameStore.getState().rides[0].dirtLevel).toBe(0);
  });

  it('togglePause prevents tick from advancing state', () => {
    const gameTick0 = useGameStore.getState().gameTick;
    useGameStore.getState().togglePause();
    useGameStore.getState().tick();
    expect(useGameStore.getState().gameTick).toBe(gameTick0);
  });

  it('dismissNotification removes by id', () => {
    useGameStore.setState({
      notifications: [
        { id: 'n1', type: 'upgrade', message: 'x', timestamp: Date.now() },
        { id: 'n2', type: 'repair', message: 'y', timestamp: Date.now() },
      ],
    });
    useGameStore.getState().dismissNotification('n1');
    expect(useGameStore.getState().notifications.map((n) => n.id)).toEqual(['n2']);
  });

  it('tick does not add money while park battery is empty', () => {
    const moneyBefore = useGameStore.getState().money;
    useGameStore.getState().tick();
    expect(useGameStore.getState().money).toBe(moneyBefore);
  });

  it('chargeParkBattery fills park, starts eligible rides, and tick adds money', () => {
    useGameStore.getState().chargeParkBattery();
    const { rides, parkBatteryLevel } = useGameStore.getState();
    expect(parkBatteryLevel).toBe(RIDE_BATTERY_CHARGE_PER_CLICK);
    expect(rides[0].status).toBe('operating');
    const moneyBefore = useGameStore.getState().money;
    useGameStore.getState().tick();
    expect(useGameStore.getState().money).toBeGreaterThan(moneyBefore);
  });

  it('chargeParkBattery increases park level while rides are operating', () => {
    useGameStore.setState({
      parkBatteryLevel: 50,
      rides: useGameStore.getState().rides.map((r) => ({
        ...r,
        status: 'operating' as const,
      })),
    });
    useGameStore.getState().chargeParkBattery();
    expect(useGameStore.getState().parkBatteryLevel).toBe(Math.min(100, 50 + RIDE_BATTERY_CHARGE_PER_CLICK));
    expect(useGameStore.getState().rides[0].status).toBe('operating');
  });

  it('park battery drains from all operating rides; at zero rides go idle', () => {
    const instanceId = useGameStore.getState().rides[0].instanceId;
    useGameStore.setState({
      parkBatteryLevel: RIDE_BATTERY_DRAIN_PER_TICK,
      rides: useGameStore
        .getState()
        .rides.map((r) =>
          r.instanceId === instanceId ? { ...r, status: 'operating' as const } : r
        ),
    });
    useGameStore.getState().tick();
    const ride = useGameStore.getState().rides.find((r) => r.instanceId === instanceId)!;
    expect(useGameStore.getState().parkBatteryLevel).toBe(0);
    expect(ride.status).toBe('idle');
  });

  it('drain scales with number of operating rides', () => {
    useGameStore.setState({ money: 500 });
    useGameStore.getState().buyRide('carousel');
    useGameStore.setState({
      parkBatteryLevel: 10,
      rides: useGameStore.getState().rides.map((r) => ({ ...r, status: 'operating' as const })),
    });
    useGameStore.getState().tick();
    expect(useGameStore.getState().parkBatteryLevel).toBe(10 - 2 * RIDE_BATTERY_DRAIN_PER_TICK);
    expect(useGameStore.getState().rides.every((r) => r.status === 'operating')).toBe(true);
  });

  it('chargeParkBattery still works when a ride is broken', () => {
    const rides = useGameStore.getState().rides.map((r) => ({
      ...r,
      status: 'broken' as const,
    }));
    useGameStore.setState({ rides, parkBatteryLevel: 0 });
    useGameStore.getState().chargeParkBattery();
    expect(useGameStore.getState().parkBatteryLevel).toBe(RIDE_BATTERY_CHARGE_PER_CLICK);
    expect(useGameStore.getState().rides[0].status).toBe('broken');
  });

  it('levelUpRide increments level and deducts cost', () => {
    useGameStore.setState({ money: 5000 });
    const instanceId = useGameStore.getState().rides[0].instanceId;
    useGameStore.getState().levelUpRide(instanceId);
    const { rides, money } = useGameStore.getState();
    expect(rides[0].level).toBe(2);
    expect(money).toBeLessThan(5000);
  });

  it('levelUpRide does nothing at max level', () => {
    const instanceId = useGameStore.getState().rides[0].instanceId;
    useGameStore.setState({
      money: 999999,
      rides: useGameStore.getState().rides.map((r) => ({ ...r, level: 10 })),
    });
    useGameStore.getState().levelUpRide(instanceId);
    expect(useGameStore.getState().rides[0].level).toBe(10);
  });

  it('ticketBoothClick adds cash in range and returns the gain', () => {
    const before = useGameStore.getState().money;
    const gain = useGameStore.getState().ticketBoothClick();
    expect(gain).toBeGreaterThanOrEqual(TICKET_BOOTH_CASH_MIN);
    expect(gain).toBeLessThanOrEqual(TICKET_BOOTH_CASH_MAX);
    expect(useGameStore.getState().money).toBe(before + gain);
  });

  it('ticketBoothClick does nothing when paused', () => {
    const before = useGameStore.getState().money;
    useGameStore.getState().togglePause();
    const gain = useGameStore.getState().ticketBoothClick();
    expect(gain).toBe(0);
    expect(useGameStore.getState().money).toBe(before);
  });

  it('arenaQuickSweep reduces park and ride dirt when dirty', () => {
    useGameStore.setState({
      parkDirt: 10,
      rides: useGameStore.getState().rides.map((r) => ({ ...r, dirtLevel: 8 })),
    });
    useGameStore.getState().arenaQuickSweep();
    expect(useGameStore.getState().parkDirt).toBe(8);
    expect(useGameStore.getState().rides[0].dirtLevel).toBe(6);
  });

  it('auto-dismisses old notifications in tick', () => {
    const oldTimestamp = Date.now() - 10000;
    useGameStore.setState({
      notifications: [
        { id: 'old', type: 'upgrade', message: 'old', timestamp: oldTimestamp },
        { id: 'new', type: 'repair', message: 'new', timestamp: Date.now() },
      ],
    });
    useGameStore.getState().tick();
    const ids = useGameStore.getState().notifications.map((n) => n.id);
    expect(ids).not.toContain('old');
    expect(ids).toContain('new');
  });
});
