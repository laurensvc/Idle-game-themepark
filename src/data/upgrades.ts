import type { UpgradeDefinition } from '../types/game';

export const UPGRADE_DEFINITIONS: UpgradeDefinition[] = [
  // Global upgrades
  {
    id: 'marketing_1',
    name: 'Flyer Campaign',
    description: 'Attract 25% more visitors to the park',
    cost: 200,
    effect: 'visitor_attraction',
    value: 0.25,
  },
  {
    id: 'marketing_2',
    name: 'Billboard Ads',
    description: 'Attract 50% more visitors to the park',
    cost: 800,
    effect: 'visitor_attraction',
    value: 0.5,
    requires: 'marketing_1',
  },
  {
    id: 'auto_clean',
    name: 'Hire Janitor',
    description: 'Automatically cleans park dirt over time',
    cost: 350,
    effect: 'auto_clean',
    value: 1,
  },
  // Per-ride: Ferris Wheel
  {
    id: 'ferris_auto_repair',
    name: 'Ferris Auto-Repair',
    description: 'Ferris Wheel repairs itself automatically',
    cost: 300,
    rideId: 'ferris_wheel',
    effect: 'auto_repair',
    value: 1,
  },
  {
    id: 'ferris_capacity',
    name: 'Ferris Gondolas+',
    description: 'Ferris Wheel carries 50% more guests',
    cost: 400,
    rideId: 'ferris_wheel',
    effect: 'capacity_boost',
    value: 0.5,
  },
  // Per-ride: Carousel
  {
    id: 'carousel_auto_repair',
    name: 'Carousel Auto-Repair',
    description: 'Carousel repairs itself automatically',
    cost: 200,
    rideId: 'carousel',
    effect: 'auto_repair',
    value: 1,
  },
  {
    id: 'carousel_income',
    name: 'Premium Carousel',
    description: 'Carousel earns 40% more per guest',
    cost: 350,
    rideId: 'carousel',
    effect: 'income_boost',
    value: 0.4,
  },
  // Per-ride: Teacups
  {
    id: 'teacups_auto_repair',
    name: 'Teacup Technician',
    description: 'Teacups repair themselves automatically',
    cost: 250,
    rideId: 'teacups',
    effect: 'auto_repair',
    value: 1,
  },
  {
    id: 'teacups_capacity',
    name: 'Extra Saucers',
    description: 'Teacups carry 40% more guests',
    cost: 350,
    rideId: 'teacups',
    effect: 'capacity_boost',
    value: 0.4,
  },
  // Per-ride: Bumper Cars
  {
    id: 'bumper_auto_repair',
    name: 'Bumper Auto-Repair',
    description: 'Bumper Cars repair themselves automatically',
    cost: 400,
    rideId: 'bumper_cars',
    effect: 'auto_repair',
    value: 1,
  },
  {
    id: 'bumper_capacity',
    name: 'More Cars',
    description: 'Bumper Cars carry 40% more guests',
    cost: 500,
    rideId: 'bumper_cars',
    effect: 'capacity_boost',
    value: 0.4,
  },
  // Per-ride: Pirate Ship
  {
    id: 'pirate_auto_repair',
    name: 'Ship Carpenter',
    description: 'Pirate Ship repairs itself automatically',
    cost: 400,
    rideId: 'pirate_ship',
    effect: 'auto_repair',
    value: 1,
  },
  {
    id: 'pirate_income',
    name: 'Treasure Hunt',
    description: 'Pirate Ship earns 45% more per guest',
    cost: 550,
    rideId: 'pirate_ship',
    effect: 'income_boost',
    value: 0.45,
  },
  // Per-ride: Haunted House
  {
    id: 'haunted_auto_repair',
    name: 'Ghost Crew',
    description: 'Haunted House repairs itself automatically',
    cost: 500,
    rideId: 'haunted_house',
    effect: 'auto_repair',
    value: 1,
  },
  {
    id: 'haunted_income',
    name: 'Horror Overhaul',
    description: 'Haunted House earns 50% more per guest',
    cost: 700,
    rideId: 'haunted_house',
    effect: 'income_boost',
    value: 0.5,
  },
  // Per-ride: Go-Kart Track
  {
    id: 'gokart_auto_repair',
    name: 'Pit Crew',
    description: 'Go-Karts repair themselves automatically',
    cost: 550,
    rideId: 'go_karts',
    effect: 'auto_repair',
    value: 1,
  },
  {
    id: 'gokart_income',
    name: 'Turbo Engines',
    description: 'Go-Karts earn 50% more per guest',
    cost: 700,
    rideId: 'go_karts',
    effect: 'income_boost',
    value: 0.5,
  },
  // Per-ride: Drop Tower
  {
    id: 'drop_auto_repair',
    name: 'Safety Crew',
    description: 'Drop Tower repairs itself automatically',
    cost: 600,
    rideId: 'drop_tower',
    effect: 'auto_repair',
    value: 1,
  },
  {
    id: 'drop_breakdown',
    name: 'Reinforced Cables',
    description: 'Drop Tower breaks down 35% less often',
    cost: 750,
    rideId: 'drop_tower',
    effect: 'breakdown_reduction',
    value: 0.35,
  },
  // Per-ride: Water Ride
  {
    id: 'water_auto_repair',
    name: 'Water Pump Maintenance',
    description: 'Water Ride repairs itself automatically',
    cost: 600,
    rideId: 'water_ride',
    effect: 'auto_repair',
    value: 1,
  },
  {
    id: 'water_breakdown',
    name: 'Flood-Proof Systems',
    description: 'Water Ride breaks down 30% less often',
    cost: 450,
    rideId: 'water_ride',
    effect: 'breakdown_reduction',
    value: 0.3,
  },
  // Per-ride: Roller Coaster
  {
    id: 'coaster_auto_repair',
    name: 'Coaster Maintenance Crew',
    description: 'Roller Coaster repairs itself automatically',
    cost: 1200,
    rideId: 'roller_coaster',
    effect: 'auto_repair',
    value: 1,
  },
  {
    id: 'coaster_breakdown',
    name: 'Coaster Reliability Kit',
    description: 'Roller Coaster breaks down 40% less often',
    cost: 900,
    rideId: 'roller_coaster',
    effect: 'breakdown_reduction',
    value: 0.4,
  },
  {
    id: 'coaster_income',
    name: 'VIP Coaster Seating',
    description: 'Roller Coaster earns 60% more per guest',
    cost: 1500,
    rideId: 'roller_coaster',
    effect: 'income_boost',
    value: 0.6,
    requires: 'coaster_breakdown',
  },
];

export const getUpgradeDefinition = (id: string): UpgradeDefinition | undefined =>
  UPGRADE_DEFINITIONS.find((u) => u.id === id);

/** Matches game store logic: per-ride auto-repair upgrade purchased. */
export const purchasedUpgradesIncludeAutoRepairForRide = (
  purchasedUpgradeIds: readonly string[],
  rideDefinitionId: string
): boolean =>
  purchasedUpgradeIds.some((id) => {
    const u = getUpgradeDefinition(id);
    return u?.rideId === rideDefinitionId && u?.effect === 'auto_repair';
  });
