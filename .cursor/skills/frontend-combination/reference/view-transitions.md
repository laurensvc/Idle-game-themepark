# React View Transitions Reference

Animate between UI states using the browser's native `document.startViewTransition`. Declare _what_ with `<ViewTransition>`, trigger _when_ with `startTransition` / `useDeferredValue` / `Suspense`, control _how_ with CSS classes. Unsupported browsers skip animations gracefully.

---

## Core Concepts

### The `<ViewTransition>` Component

```jsx
import { ViewTransition } from 'react';

<ViewTransition>
  <Component />
</ViewTransition>
```

React auto-assigns a unique `view-transition-name` and calls `document.startViewTransition` behind the scenes. Never call `startViewTransition` yourself.

### Animation Triggers

| Trigger    | When it fires                                                      |
| ---------- | ------------------------------------------------------------------ |
| **enter**  | VT first inserted during a Transition                              |
| **exit**   | VT first removed during a Transition                               |
| **update** | DOM mutations inside a VT (innermost wins with nested VTs)         |
| **share**  | Named VT unmounts and another with same `name` mounts in same Transition |

Only `startTransition`, `useDeferredValue`, or `Suspense` activate VTs. Regular `setState` does not animate.

### Critical Placement Rule

VT only activates enter/exit if it appears **before any DOM nodes**:

```jsx
// Works
<ViewTransition enter="auto" exit="auto"><div>Content</div></ViewTransition>

// Broken — div wraps the VT, suppressing enter/exit
<div><ViewTransition enter="auto" exit="auto"><div>Content</div></ViewTransition></div>
```

---

## Styling with View Transition Classes

Props accept: `"auto"` (browser cross-fade), `"none"` (disabled), `"class-name"` (custom CSS), or `{ [type]: value }` for type-specific animations.

```jsx
<ViewTransition default="none" enter="slide-in" exit="slide-out" share="morph" />
```

If `default` is `"none"`, all triggers are off unless explicitly listed.

### CSS Pseudo-Elements

- `::view-transition-old(.class)` — outgoing snapshot
- `::view-transition-new(.class)` — incoming snapshot
- `::view-transition-group(.class)` — container
- `::view-transition-image-pair(.class)` — old + new pair

---

## Transition Types with `addTransitionType`

Tag transitions so VTs can pick different animations based on context:

```jsx
startTransition(() => {
  addTransitionType('nav-forward');
  router.push('/detail/1');
});
```

Map types to CSS classes:

```jsx
<ViewTransition
  enter={{ 'nav-forward': 'slide-from-right', 'nav-back': 'slide-from-left', default: 'none' }}
  exit={{ 'nav-forward': 'slide-to-left', 'nav-back': 'slide-to-right', default: 'none' }}
  default="none"
>
  <Page />
</ViewTransition>
```

**TypeScript:** `ViewTransitionClassPerType` requires a `default` key in the object.

**Types and Suspense:** Types are available during navigation but NOT during subsequent Suspense reveals. Use type maps for page-level enter/exit; use simple string props for Suspense reveals.

---

## Shared Element Transitions

Same `name` on two VTs — one unmounting, one mounting — creates a shared element morph:

```jsx
// Source view
<ViewTransition name="hero-image">
  <img src="/thumb.jpg" onClick={() => startTransition(() => onSelect())} />
</ViewTransition>

// Target view — same name
<ViewTransition name="hero-image">
  <img src="/full.jpg" />
</ViewTransition>
```

**Rules:**
- Only one VT with a given `name` can be mounted at a time — use unique names (`photo-${id}`)
- `share` takes precedence over `enter`/`exit`
- Never use fade-out exit on pages with shared morphs — use directional slide

---

## Common Patterns

### Enter/Exit

```jsx
{show && (
  <ViewTransition enter="fade-in" exit="fade-out">
    <Panel />
  </ViewTransition>
)}
```

### List Reorder

```jsx
{items.map((item) => (
  <ViewTransition key={item.id}>
    <ItemCard item={item} />
  </ViewTransition>
))}
```

Trigger inside `startTransition`. Avoid wrapper `<div>`s between list and VT.

### Force Re-Enter with `key`

```jsx
<ViewTransition key={searchParams.toString()} enter="slide-up" default="none">
  <ResultsGrid />
</ViewTransition>
```

**Caution:** Wrapping `<Suspense>` with key remounts the boundary and refetches.

### Suspense Fallback to Content

Simple cross-fade:

```jsx
<ViewTransition>
  <Suspense fallback={<Skeleton />}>
    <Content />
  </Suspense>
</ViewTransition>
```

Directional reveal:

```jsx
<Suspense
  fallback={<ViewTransition exit="slide-down"><Skeleton /></ViewTransition>}
>
  <ViewTransition enter="slide-up" default="none">
    <Content />
  </ViewTransition>
</Suspense>
```

### Isolate Persistent Elements

```jsx
<header style={{ viewTransitionName: 'site-header' }}>...</header>
```

```css
::view-transition-group(site-header) { animation: none; z-index: 100; }
```

---

## Use `default="none"` Liberally

Without it, every VT fires the browser cross-fade on **every** transition — Suspense resolves, `useDeferredValue` updates, background revalidations. Always use `default="none"` and explicitly enable only desired triggers.

### Two Patterns Coexist

**Pattern A — Directional slides:** Type-keyed VT on each page, fires during navigation.
**Pattern B — Suspense reveals:** Simple string props, fires when data loads (no type).

