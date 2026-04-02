# Idle Theme Park Improvement Backlog

This backlog captures potential improvements for the game and ranks them by implementation difficulty.

## Difficulty Rubric

- **S (Easy):** small scoped UI/data tweaks, minimal game-loop logic changes.
- **M (Moderate):** touches game-loop plus one or two UI panels, with balancing/testing needed.
- **L (Hard):** new systems/mechanics crossing data, state, and multiple UI surfaces.
- **XL (Very Hard):** large feature pillars requiring progression redesign, save migration, or major balance iterations.

## Ranked TODO Backlog

## S - Easy

- [ ] **Visual polish pass**  
      Improve status colors, ride state readability, and empty-state presentation.
- [ ] **Audio v1 foundation**  
      Add UI click sounds and basic ride hum/alert SFX with mute and volume controls.
- [ ] **Quality-of-life controls**  
      Add bulk actions like "repair all broken" and "clean dirtiest ride", plus richer tooltips.
- [ ] **Stats clarity**  
      Show per-ride ROI, payback time, and trend arrows in stats/shop views.
- [ ] **Notification improvements**  
      Reduce toast spam with dedupe and grouped summary notifications.

## M - Moderate

- [ ] **Gameplay expansion set A**  
      Add ride archetypes (low-maintenance/high-capacity, high-risk/high-profit) and matching upgrades.
- [ ] **Visitor behavior depth**  
      Add visitor preferences and targets so ride choice matters more than random occupancy.
- [ ] **Midgame objectives**  
      Add milestone goals (earnings, happiness streaks, uptime targets) with one-time rewards.
- [ ] **Event system v1**  
      Add periodic events (rainy day, school holiday, inspection) that temporarily alter demand/cost/risk.
- [ ] **Balancing sweep**  
      Rebalance unlock costs, breakdown curves, and level formulas for smoother progression.

## L - Hard

- [ ] **Endgame gameplay loop v1**  
      Add prestige/rebirth with permanent bonuses and reset economy.
- [ ] **Park layout gameplay**  
      Introduce ride placement on a grid with adjacency/zone bonuses and pathing-like constraints.
- [ ] **Staff system**  
      Add janitors, mechanics, and managers with wages and specialization.
- [ ] **Economy depth**  
      Add ticket pricing, operating costs, and demand elasticity (profit versus happiness trade-offs).
- [ ] **Seasonal progression**  
      Add day/season cycles that impact ride popularity and maintenance pressure.

## XL - Very Hard

- [ ] **Endgame gameplay loop v2 (meta progression)**  
      Add multi-park expansion, research trees, and long-horizon objectives.
- [ ] **Narrative scenarios/challenges**  
      Add challenge runs with unique modifiers and win conditions.
- [ ] **Advanced audio design**  
      Add adaptive music layers and contextual SFX mixing tied to park state.
- [ ] **Save/versioning framework**  
      Add persistent save migration strategy for large future systems.

## Priority Execution Order

1. Ship **S** improvements for immediate UX and clarity wins.
2. Move to **M** improvements to deepen the current loop.
3. Implement **L endgame v1** before broadening scope.
4. Defer **XL** systems until balance telemetry is available.

## Implementation Areas (Likely File Targets)

- `src/store/gameStore.ts` (core loop, economy, progression rules, events)
- `src/data/rides.ts` (ride roster, ride tuning)
- `src/data/upgrades.ts` (upgrade content and progression links)
- `src/components/ParkView.tsx` (park view UX, status clarity, controls)
- `src/components/ShopPanel.tsx` (purchase flow, value presentation)
- `src/components/StatsPanel.tsx` (ROI, trends, progression insights)
- `src/components/Notifications.tsx` (dedupe/grouping behavior)
- `src/store/gameStore.test.ts` (deterministic progression and balancing tests)

## Security and Robustness Checklist

- [ ] Validate all state transitions affecting economy/progression before applying rewards/costs.
- [ ] Add deterministic tests around progression formulas and RNG-sensitive outcomes.
- [ ] Keep safe fallbacks when ride/upgrade definitions are missing or invalid.
