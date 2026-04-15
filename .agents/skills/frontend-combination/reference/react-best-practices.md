# React & Next.js Best Practices Reference

Condensed from Vercel Engineering's comprehensive guide. 40+ rules across 8 categories, prioritized by impact.

---

## Quick Lookup Table

| #    | Rule                                               | Severity    | Category    |
| ---- | -------------------------------------------------- | ----------- | ----------- |
| 1.1  | Check cheap conditions before async flags          | HIGH        | Waterfalls  |
| 1.2  | Defer await until needed                           | HIGH        | Waterfalls  |
| 1.3  | Dependency-based parallelization                   | CRITICAL    | Waterfalls  |
| 1.4  | Prevent waterfall chains in API routes             | CRITICAL    | Waterfalls  |
| 1.5  | Promise.all() for independent operations           | CRITICAL    | Waterfalls  |
| 1.6  | Strategic Suspense boundaries                      | HIGH        | Waterfalls  |
| 2.1  | Avoid barrel file imports                          | CRITICAL    | Bundle Size |
| 2.2  | Conditional module loading                         | HIGH        | Bundle Size |
| 2.3  | Defer non-critical third-party libraries           | MEDIUM      | Bundle Size |
| 2.4  | Dynamic imports for heavy components               | CRITICAL    | Bundle Size |
| 2.5  | Preload based on user intent                       | MEDIUM      | Bundle Size |
| 3.1  | Authenticate Server Actions like API routes        | CRITICAL    | Server-Side |
| 3.2  | Avoid duplicate serialization in RSC props         | LOW         | Server-Side |
| 3.3  | Avoid shared module state for request data         | HIGH        | Server-Side |
| 3.4  | Cross-request LRU caching                          | HIGH        | Server-Side |
| 3.5  | Hoist static I/O to module level                   | HIGH        | Server-Side |
| 3.6  | Minimize serialization at RSC boundaries           | HIGH        | Server-Side |
| 3.7  | Parallel data fetching with component composition  | CRITICAL    | Server-Side |
| 3.8  | Parallel nested data fetching                      | CRITICAL    | Server-Side |
| 3.9  | Per-request deduplication with React.cache()       | MEDIUM      | Server-Side |
| 3.10 | Use after() for non-blocking operations            | MEDIUM      | Server-Side |
| 4.1  | Deduplicate global event listeners                 | LOW         | Client Data |
| 4.2  | Use passive event listeners for scrolling          | MEDIUM      | Client Data |
| 4.3  | Use SWR for automatic deduplication                | MEDIUM-HIGH | Client Data |
| 4.4  | Version and minimize localStorage data             | MEDIUM      | Client Data |
| 5.1  | Calculate derived state during rendering           | MEDIUM      | Re-renders  |
| 5.2  | Defer state reads to usage point                   | MEDIUM      | Re-renders  |
| 5.3  | Don't useMemo simple primitive expressions         | LOW-MEDIUM  | Re-renders  |
| 5.4  | Don't define components inside components          | HIGH        | Re-renders  |
| 5.5  | Extract default non-primitive params to constants  | MEDIUM      | Re-renders  |
| 5.6  | Extract to memoized components                     | MEDIUM      | Re-renders  |
| 5.7  | Narrow effect dependencies                         | LOW         | Re-renders  |
| 5.8  | Put interaction logic in event handlers            | MEDIUM      | Re-renders  |
| 5.9  | Split combined hook computations                   | MEDIUM      | Re-renders  |
| 5.10 | Subscribe to derived state                         | MEDIUM      | Re-renders  |
| 5.11 | Use functional setState updates                    | MEDIUM      | Re-renders  |
| 5.12 | Use lazy state initialization                      | MEDIUM      | Re-renders  |
| 5.13 | Use transitions for non-urgent updates             | MEDIUM      | Re-renders  |
| 5.14 | Use useDeferredValue for expensive derived renders | MEDIUM      | Re-renders  |
| 5.15 | Use useRef for transient values                    | MEDIUM      | Re-renders  |
| 6.1  | Animate SVG wrapper instead of SVG element         | LOW         | Rendering   |
| 6.2  | CSS content-visibility for long lists              | HIGH        | Rendering   |
| 6.3  | Hoist static JSX elements                          | LOW         | Rendering   |
| 6.4  | Optimize SVG precision                             | LOW         | Rendering   |
| 6.5  | Prevent hydration mismatch without flickering      | MEDIUM      | Rendering   |
| 6.6  | Suppress expected hydration mismatches             | LOW-MEDIUM  | Rendering   |
| 6.7  | Use Activity component for show/hide               | MEDIUM      | Rendering   |
| 6.8  | Use defer or async on script tags                  | HIGH        | Rendering   |
| 6.9  | Use explicit conditional rendering                 | LOW         | Rendering   |
| 6.10 | Use React DOM resource hints                       | HIGH        | Rendering   |
| 6.11 | Use useTransition over manual loading states       | LOW         | Rendering   |
| 7.1  | Avoid layout thrashing                             | MEDIUM      | JS Perf     |
| 7.2  | Build index maps for repeated lookups              | LOW-MEDIUM  | JS Perf     |
| 7.3  | Cache property access in loops                     | LOW-MEDIUM  | JS Perf     |
| 7.4  | Cache repeated function calls                      | MEDIUM      | JS Perf     |
| 7.5  | Cache storage API calls                            | LOW-MEDIUM  | JS Perf     |
| 7.6  | Combine multiple array iterations                  | LOW-MEDIUM  | JS Perf     |
| 7.7  | Defer non-critical work with requestIdleCallback   | MEDIUM      | JS Perf     |
| 7.8  | Early length check for array comparisons           | MEDIUM-HIGH | JS Perf     |
| 7.9  | Early return from functions                        | LOW-MEDIUM  | JS Perf     |
| 7.10 | Hoist RegExp creation                              | LOW-MEDIUM  | JS Perf     |
| 7.11 | Use flatMap to map and filter in one pass          | LOW-MEDIUM  | JS Perf     |
| 7.12 | Use loop for min/max instead of sort               | LOW         | JS Perf     |
| 7.13 | Use Set/Map for O(1) lookups                       | LOW-MEDIUM  | JS Perf     |
| 7.14 | Use toSorted() instead of sort() for immutability  | MEDIUM-HIGH | JS Perf     |
| 8.1  | Initialize app once, not per mount                 | LOW-MEDIUM  | Advanced    |
| 8.2  | Store event handlers in refs                       | LOW         | Advanced    |
| 8.3  | useEffectEvent for stable callback refs            | LOW         | Advanced    |

