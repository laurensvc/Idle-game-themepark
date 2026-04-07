# Satellite Operations Quick Reference

Condensed guide to all 18 satellite skills. Each entry includes when to use, key steps, and critical rules.

---

## 1. Adapt — Responsive Design Across Screens

**When to use:** responsive design, mobile layouts, breakpoints, viewport adaptation, cross-device compatibility

**Key steps:**
1. Audit existing breakpoints and layout issues across viewport sizes
2. Implement fluid layouts using `clamp()`, container queries, and `min()`/`max()`
3. Add touch-friendly targets (44px+) for coarse pointer devices
4. Test with real devices and `@media (pointer:)` / `@media (hover:)` queries
5. Handle safe areas with `env(safe-area-inset-*)`

**Critical rules:**
- NEVER hide critical functionality on mobile — adapt, don't amputate
- NEVER use `user-scalable=no` or `maximum-scale=1`

---

## 2. Animate — Purposeful Animations & Micro-Interactions

**When to use:** adding animation, transitions, micro-interactions, motion design, hover effects, making UI feel alive

**Key steps:**
1. Identify high-impact moments (page load, state changes, feedback)
2. Choose appropriate duration (100-150ms feedback, 200-300ms state, 300-500ms layout)
3. Use `transform` and `opacity` only — never animate layout properties
4. Add `prefers-reduced-motion` alternatives
5. Implement staggered reveals for lists/grids

**Critical rules:**
- NEVER use bounce/elastic easing — they feel dated
- NEVER skip `prefers-reduced-motion` — vestibular disorders affect ~35% of adults over 40

---

## 3. Arrange — Layout, Spacing & Visual Rhythm

**When to use:** layout feeling off, spacing issues, visual hierarchy, crowded UI, alignment problems, composition

**Key steps:**
1. Apply the squint test to identify hierarchy problems
2. Establish spacing rhythm using a 4pt base system (4, 8, 12, 16, 24, 32, 48, 64px)
3. Use CSS Grid with `auto-fit`/`auto-fill` for responsive layouts
4. Create hierarchy through multiple dimensions (size, weight, color, space)
5. Break monotonous grids with varied spacing and intentional asymmetry

**Critical rules:**
- NEVER nest cards inside cards — flatten the hierarchy
- NEVER use identical spacing everywhere — rhythm requires variation

---

## 4. Audit — Technical Quality Checks

**When to use:** accessibility check, performance audit, technical quality review, pre-launch review

**Key steps:**
1. Run accessibility audit (ARIA, focus, keyboard, semantic HTML)
2. Check performance (bundle size, rendering, virtualization)
3. Verify theming consistency (dark mode, tokens, color contrast)
4. Test responsive behavior across breakpoints
5. Generate scored report with P0-P3 severity ratings

**Critical rules:**
- NEVER skip keyboard navigation testing
- NEVER approve without checking color contrast ratios (4.5:1 body, 3:1 large text)

---

## 5. Bolder — Amplify Safe Designs

**When to use:** design looks bland, generic, too safe, lacks personality, wants more visual impact

**Key steps:**
1. Identify what makes the current design "safe" (generic fonts, neutral colors, uniform spacing)
2. Push typography choices — distinctive display fonts, dramatic scale contrast
3. Amplify color — commit to a dominant hue with sharp accents
4. Add intentional visual tension through asymmetry and unexpected compositions
5. Verify usability isn't sacrificed for aesthetics

**Critical rules:**
- NEVER sacrifice readability for visual impact
- NEVER add visual complexity without purpose — bold ≠ noisy

---

## 6. Clarify — Improve UX Copy & Microcopy

**When to use:** confusing text, unclear labels, bad error messages, hard-to-follow instructions, better UX writing

**Key steps:**
1. Audit all user-facing copy for clarity and specificity
2. Replace generic labels ("Submit", "OK") with verb + object ("Save changes", "Create account")
3. Rewrite error messages: What happened → Why → How to fix
4. Improve empty states to guide users toward action
5. Ensure consistent terminology throughout

**Critical rules:**
- NEVER blame the user in error messages
- NEVER use humor for errors — users are already frustrated

---

## 7. Colorize — Add Strategic Color

**When to use:** design looking gray, dull, lacking warmth, needing more color, wanting vibrant palette

**Key steps:**
1. Identify areas that are purely monochromatic or lack visual interest
2. Build a functional palette with OKLCH (primary, neutral, semantic, surface)
3. Apply the 60-30-10 rule (neutral dominant, secondary 30%, accent 10%)
4. Tint neutrals toward brand hue for subconscious cohesion
5. Verify contrast ratios meet WCAG AA standards

