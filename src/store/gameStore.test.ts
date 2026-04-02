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

  it('togglePause prevents tick from advancing state', () => {
    const gameTick0 = useGameStore.getState().gameTick;
    useGameStore.getState().togglePause();
    useGameStore.getState().tick();
    expect(useGameStore.getState().gameTick).toBe(gameTick0);
  });

  it('dismissNotification removes by id', () => {
    useGameStore.setState({
      notifications: [
        { id: 'n1', type: 'upgrade', message: 'x', timestamp: 1 },
        { id: 'n2', type: 'repair', message: 'y', timestamp: 2 },
      ],
    });
    useGameStore.getState().dismissNotification('n1');
    expect(useGameStore.getState().notifications.map((n) => n.id)).toEqual(['n2']);
  });
});