---

## 1. Eliminating Waterfalls — CRITICAL

The #1 performance killer. Each sequential await adds full network latency.

### 1.3 Dependency-Based Parallelization (CRITICAL, 2-10x improvement)

Start independent operations immediately. For partial dependencies, use promise chaining:

```typescript
const userPromise = fetchUser();
const profilePromise = userPromise.then((user) => fetchProfile(user.id));
const [user, config, profile] = await Promise.all([userPromise, fetchConfig(), profilePromise]);
```

### 1.4 Prevent Waterfall Chains in API Routes (CRITICAL, 2-10x)

Start independent operations immediately, even if you don't await them yet:

```typescript
export async function GET(request: Request) {
  const sessionPromise = auth();
  const configPromise = fetchConfig();
  const session = await sessionPromise;
  const [config, data] = await Promise.all([configPromise, fetchData(session.user.id)]);
  return Response.json({ data, config });
}
```

### 1.5 Promise.all() for Independent Operations (CRITICAL, 2-10x)

```typescript
const [user, posts, comments] = await Promise.all([fetchUser(), fetchPosts(), fetchComments()]);
```

### 1.6 Strategic Suspense Boundaries (HIGH)

Move data fetching into child components so wrapper UI renders immediately:

```tsx
function Page() {
  return (
    <div>
      <Header />
      <Suspense fallback={<Skeleton />}>
        <DataDisplay />
      </Suspense>
      <Footer />
    </div>
  );
}

async function DataDisplay() {
  const data = await fetchData();
  return <div>{data.content}</div>;
}
```

### 1.1 Check Cheap Conditions Before Async Flags (HIGH)

Evaluate cheap synchronous conditions FIRST before async calls:

```typescript
if (someCondition) {
  const someFlag = await getFlag();
  if (someFlag) {
    /* ... */
  }
}
```

---

## 2. Bundle Size Optimization — CRITICAL

### 2.1 Avoid Barrel File Imports (CRITICAL, 200-800ms)

Import directly from source files. In Next.js 13.5+, use `optimizePackageImports` config. Affected libraries: `lucide-react`, `@mui/material`, `react-icons`, `lodash`, `date-fns`.

### 2.4 Dynamic Imports for Heavy Components (CRITICAL)

```tsx
const MonacoEditor = dynamic(() => import('./monaco-editor').then((m) => m.MonacoEditor), { ssr: false });
```

### 2.2 Conditional Module Loading (HIGH)

Load large data only when a feature is activated. Use `typeof window !== 'undefined'` to prevent SSR bundling.

---

## 3. Server-Side Performance — HIGH

### 3.1 Authenticate Server Actions Like API Routes (CRITICAL)

Server Actions are exposed as public endpoints. Always verify auth INSIDE each action:

