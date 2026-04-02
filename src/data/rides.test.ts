import { describe, expect, it } from 'vitest';
import { RIDE_DEFINITIONS, getRideDefinition } from './rides';

describe('rides data', () => {
  it('exposes unique ride ids', () => {
    const ids = RIDE_DEFINITIONS.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('getRideDefinition returns a ride or undefined', () => {
    expect(getRideDefinition('ferris_wheel')?.name).toBe('Ferris Wheel');
    expect(getRideDefinition('unknown')).toBeUndefined();
  });
});
