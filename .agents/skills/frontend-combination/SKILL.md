---
name: frontend-combination
description: 'Unified frontend super skill combining design, implementation, review, and optimization. Covers UI/UX design systems with BM25 search (styles, colors, typography, charts, landing pages, products, icons, UX guidelines, React performance, web interface), design patterns and anti-patterns, 18 satellite operations (adapt, animate, arrange, audit, bolder, clarify, colorize, critique, delight, extract, harden, normalize, onboard, optimize, overdrive, polish, quieter, typeset), React/Next.js best practices, view transitions, game performance optimization, and web design guidelines. Use when building, designing, reviewing, optimizing, or enhancing any frontend interface.'
user-invocable: true
argument-hint: '<query> [--design-system] [--domain <domain>] [--stack <stack>] [--operation] [--review]'
---

# Frontend Combination — Unified Design & Development Skill

A self-contained super skill that combines 28 frontend/design skills into a single unified workflow with searchable CSV data, Python BM25 scripts, consolidated reference docs, and specialized satellite operations.

## Prerequisites

**Python 3.6+** is required for the search engine and design system generator.

```bash
python3 --version
```

If Python is not available, you can still use this skill — consult the reference docs in `reference/` directly instead of running scripts.

---

## Context Gathering Protocol

Design skills produce generic output without project context. Before any design work:

1. **Check current instructions**: If loaded instructions contain a **Design Context** section, proceed.
2. **Check .impeccable.md**: Read `.impeccable.md` from project root. If it has target audience, use cases, and brand personality, proceed.
3. **Run teach-impeccable**: If neither source has context, run `/teach-impeccable` first.

**Required context** (every design task needs):

- **Target audience**: Who uses this product and in what context?
- **Use cases**: What jobs are they trying to get done?
- **Brand personality/tone**: How should the interface feel?

**CRITICAL**: You cannot infer this context from code. Code tells you what was built, not who it's for or what it should feel like.

---

## Unified Workflow

This skill operates in 4 modes. Choose based on what you're doing:

### Mode 1: Design — Generate Design Systems & Search Styles

Generate a complete design system recommendation or search specific domains.

**Generate design system:**

```bash
python3 scripts/search.py "<query>" --design-system [-p "Project Name"] [-f markdown]
```

**Search specific domains:**

```bash
python3 scripts/search.py "<query>" [--domain <domain>] [--max-results 5]
```

**Search stack-specific guidelines:**

```bash
python3 scripts/search.py "<query>" --stack <stack>
```

**Persist design system to files:**

```bash
python3 scripts/search.py "<query>" --design-system --persist [-p "Project Name"] [--page "dashboard"]
```

#### Search Domains

| Domain            | CSV File                 | What It Covers                                         |
| ----------------- | ------------------------ | ------------------------------------------------------ |
| `style`           | styles.csv               | UI styles, CSS implementation, design system variables |
| `color`           | colors.csv               | Color palettes by product type                         |
| `chart`           | charts.csv               | Chart types, accessibility, libraries                  |
| `landing`         | landing.csv              | Landing page patterns, conversion optimization         |
| `product`         | products.csv             | Product-type style recommendations                     |
| `ux`              | ux-guidelines.csv        | UX guidelines, do/don't with code examples             |
| `typography`      | typography.csv           | Font pairings, Google Fonts URLs, CSS imports          |
| `icons`           | icons.csv                | Icon libraries, import code, usage                     |
| `react`           | react-performance.csv    | React/Next.js performance rules                        |
| `web`             | web-interface.csv        | Web interface accessibility rules                      |
| `design-patterns` | design-patterns.csv      | Design anti-patterns, AI slop tells, do/don't rules    |
| `operations`      | satellite-operations.csv | Which satellite operation to use                       |

Auto-detection selects the best domain from the query. Override with `--domain`.

#### Available Stacks

`html-tailwind`, `react`, `nextjs`, `astro`, `vue`, `nuxtjs`, `nuxt-ui`, `svelte`, `swiftui`, `react-native`, `flutter`, `shadcn`, `jetpack-compose`

---

### Mode 2: Build — Implementation Guidelines

When implementing, consult these references based on your stack:

**React / Next.js projects:**

- Search: `python3 scripts/search.py "<query>" --domain react`
- Stack: `python3 scripts/search.py "<query>" --stack nextjs`
- Reference: [react-best-practices.md](reference/react-best-practices.md) — Vercel's optimization rules
- Reference: [view-transitions.md](reference/view-transitions.md) — React View Transition API

