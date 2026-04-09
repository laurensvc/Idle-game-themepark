import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RIDE_BATTERY_CHARGE_PER_CLICK, RIDE_BATTERY_DRAIN_PER_TICK, resetGameStore, useGameStore } from './gameStore';

describe('gameStore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    resetGameStore();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with empty battery, idle, no earnings until charged', () => {
    const { money, rides } = useGameStore.getState();
    expect(money).toBe(500);
    expect(rides).toHaveLength(1);
    expect(rides[0].definitionId).toBe('ferris_wheel');
    expect(rides[0].status).toBe('idle');
    expect(rides[0].batteryLevel).toBe(0);
  });

  it('buyRide subtracts cost and adds the ride idle with empty battery', () => {
    useGameStore.setState({ money: 500 });
    useGameStore.getState().buyRide('carousel');
    const { money, rides } = useGameStore.getState();
    expect(money).toBe(350);
    const carousel = rides.find((r) => r.definitionId === 'carousel');
    expect(carousel).toBeDefined();
    expect(carousel!.status).toBe('idle');
    expect(carousel!.batteryLevel).toBe(0);
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

  it('tick does not add money while battery is empty', () => {
    const moneyBefore = useGameStore.getState().money;
    useGameStore.getState().tick();
    expect(useGameStore.getState().money).toBe(moneyBefore);
  });

  it('chargeRideBattery fills from idle and tick adds money', () => {
    const instanceId = useGameStore.getState().rides[0].instanceId;
    useGameStore.getState().chargeRideBattery(instanceId);
    const { rides } = useGameStore.getState();
    expect(rides[0].batteryLevel).toBe(RIDE_BATTERY_CHARGE_PER_CLICK);
    expect(rides[0].status).toBe('operating');
    const moneyBefore = useGameStore.getState().money;
    useGameStore.getState().tick();
    expect(useGameStore.getState().money).toBeGreaterThan(moneyBefore);
  });

  it('chargeRideBattery increases battery while operating', () => {
    const instanceId = useGameStore.getState().rides[0].instanceId;
    useGameStore.setState({
      rides: useGameStore.getState().rides.map((r) => ({
        ...r,
        status: 'operating' as const,
        batteryLevel: 50,
      })),
    });
    useGameStore.getState().chargeRideBattery(instanceId);
    expect(useGameStore.getState().rides[0].batteryLevel).toBe(Math.min(100, 50 + RIDE_BATTERY_CHARGE_PER_CLICK));
    expect(useGameStore.getState().rides[0].status).toBe('operating');
  });

  it('battery drains while operating; at zero ride goes idle', () => {
    const instanceId = useGameStore.getState().rides[0].instanceId;
    useGameStore.setState({
      rides: useGameStore
        .getState()
        .rides.map((r) =>
          r.instanceId === instanceId
            ? { ...r, status: 'operating' as const, batteryLevel: RIDE_BATTERY_DRAIN_PER_TICK }
            : r
        ),
    });
    useGameStore.getState().tick();
    const ride = useGameStore.getState().rides.find((r) => r.instanceId === instanceId)!;
    expect(ride.batteryLevel).toBe(0);
    expect(ride.status).toBe('idle');
  });

  it('chargeRideBattery does nothing when broken', () => {
    const instanceId = useGameStore.getState().rides[0].instanceId;
    useGameStore.setState({
      rides: useGameStore.getState().rides.map((r) => ({
        ...r,
        status: 'broken' as const,
        batteryLevel: 20,
      })),
    });
    useGameStore.getState().chargeRideBattery(instanceId);
    const r = useGameStore.getState().rides[0];
    expect(r.batteryLevel).toBe(20);
    expect(r.status).toBe('broken');
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