**Critical rules:**
- NEVER use pure black (#000) or pure white (#fff) — always tint
- NEVER rely on color alone to convey information (color blindness affects 8% of men)

---

## 8. Critique — Holistic UX Evaluation

**When to use:** review, critique, evaluate, or give feedback on a design or component

**Key steps:**
1. Assess visual hierarchy and information architecture
2. Evaluate emotional resonance and brand alignment
3. Test cognitive load (can users complete tasks without thinking?)
4. Run persona-based evaluation for target audiences
5. Score quantitatively and provide actionable feedback with priorities

**Critical rules:**
- NEVER critique without providing actionable alternatives
- NEVER focus only on aesthetics — evaluate usability, accessibility, and performance too

---

## 9. Delight — Add Joy, Personality & Fun

**When to use:** add polish, personality, animations, micro-interactions, delight, make interface memorable

**Key steps:**
1. Identify moments where delight adds value (completion, milestones, discoveries)
2. Add purposeful micro-interactions that reinforce brand personality
3. Design unexpected touches that reward exploration
4. Keep delightful moments brief and non-blocking
5. Ensure delight doesn't compromise accessibility or performance

**Critical rules:**
- NEVER let delight slow down task completion
- NEVER add delight to error states or frustrating moments

---

## 10. Extract — Reusable Components & Design Tokens

**When to use:** create components, refactor repeated UI patterns, build design system, extract tokens

**Key steps:**
1. Identify repeated patterns across the codebase
2. Extract common values into design tokens (colors, spacing, typography)
3. Create reusable components with well-defined props and variants
4. Document component API, usage examples, and constraints
5. Set up token hierarchy (primitive → semantic → component)

**Critical rules:**
- NEVER create a component for a one-off pattern — wait for repetition
- NEVER extract tokens without semantic naming (`--color-primary` not `--blue-500`)

---

## 11. Harden — Production Resilience

**When to use:** harden, make production-ready, handle edge cases, add error states, fix overflow/i18n

**Key steps:**
1. Add error boundaries and fallback UI for all async operations
2. Handle text overflow (truncation, line-clamp, break-words)
3. Test empty states, loading states, and error states
4. Add i18n support (Intl.DateTimeFormat, Intl.NumberFormat)
5. Handle edge cases (network failures, very long inputs, missing data)

**Critical rules:**
- NEVER show raw error messages to users — always provide helpful context
- NEVER assume data will always be present — handle null/undefined gracefully

---

## 12. Normalize — Realign to Design System

**When to use:** consistency, design drift, mismatched styles, tokens, bringing feature back in line

**Key steps:**
1. Audit the component against design system standards
2. Replace hardcoded values with design tokens
3. Align spacing, typography, and color usage to system scales
4. Fix inconsistent interactive states (hover, focus, active)
5. Verify component matches documented patterns

**Critical rules:**
- NEVER introduce new one-off values when a token exists
- NEVER override design system components without documenting the deviation

---

## 13. Onboard — Onboarding & First-Run Experiences

**When to use:** onboarding, first-time users, empty states, activation, getting started, new user flows

**Key steps:**
1. Map the user's journey from signup to first value moment
2. Design progressive disclosure — don't overwhelm on first visit
3. Create guided empty states that teach the interface
4. Add contextual tooltips and coach marks for key features
5. Measure time-to-value and optimize the critical path

**Critical rules:**
- NEVER block users with mandatory tutorials — make them skippable
- NEVER show all features at once — progressive disclosure is key

---

## 14. Optimize — Diagnose & Fix UI Performance

**When to use:** slow, laggy, janky, performance, bundle size, load time, faster/smoother experience

**Key steps:**
1. Profile with browser DevTools (Performance tab, Lighthouse)
2. Identify re-render bottlenecks (React Profiler, why-did-you-render)
3. Virtualize long lists (>50 items) with `virtua` or `content-visibility: auto`
4. Optimize bundle size (dynamic imports, tree-shaking, barrel file imports)
5. Reduce layout thrashing (batch DOM reads/writes)

**Critical rules:**
- NEVER optimize without measuring first — profile, then fix
- NEVER use `will-change` preemptively — only when animation is imminent

---

## 15. Overdrive — Technically Ambitious Implementations

**When to use:** wow, impress, go all-out, make something extraordinary, push limits

**Key steps:**
1. Identify the "wow" moment that justifies technical complexity
2. Choose appropriate technology (shaders, spring physics, scroll-driven, WebGL)
3. Implement with 60fps as the non-negotiable target
4. Add graceful degradation for lower-powered devices
5. Provide reduced-motion alternatives

**Critical rules:**
- NEVER sacrifice core functionality for visual spectacle
- NEVER ship without testing on low-end devices

---

## 16. Polish — Final Quality Pass

**When to use:** polish, finishing touches, pre-launch review, something looks off, good to great

**Key steps:**
1. Check pixel-level alignment and spacing consistency
2. Verify all interactive states (hover, focus, active, disabled, loading, error)
3. Test text overflow and edge cases (empty, very long, special characters)
4. Confirm typography details (curly quotes, ellipsis, tabular-nums, text-wrap)
5. Validate dark mode, reduced motion, and accessibility

**Critical rules:**
- NEVER polish before core functionality is complete
- NEVER approve without testing all breakpoints

---

## 17. Quieter — Tone Down Overstimulating Designs

**When to use:** too bold, too loud, overwhelming, aggressive, garish, wants calmer/refined aesthetic

**Key steps:**
1. Identify elements that create visual noise (excessive color, animation, decoration)
2. Reduce chroma in the palette — desaturate toward neutral without going gray
3. Slow down and simplify animations — fewer, subtler, shorter
4. Increase white space and reduce visual density
5. Replace decorative elements with functional ones

**Critical rules:**
- NEVER flatten to generic — retain the design's unique character while calming it
- NEVER remove functional visual distinctions (hierarchy, states, feedback)

---

## 18. Typeset — Improve Typography

**When to use:** fonts, type, readability, text hierarchy, sizing looks off, more polished typography

**Key steps:**
1. Audit current font choices and hierarchy (apply the squint test)
2. Establish a modular type scale with clear hierarchy (5-size system)
3. Choose distinctive fonts — avoid Inter, Roboto, Arial, Open Sans
4. Set proper line-height (1.4-1.6 body), letter-spacing, and measure (max-width: 65ch)
5. Apply OpenType features (tabular-nums, proper fractions, kerning)

**Critical rules:**
- NEVER use more than 2-3 font families per project
- NEVER set body text below 16px — it strains eyes and fails WCAG on mobile
