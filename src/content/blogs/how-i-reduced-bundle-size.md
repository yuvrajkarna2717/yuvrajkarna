---
title: "How I Reduced Bundle Size by 40% Using Dynamic Imports"
date: "Apr 2025"
readTime: "5 min"
tags: ["React", "Performance", "Webpack"]
summary: "A deep dive into code-splitting strategies that cut our news platform's initial bundle from 2.4 MB to 1.4 MB."
external: false
externalUrl: ""
---

# How I Reduced Bundle Size by 40% Using Dynamic Imports

Our news platform was shipping a **2.4 MB** JavaScript bundle on first load. That's the kind of number that makes Lighthouse cry. Here's the breakdown of what I did to get it down to **1.4 MB**.

## The Problem

When you `import` everything at the top of your entry file, webpack (or Vite) bundles it all into one chunk. Users downloading your app have to pull down every feature — even those they'll never use.

```js
// ❌ Eager import — everything lands in main.js
import { HeavyEditor } from "./HeavyEditor";
import { ChartDashboard } from "./ChartDashboard";
```

## Route-level Code Splitting

The fastest win is splitting by route. React ships `lazy` and `Suspense` for exactly this.

```tsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const ChartDashboard = lazy(() => import("./ChartDashboard"));
const HeavyEditor    = lazy(() => import("./HeavyEditor"));

export default function App() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <Routes>
        <Route path="/dashboard" element={<ChartDashboard />} />
        <Route path="/editor"    element={<HeavyEditor />} />
      </Routes>
    </Suspense>
  );
}
```

Each route now becomes its own chunk, only fetched when the user navigates there.

## Granular Component Splitting

Some components are large regardless of route. For these, I conditionally import them only when needed.

```tsx
const handleOpenEditor = async () => {
  const { HeavyEditor } = await import("./HeavyEditor");
  setEditor(<HeavyEditor />);
};
```

## Tree-shaking Moment-of-Truth

We were importing `lodash` as a whole:

```js
// ❌ Pulls in the entire library
import _ from "lodash";
```

Switching to named imports from `lodash-es` let webpack tree-shake unused functions down to almost nothing.

```js
// ✅ Only ships `debounce`
import { debounce } from "lodash-es";
```

## Results

| Metric | Before | After |
|---|---|---|
| Initial bundle | 2.4 MB | 1.4 MB |
| TTI (3G) | 8.2 s | 4.6 s |
| Lighthouse score | 54 | 87 |

The single biggest win was route-level splitting — it accounted for ~600 KB all by itself.

## Takeaways

- Start with route-level `React.lazy` — highest impact, lowest effort.
- Profile with `vite-bundle-visualizer` or `webpack-bundle-analyzer` before optimizing blindly.
- Prefer `lodash-es` over `lodash` for tree-shaking support.
- Dynamic `import()` inside event handlers is underrated.
