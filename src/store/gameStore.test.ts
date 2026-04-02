import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetGameStore, useGameStore } from './gameStore';

describe('gameStore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    resetGameStore();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with default money and one ride', () => {
    const { money, rides } = useGameStore.getState();
    expect(money).toBe(500);
    expect(rides).toHaveLength(1);
    expect(rides[0].definitionId).toBe('ferris_wheel');
    expect(rides[0].pendingCash).toBe(0);
  });

  it('buyRide subtracts cost and adds the ride', () => {
    useGameStore.setState({ money: 500 });
    useGameStore.getState().buyRide('carousel');
    const { money, rides } = useGameStore.getState();
    expect(money).toBe(350);
    expect(rides.some((r) => r.definitionId === 'carousel')).toBe(true);
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

  it('tick accumulates pendingCash on rides instead of adding to money', () => {
    const moneyBefore = useGameStore.getState().money;
    useGameStore.getState().tick();
    const { money, rides } = useGameStore.getState();
    expect(money).toBe(moneyBefore);
    expect(rides[0].pendingCash).toBeGreaterThan(0);
  });

  it('collectRideCash moves pending cash to money', () => {
    const instanceId = useGameStore.getState().rides[0].instanceId;
    useGameStore.setState({
      rides: useGameStore.getState().rides.map((r) => ({ ...r, pendingCash: 100 })),
    });
    useGameStore.getState().collectRideCash(instanceId);
    const { money, rides } = useGameStore.getState();
    expect(money).toBe(600);
    expect(rides[0].pendingCash).toBe(0);
  });

  it('collectAllCash collects from all rides', () => {
    useGameStore.getState().buyRide('carousel');
    useGameStore.setState({
      rides: useGameStore.getState().rides.map((r) => ({ ...r, pendingCash: 50 })),
    });
    useGameStore.getState().collectAllCash();
    const { money, rides } = useGameStore.getState();
    expect(money).toBe(450);
    expect(rides.every((r) => r.pendingCash === 0)).toBe(true);
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