```typescript
'use server';
export async function deleteUser(userId: string) {
  const session = await verifySession();
  if (!session) throw unauthorized('Must be logged in');
  if (session.user.role !== 'admin' && session.user.id !== userId) throw unauthorized('Cannot delete other users');
  await db.user.delete({ where: { id: userId } });
}
```

### 3.7 Parallel Data Fetching with Component Composition (CRITICAL)

RSCs execute sequentially within a tree. Restructure so sibling components fetch in parallel:

```tsx
export default function Page() {
  return (
    <div>
      <Header />
      <Sidebar />
    </div>
  ); // Both fetch simultaneously
}
```

### 3.3 Avoid Shared Module State for Request Data (HIGH)

Use `React.cache()` or pass data via props — never mutable module-level variables for request-scoped data.

### 3.5 Hoist Static I/O to Module Level (HIGH)

Module-level code runs once when imported, not per request. Hoist font/config/template loading.

### 3.6 Minimize Serialization at RSC Boundaries (HIGH)

Only pass fields the client component actually uses — not entire objects.

---

## 4. Client-Side Data Fetching — MEDIUM-HIGH

### 4.3 Use SWR for Automatic Deduplication (MEDIUM-HIGH)

```tsx
const { data: users } = useSWR('/api/users', fetcher);
```

### 4.2 Use Passive Event Listeners (MEDIUM)

Add `{ passive: true }` to touch/wheel listeners to enable immediate scrolling.

---

## 5. Re-render Optimization — MEDIUM

### 5.4 Don't Define Components Inside Components (HIGH)

Creates new component type every render → full remount. Symptoms: input loses focus, animations restart, effects re-run.

### 5.1 Calculate Derived State During Rendering (MEDIUM)

Don't store derived values in state + effect. Compute inline: `const fullName = firstName + ' ' + lastName;`

### 5.11 Use Functional setState Updates (MEDIUM)

```tsx
setItems((curr) => [...curr, ...newItems]); // Stable, no stale closures
```

### 5.12 Use Lazy State Initialization (MEDIUM)

```tsx
const [settings] = useState(() => JSON.parse(localStorage.getItem('settings') || '{}'));
```

### 5.14 Use useDeferredValue for Expensive Derived Renders (MEDIUM)

Keep input responsive while expensive computation runs in background.

### 5.15 Use useRef for Transient Values (MEDIUM)

Store frequently-changing values (mouse position, intervals) in refs — no re-render on update.

---

## 6. Rendering Performance — MEDIUM

### 6.2 CSS content-visibility for Long Lists (HIGH)

```css
.message-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 80px;
}
```

For 1000 items, browser skips layout/paint for ~990 off-screen items.

### 6.8 Use defer/async on Script Tags (HIGH)

Use `next/script` with `strategy` prop. Never block HTML parsing with synchronous scripts.

### 6.10 Use React DOM Resource Hints (HIGH)

`prefetchDNS`, `preconnect`, `preload`, `preloadModule`, `preinit`, `preinitModule` — start loading resources early.

### 6.5 Prevent Hydration Mismatch Without Flickering (MEDIUM)

For client-side storage (theme, prefs), inject a synchronous script that updates DOM before React hydrates.

### 6.7 Use Activity Component for Show/Hide (MEDIUM)

```tsx
<Activity mode={isOpen ? 'visible' : 'hidden'}>
  <ExpensiveMenu />
</Activity>
```

---

## 7. JavaScript Performance — LOW-MEDIUM

### 7.1 Avoid Layout Thrashing (MEDIUM)

Never interleave style writes with layout reads. Batch all writes, then read.

### 7.7 Defer Non-Critical Work with requestIdleCallback (MEDIUM)

Schedule analytics, storage saves, and prefetching during browser idle periods.

### 7.14 Use toSorted() Instead of sort() (MEDIUM-HIGH)

`.sort()` mutates arrays — breaks React immutability. Use `.toSorted()` for safe sorting.

### 7.8 Early Length Check for Array Comparisons (MEDIUM-HIGH)

Check `a.length !== b.length` before expensive comparison operations.

### 7.13 Use Set/Map for O(1) Lookups (LOW-MEDIUM)

```typescript
const allowedIds = new Set(['a', 'b', 'c']);
items.filter((item) => allowedIds.has(item.id));
```

---

## 8. Advanced Patterns — LOW

### 8.1 Initialize App Once, Not Per Mount (LOW-MEDIUM)

Use module-level guard (`let didInit = false`) for one-time initialization. Components can remount.

### 8.2/8.3 Stable Event Handler Refs (LOW)

Use `useEffectEvent` for stable callback references that always access latest values without re-subscribing effects.