**Game / hot-path code:**

- Reference: [game-performance.md](reference/game-performance.md) — Zero-allocation patterns for per-frame code

**Any web project:**

- Reference: [web-guidelines.md](reference/web-guidelines.md) — Accessibility, forms, animation, performance checklists
- Reference: [design-principles.md](reference/design-principles.md) — Typography, color, spatial, motion, interaction, responsive, UX writing

**Design anti-pattern check:**

```bash
python3 scripts/search.py "<query>" --review
```

---

### Mode 3: Review — Audit & Critique

Review existing interfaces for quality, accessibility, and design issues.

**Find which review operation to use:**

```bash
python3 scripts/search.py "<describe the problem>" --operation
```

**Check design patterns:**

```bash
python3 scripts/search.py "<element or pattern>" --review
```

**Key review operations** (from satellite skills):

| Need                    | Operation    | What It Does                                                 |
| ----------------------- | ------------ | ------------------------------------------------------------ |
| Full design critique    | `/critique`  | Holistic evaluation with Nielsen scoring and persona testing |
| Technical audit         | `/audit`     | A11y, performance, theming, responsive, anti-pattern checks  |
| Design system alignment | `/normalize` | Realign drifted UI to design system standards                |
| Production readiness    | `/harden`    | Edge cases, i18n, error handling, overflow                   |
| Final polish            | `/polish`    | Alignment, spacing, consistency, micro-detail fixes          |

---

### Mode 4: Enhance — Satellite Operations

Transform existing interfaces with specialized operations.

**Find the right operation:**

```bash
python3 scripts/search.py "<what you want to do>" --operation
```

| Category             | Operations                              | Use When                                         |
| -------------------- | --------------------------------------- | ------------------------------------------------ |
| **Visual impact**    | `bolder`, `colorize`, `quieter`         | Design too safe, too gray, or too loud           |
| **Layout & type**    | `arrange`, `typeset`                    | Spacing off, hierarchy unclear, fonts generic    |
| **Motion & delight** | `animate`, `delight`, `overdrive`       | UI feels static, needs personality or wow factor |
| **Content & UX**     | `clarify`, `onboard`                    | Copy unclear, first-time experience missing      |
| **Adaptation**       | `adapt`, `optimize`                     | Not responsive, performance issues               |
| **System**           | `extract`, `normalize`                  | Need components, design system alignment         |
| **Quality**          | `audit`, `critique`, `harden`, `polish` | Pre-launch review, production hardening          |

Each operation follows a consistent workflow:

1. Invoke `/frontend-design` context gathering protocol
2. Assess current state
3. Plan improvements
4. Implement changes
5. Verify quality

See [satellite-operations.md](reference/satellite-operations.md) for detailed workflows.

---

## Design Principles Quick Reference

Consult [design-principles.md](reference/design-principles.md) for full details.

### Typography

- Modular type scale with 5 sizes (xs, sm, base, lg, xl+)
- Fluid `clamp()` for headings, fixed `rem` for app UI body text
- Distinctive fonts — avoid Inter, Roboto, Open Sans, Arial
- 16px minimum body text, `rem` units, never `px`

### Color

