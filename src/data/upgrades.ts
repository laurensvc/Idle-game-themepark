import type { UpgradeDefinition } from '@/types/game';

export const UPGRADE_DEFINITIONS: UpgradeDefinition[] = [
  {
    id: 'marketing_1',
    name: 'Billboard Ads',
    description: 'Attract 20% more visitors to your park',
    cost: 300,
    category: 'global',
    effect: { type: 'visitor_attraction', value: 0.2 },
    icon: '📢',
  },
  {
    id: 'marketing_2',
    name: 'Social Media Campaign',
    description: 'Attract 30% more visitors',
    cost: 800,
    category: 'global',
    effect: { type: 'visitor_attraction', value: 0.3 },
    prerequisiteId: 'marketing_1',
    icon: '📱',
  },
  {
    id: 'wifi',
    name: 'Park Wi-Fi',
    description: 'Happy guests! +5 happiness target',
    cost: 400,
    category: 'global',
    effect: { type: 'happiness_boost', value: 5 },
    icon: '📶',
  },
  {
    id: 'capacity_boost',
    name: 'Expanded Seating',
    description: 'All rides get +25% capacity',
    cost: 700,
    category: 'ride',
    effect: { type: 'capacity_boost', value: 0.25 },
    icon: '💺',
  },
  {
    id: 'income_boost',
    name: 'Premium Tickets',
    description: 'All rides earn +20% income',
    cost: 900,
    category: 'ride',
    effect: { type: 'income_boost', value: 0.2 },
    icon: '🎟️',
  },
  {
    id: 'guest_services',
    name: 'Guest Services',
    description: 'Help desks & signage — +4 happiness target',
    cost: 1100,
    category: 'global',
    effect: { type: 'happiness_boost', value: 4 },
    prerequisiteId: 'marketing_1',
    icon: '🤝',
  },
];

export const getUpgradeDefinition = (id: string): UpgradeDefinition | undefined =>
  UPGRADE_DEFINITIONS.find((u) => u.id === id);
