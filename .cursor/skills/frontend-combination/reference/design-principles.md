# Design Principles — Consolidated Quick Reference

Consolidated from the frontend-design skill and its 7 reference files. Each section keeps the most important rules and principles as a quick-reference guide.

---

## 1. Context Gathering Protocol

Design skills produce generic output without project context. You MUST have confirmed design context before doing any design work.

**Required context — every design skill needs at minimum:**
- **Target audience**: Who uses this product and in what context?
- **Use cases**: What jobs are they trying to get done?
- **Brand personality/tone**: How should the interface feel?

**CRITICAL**: You cannot infer this context by reading the codebase. Code tells you what was built, not who it's for or what it should feel like.

**Gathering order:**
1. **Check current instructions** — if a Design Context section is loaded, proceed
2. **Check .impeccable.md** — read from project root, if it exists and has context, proceed
3. **Run teach-impeccable (REQUIRED)** — if neither source has context, run NOW before doing anything else

---

## 2. Design Direction

Commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme — brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian
- **Constraints**: Technical requirements (framework, performance, accessibility)
- **Differentiation**: What makes this UNFORGETTABLE?

**CRITICAL**: Choose a clear conceptual direction and execute with precision. Bold maximalism and refined minimalism both work — the key is intentionality, not intensity.

Then implement working code that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

---

## 3. Typography

### Key Principles
- **Vertical rhythm**: `line-height` should be the base unit for ALL vertical spacing
- **Modular scale**: Use fewer sizes with more contrast — a 5-size system (xs, sm, base, lg, xl+) covers most needs
- **Measure**: Use `ch` units for character-based width (`max-width: 65ch`)
- Line-height scales inversely with line length. Increase line-height for light text on dark backgrounds (+0.05-0.1)

### Font Selection
- **Avoid invisible defaults**: Inter, Roboto, Open Sans, Lato, Montserrat — these are everywhere
- **Better alternatives**: Instrument Sans, Plus Jakarta Sans, Outfit, Onest, Figtree, Urbanist
- **One font is often enough**: Multiple weights of one family > two competing typefaces
- **When pairing**: contrast on multiple axes (serif + sans, geometric + humanist, condensed + wide)
- **Never pair fonts that are similar but not identical**

### Fluid Type
- Use `clamp(min, preferred, max)` for headings on marketing/content pages
- Use fixed `rem` scales for app UIs, dashboards, data-dense interfaces
- Body text should be fixed even on marketing pages

### Web Font Loading
- Use `font-display: swap`
- Match fallback metrics (`size-adjust`, `ascent-override`, `descent-override`) to minimize CLS
- Tools like Fontaine calculate overrides automatically

### OpenType Features
- `tabular-nums` for data tables
- `diagonal-fractions` for recipe amounts
- `all-small-caps` for abbreviations
- `font-variant-ligatures: none` for code

### Accessibility
- Never disable zoom (`user-scalable=no`)
- Use `rem`/`em` for font sizes, never `px` for body text
- Minimum 16px body text
- 44px+ touch targets for text links

---

## 4. Color & Contrast

### Use OKLCH, Not HSL
OKLCH is perceptually uniform — equal steps in lightness *look* equal.

```css
--color-primary: oklch(60% 0.15 250);
--color-primary-light: oklch(85% 0.08 250); /* reduce chroma as lightness increases */
```

### Tinted Neutrals
Pure gray has no personality. Add a tiny hint (chroma 0.01) of your brand hue to all neutrals.

### Palette Structure
- **Primary** (1 color, 3-5 shades) — brand, CTAs
- **Neutral** (9-11 shade scale) — text, backgrounds, borders
- **Semantic** (4 colors, 2-3 shades each) — success, error, warning, info
- **Surface** (2-3 levels) — cards, modals

### The 60-30-10 Rule
60% neutral backgrounds, 30% secondary (text, borders), 10% accent (CTAs, highlights). Accent works *because* it's rare.

### Contrast Requirements (WCAG AA)
- Body text: 4.5:1
- Large text (18px+ or 14px bold): 3:1
- UI components, icons: 3:1
- Placeholder text still needs 4.5:1

