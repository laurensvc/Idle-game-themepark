import { describe, expect, it } from 'vitest';
import { UPGRADE_DEFINITIONS, getUpgradeDefinition } from './upgrades';

describe('upgrades data', () => {
  it('has unique upgrade ids', () => {
    const ids = UPGRADE_DEFINITIONS.map((u) => u.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('getUpgradeDefinition resolves known upgrades', () => {
    expect(getUpgradeDefinition('marketing_1')?.effect).toBe('visitor_attraction');
    expect(getUpgradeDefinition('missing')).toBeUndefined();
  });
});