They coexist because they fire at different moments. `default="none"` on both prevents cross-interference. Always pair `enter` with `exit`. Place directional VTs in page components, not layouts.

---

## Next.js Integration

### Setup

```js
// next.config.js
experimental: { viewTransition: true }
```

Wraps every `<Link>` navigation in `document.startViewTransition`. Requires `react@canary`.

### `transitionTypes` Prop on `<Link>`

```tsx
<Link href="/products/1" transitionTypes={['nav-forward']}>View</Link>
<Link href="/" transitionTypes={['nav-back']}>Back</Link>
```

Works in Server Components. Reserve `startTransition` + `addTransitionType` for non-link interactions.

### Directional Navigation in Pages

Place type-keyed VTs in **page components** (not layouts):

```tsx
<ViewTransition
  default="none"
  enter={{ 'nav-forward': 'slide-from-right', 'nav-back': 'slide-from-left', default: 'none' }}
  exit={{ 'nav-forward': 'slide-to-left', 'nav-back': 'slide-to-right', default: 'none' }}
>
  <PageContent />
</ViewTransition>
```

### Same-Route Dynamic Segments

Page stays mounted — enter/exit never fire. Use `key` + `name` + `share`:

```tsx
<Suspense fallback={<Skeleton />}>
  <ViewTransition key={slug} name={`collection-${slug}`} share="auto" default="none">
    <Content slug={slug} />
  </ViewTransition>
</Suspense>
```

---

## CSS Animation Recipes

### Timing Variables

```css
:root {
  --duration-exit: 150ms;
  --duration-enter: 210ms;
  --duration-move: 400ms;
}
```

### Shared Keyframes

```css
@keyframes fade { from { filter: blur(3px); opacity: 0; } to { filter: blur(0); opacity: 1; } }
@keyframes slide { from { translate: var(--slide-offset); } to { translate: 0; } }
@keyframes slide-y { from { transform: translateY(var(--slide-y-offset, 10px)); } to { transform: translateY(0); } }
```

### Fade

```css
::view-transition-old(.fade-out) { animation: var(--duration-exit) ease-in fade reverse; }
::view-transition-new(.fade-in) { animation: var(--duration-enter) ease-out var(--duration-exit) both fade; }
```

### Slide (Vertical)

```css
::view-transition-old(.slide-down) {
  animation: var(--duration-exit) ease-out both fade reverse, var(--duration-exit) ease-out both slide-y reverse;
}
::view-transition-new(.slide-up) {
  animation: var(--duration-enter) ease-in var(--duration-exit) both fade, var(--duration-move) ease-in both slide-y;
}
```

### Directional Navigation (Single-Class)

```css
::view-transition-old(.nav-forward) {
  --slide-offset: -60px;
  animation: var(--duration-exit) ease-in both fade reverse, var(--duration-move) ease-in-out both slide reverse;
}
::view-transition-new(.nav-forward) {
  --slide-offset: 60px;
  animation: var(--duration-enter) ease-out var(--duration-exit) both fade, var(--duration-move) ease-in-out both slide;
}
::view-transition-old(.nav-back) {
  --slide-offset: 60px;
  animation: var(--duration-exit) ease-in both fade reverse, var(--duration-move) ease-in-out both slide reverse;
}
::view-transition-new(.nav-back) {
  --slide-offset: -60px;
  animation: var(--duration-enter) ease-out var(--duration-exit) both fade, var(--duration-move) ease-in-out both slide;
}
```

### Shared Element Morph

```css
::view-transition-group(.morph) { animation-duration: var(--duration-move); }
::view-transition-image-pair(.morph) { animation-name: via-blur; }
@keyframes via-blur { 30% { filter: blur(3px); } }
```

### Persistent Element Isolation

```css
::view-transition-group(persistent-nav) { animation: none; z-index: 100; }
```

### Backdrop-Blur Workaround

```css
::view-transition-old(persistent-nav) { display: none; }
::view-transition-new(persistent-nav) { animation: none; }
```

---

## Accessibility — Reduced Motion

**Always** add this to your global stylesheet:

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(*),
  ::view-transition-new(*),
  ::view-transition-group(*) {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
  }
}
```

---

## Animation Timing Guide

| Interaction          | Duration  |
| -------------------- | --------- |
| Direct toggle        | 100–200ms |
| Route transition     | 150–250ms |
| Suspense reveal      | 200–400ms |
| Shared element morph | 300–500ms |

---

## Common Mistakes

- **Bare VT without `default="none"`** — fires cross-fade on every transition
- **Directional VT in a layout** — layouts persist, enter/exit won't fire on route changes
- **Fade-out exit with shared morphs** — conflicts with morph, use directional slide
- **Writing custom animation CSS** — use the recipes above
- **Missing `default: "none"` in type-keyed objects** — TypeScript requires it, fallback is `"auto"`
- **Type maps on Suspense reveals** — Suspense resolves have no type, use string props
- **Raw `viewTransitionName` CSS to trigger animations** — only `<ViewTransition>` components trigger view transitions
- **`update` trigger for same-route navigations** — use `key` + `name` + `share` instead

---

## Availability

- Requires `react@canary` or `react@experimental` — NOT in stable React (including 19.x)
- Browser support: Chromium 111+, Firefox 144+, Safari 18.2+
- Graceful degradation on unsupported browsers