### Dangerous Combinations
- Light gray on white (#1 fail)
- Gray text on colored backgrounds — looks washed out
- Red on green (8% of men can't distinguish)
- Never pure black (#000) or pure white (#fff)

### Dark Mode
- Not inverted light mode — requires different design decisions
- Depth via lighter surfaces, not shadows
- Desaturate accents slightly
- Never pure black backgrounds — use dark gray (oklch 12-18%)
- Reduce text weight slightly

### Token Hierarchy
Two layers: primitive tokens (`--blue-500`) → semantic tokens (`--color-primary`). For dark mode, only redefine the semantic layer.

---

## 5. Spatial Design

### Spacing System
Use 4pt base (not 8pt — too coarse): 4, 8, 12, 16, 24, 32, 48, 64, 96px. Name semantically (`--space-sm`), not by value. Use `gap` instead of margins for sibling spacing.

### Grid Systems
- `repeat(auto-fit, minmax(280px, 1fr))` for responsive grids without breakpoints
- Named grid areas for complex layouts, redefined at breakpoints

### Visual Hierarchy — The Squint Test
Blur your eyes. Can you identify the most important element, the second most important, and clear groupings? If everything looks same weight, hierarchy is broken.

### Hierarchy Through Multiple Dimensions
Don't rely on size alone. Combine size (3:1+ ratio), weight (bold vs regular), color (high contrast), position (top/left), and space (white space). Best hierarchy uses 2-3 dimensions at once.

### Cards Are Overused
Use cards only when content is truly distinct and actionable. Never nest cards inside cards. Spacing and alignment create visual grouping naturally.

### Container Queries
Viewport queries for page layouts. Container queries for components:

```css
.card-container { container-type: inline-size; }
@container (min-width: 400px) { .card { grid-template-columns: 120px 1fr; } }
```

### Optical Adjustments
- Text at `margin-left: 0` looks indented — use negative margin (-0.05em) to optically align
- Play icons shift right, arrows shift toward their direction
- Touch targets: 44px minimum via padding or pseudo-elements

### Depth & Elevation
Semantic z-index scales (dropdown → sticky → modal-backdrop → modal → toast → tooltip). Subtle shadows — if clearly visible, probably too strong.

---

## 6. Motion Design

### Duration Guide
| Duration | Use Case |
|----------|----------|
| 100-150ms | Instant feedback (button, toggle) |
| 200-300ms | State changes (menu, tooltip, hover) |
| 300-500ms | Layout changes (accordion, modal, drawer) |
| 500-800ms | Entrance animations (page load, hero) |

Exit animations: ~75% of enter duration.

### Easing
- **ease-out**: Elements entering — `cubic-bezier(0.16, 1, 0.3, 1)`
- **ease-in**: Elements leaving — `cubic-bezier(0.7, 0, 0.84, 0)`
- **ease-in-out**: State toggles
- Recommended default: `--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1)`
- **Avoid**: bounce, elastic curves — they feel dated

### Animate Only `transform` and `opacity`
Everything else causes layout recalculation. For height: `grid-template-rows: 0fr → 1fr`.

### Staggered Animations
`animation-delay: calc(var(--i) * 50ms)` with `style="--i: 0"`. Cap total stagger time — 10 items × 50ms = 500ms max.

### Reduced Motion (REQUIRED)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Perceived Performance
- 80ms threshold — anything under feels instant
- Optimistic UI for low-stakes actions
- Ease-in toward task end compresses perceived time
- Skeleton screens > spinners

---

## 7. Interaction Design

### Eight Interactive States
Every interactive element needs: default, hover, focus, active, disabled, loading, error, success. The common miss: designing hover without focus (keyboard users never see hover).

### Focus Rings
Never `outline: none` without replacement. Use `:focus-visible` for keyboard-only focus. 2-3px thick, offset from element, 3:1 contrast.

### Forms
- Placeholders aren't labels — always use visible `<label>`
- Validate on blur, not every keystroke (except password strength)
- Errors below fields with `aria-describedby`

### Loading States
- Optimistic updates for low-stakes actions
- Skeleton screens > spinners

### Modals
Use `inert` attribute on background content. Or native `<dialog>` with `.showModal()`.

### Dropdowns
Avoid `position: absolute` inside `overflow: hidden`. Use CSS Anchor Positioning, Popover API, or portals.

### Destructive Actions
Undo > confirmation dialogs. Users click through confirmations mindlessly.

### Keyboard Navigation
Roving tabindex for component groups (tabs, menus). Arrow keys within, Tab between components. Skip links for main content.

---

## 8. Responsive Design

### Mobile-First
Base styles for mobile, `min-width` queries for complexity. Desktop-first means mobile loads unnecessary styles.

### Breakpoints
Content-driven, not device-driven. Start narrow, add breakpoint when design breaks. Three usually suffice (640, 768, 1024px).

### Detect Input Method
Use `@media (pointer: fine/coarse)` and `@media (hover: hover/none)` — screen size doesn't tell you input method.

### Safe Areas
`env(safe-area-inset-*)` for notches. Enable `viewport-fit=cover` in meta tag.

### Responsive Images
- `srcset` with width descriptors + `sizes` attribute
- `<picture>` for art direction (different crops)
- `loading="lazy"` below fold, `fetchpriority="high"` above fold

### Layout Adaptation
- Navigation: hamburger on mobile → horizontal on tablet → full on desktop
- Tables: transform to cards on mobile
- Progressive disclosure: `<details>/<summary>` for collapsible content

---

## 9. UX Writing

### Button Labels
Never "OK", "Submit", "Yes/No". Use specific verb + object: "Save changes", "Create account", "Delete message".

### Error Messages
Answer: (1) What happened? (2) Why? (3) How to fix? Never blame the user.

### Empty States
Onboarding moments: acknowledge, explain value, provide clear action.

### Voice vs Tone
Voice is consistent (brand personality). Tone adapts (celebratory for success, empathetic for errors, reassuring for loading). Never use humor for errors.

### Accessibility
Link text must have standalone meaning. Alt text describes information, not the image. Icon buttons need `aria-label`.

### Consistency
Pick one term and stick: Delete (not Remove/Trash), Settings (not Preferences/Options), Sign in (not Log in).

---

## 10. AI Slop Test

**Critical quality check**: If you showed this interface to someone and said "AI made this," would they believe you immediately? If yes, that's the problem.

A distinctive interface should make someone ask "how was this made?" not "which AI made this?"

**AI fingerprints to avoid (2024-2025 era):**
- Cyan-on-dark, purple-to-blue gradients, neon accents on dark backgrounds
- Gradient text on metrics/headings
- Dark mode with glowing accents as default
- Glassmorphism everywhere (blur effects, glass cards, glow borders)
- Identical card grids (same-sized cards: icon + heading + text, repeated)
- Hero metric layout template (big number, small label, gradient accent)
- Rounded rectangles with generic drop shadows
- Sparklines as decoration (tiny charts conveying nothing)
- Rounded elements with thick colored border on one side
- Large icons with rounded corners above every heading
- Inter/Roboto/Open Sans as font choice
- Monospace typography as "technical/developer" vibes

---

## 11. DO / DON'T Quick Reference

### DO
- Use a modular type scale with fluid sizing (clamp) for headings
- Tint neutrals toward brand hue
- Use OKLCH for perceptually uniform palettes
- Create visual rhythm through varied spacing
- Use container queries for component responsiveness
- Honor `prefers-reduced-motion`
- Use `:focus-visible` for keyboard focus rings
- Make interactions feel fast with optimistic UI
- Design empty states that teach the interface
- Use progressive disclosure (simple → advanced)
- Test on real devices, not just DevTools
- Validate forms on blur
- Use semantic HTML before ARIA
- Make every word earn its place

### DON'T
- Use overused fonts (Inter, Roboto, Arial, Open Sans)
- Use pure black (#000) or pure white (#fff)
- Use gray text on colored backgrounds
- Wrap everything in cards or nest cards in cards
- Center everything — asymmetric layouts feel more designed
- Use same spacing everywhere — monotonous without rhythm
- Animate layout properties (width, height, padding, margin)
- Use bounce/elastic easing
- Use `transition: all` — list properties explicitly
- Use `outline: none` without `:focus-visible` replacement
- Disable zoom (`user-scalable=no`)
- Use modals unless truly no better alternative
- Repeat information users can already see
- Make every button primary — hierarchy matters
- Default to dark mode with glowing accents
- Use glassmorphism, gradient text, or sparklines decoratively
- Skip `prefers-reduced-motion`
- Use `position: absolute` dropdowns inside `overflow: hidden`
- Block paste on inputs
- Use hardcoded date/number formats (use `Intl.*`)