- OKLCH for perceptually uniform palettes
- Tint neutrals toward brand hue (chroma ~0.01)
- 60-30-10 rule: neutrals / secondary / accent
- WCAG: 4.5:1 body text, 3:1 large text and UI
- Never pure black (#000) or pure gray

### Layout

- 4pt base spacing system
- Visual rhythm: tight grouping for related, generous for sections
- Container queries for components, media queries for pages
- 44x44px minimum touch targets

### Motion

- Only animate `transform` and `opacity`
- 100-150ms instant feedback, 200-300ms state changes, 300-500ms layout changes
- ease-out-quart/quint/expo — never bounce or elastic
- Always respect `prefers-reduced-motion`

### Interaction

- 8 interactive states: default, hover, focus, active, disabled, loading, error, success
- `:focus-visible` not `:focus` — keyboard users only
- Undo > confirmation dialogs
- Placeholders are not labels

---

## AI Slop Detection

**CRITICAL**: Before delivering any interface, check for these AI-generated design tells:

| Tell               | What To Look For                                               |
| ------------------ | -------------------------------------------------------------- |
| AI color palette   | Cyan-on-dark, purple-to-blue gradients, neon accents           |
| Dark mode shortcut | Dark backgrounds with glowing accents instead of real design   |
| Gradient text      | Gradients applied to text/metrics for decorative impact        |
| Glassmorphism      | Blur effects and glass cards used decoratively everywhere      |
| Card grid monotony | Identical cards with icon + heading + text, repeated endlessly |
| Hero metric layout | Big number, small label, stats row, gradient accent            |
| Rounded + shadow   | Rounded rectangles with generic drop shadows                   |
| One-side border    | Colored border on one side as lazy accent                      |
| Generic fonts      | Inter, Roboto, system defaults with no personality             |
| Bounce/elastic     | Dated easing that draws attention to animation, not content    |

**The test**: Show it to someone and say "AI made this." If they believe you immediately — fix it.

---

## Common Rules

These rules apply to ALL output from this skill:

| Rule                | Details                                             |
| ------------------- | --------------------------------------------------- |
| No emojis as icons  | Use SVG icons (Heroicons, Lucide, Simple Icons)     |
| cursor-pointer      | All clickable elements must have cursor:pointer     |
| Hover transitions   | 150-300ms with ease-out-quart/quint/expo            |
| Contrast            | 4.5:1 minimum for body text (WCAG AA)               |
| Focus states        | Visible for keyboard navigation (`:focus-visible`)  |
| Reduced motion      | Respect `prefers-reduced-motion`                    |
| Responsive          | Test at 375px, 768px, 1024px, 1440px                |
| Semantic HTML       | Use `button`, `a`, `label`, `table` before ARIA     |
| Touch targets       | 44x44px minimum on all interactive elements         |
| No layout animation | Only animate `transform` and `opacity`              |
| Accessible forms    | Every input needs a visible `<label>`               |
| Images              | Explicit `width`/`height` attributes to prevent CLS |

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] **AI Slop Test**: Does NOT look like generic AI output
- [ ] **Design patterns**: No anti-patterns from `design-patterns` domain
- [ ] **Semantic HTML**: Proper elements before ARIA roles
- [ ] **Accessibility**: WCAG AA contrast, focus-visible, aria-labels
- [ ] **Touch targets**: 44x44px minimum on interactive elements
- [ ] **Typography**: rem units, 16px minimum body, modular scale
- [ ] **Color**: No pure black/gray/white, tinted neutrals, OKLCH
- [ ] **Icons**: SVG from consistent icon set, no emojis
- [ ] **Cursor**: cursor-pointer on all clickable elements
- [ ] **Hover states**: Smooth transitions (150-300ms, ease-out)
- [ ] **Focus states**: Visible for keyboard navigation
- [ ] **Reduced motion**: prefers-reduced-motion respected
- [ ] **Images**: width/height set, loading="lazy" below fold
- [ ] **Responsive**: Works at 375px, 768px, 1024px, 1440px
- [ ] **No horizontal scroll**: Content fits viewport at all sizes
- [ ] **Performance**: No layout thrashing, virtualized lists if >50 items
- [ ] **Error states**: Helpful messages with fix instructions
- [ ] **Empty states**: Guide users toward action
- [ ] **Loading states**: Skeleton screens or specific messages

---

## File Structure

```
frontend-combination/
├── SKILL.md                         # This file — unified entry point
├── data/                            # Searchable CSV data (BM25 indexed)
│   ├── charts.csv                   # Chart type recommendations
│   ├── colors.csv                   # Color palettes by product type
│   ├── design-patterns.csv          # Design anti-patterns and rules
│   ├── icons.csv                    # Icon library recommendations
│   ├── landing.csv                  # Landing page patterns
│   ├── products.csv                 # Product-type style guides
│   ├── react-performance.csv        # React/Next.js performance rules
│   ├── satellite-operations.csv     # Satellite skill lookup
│   ├── styles.csv                   # UI style guides with CSS
│   ├── typography.csv               # Font pairings and imports
│   ├── ui-reasoning.csv             # Design system reasoning rules
│   ├── ux-guidelines.csv            # UX do/don't guidelines
│   ├── web-interface.csv            # Web accessibility rules
│   └── stacks/                      # Stack-specific guidelines (13 stacks)
├── scripts/
│   ├── core.py                      # BM25 search engine
│   ├── search.py                    # CLI interface
│   └── design_system.py             # Design system generator
└── reference/
    ├── design-principles.md         # Typography, color, spatial, motion, interaction, responsive, UX writing
    ├── satellite-operations.md      # All 18 satellite skill workflows
    ├── react-best-practices.md      # React/Next.js optimization rules
    ├── game-performance.md          # Zero-allocation game loop patterns
    ├── web-guidelines.md            # Accessibility, forms, animation checklists
    └── view-transitions.md          # React View Transition API reference
```
