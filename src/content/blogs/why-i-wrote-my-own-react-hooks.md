---
title: "Why I Wrote My Own React Hooks Library"
date: "Jan 2025"
readTime: "4 min"
tags: ["React", "Open Source", "npm"]
summary: "The story behind react-utility-hooks — what drove me to publish my first npm package and what I learned shipping open source."
external: false
externalUrl: ""
---

# Why I Wrote My Own React Hooks Library

Every project I joined had the same hooks copy-pasted into a `utils/` folder: `useDebounce`, `useLocalStorage`, `useOutsideClick`. I got tired of copy-pasting and decided to publish them properly.

## The Itch

Three separate codebases, three slightly different `useDebounce` implementations. One had a bug with the cleanup. One didn't handle the initial render correctly. Publishing a single, well-tested package meant fixing it once.

## What's in the Package

```ts
// Delay-based search input
const debouncedQuery = useDebounce(query, 300);

// Persistent state synced with localStorage
const [theme, setTheme] = useLocalStorage("theme", "light");

// Detect clicks outside a ref (dropdowns, modals)
useOutsideClick(modalRef, () => setOpen(false));

// Responsive breakpoints
const isMobile = useMediaQuery("(max-width: 640px)");

// Keyboard shortcut binding
useKeyPress("Escape", () => setOpen(false));
```

## Publishing Lessons

**TypeScript generics are non-negotiable.** Users will pass all kinds of types and a `any`-typed library is useless.

```ts
function useLocalStorage<T>(key: string, initial: T): [T, (val: T) => void]
```

**Test with `@testing-library/react-hooks`.** Hooks have lifecycle quirks that plain unit tests miss.

**Semantic versioning matters from day one.** I shipped a breaking change in a patch version. People noticed.

**Write docs before code.** If I can't explain the API clearly in the README, the API is wrong.

## The Unexpected Part

Someone opened an issue from a company I'd never heard of. They were using the package in production and needed a feature. That first issue made it feel real — open source shifts from "my toy" to "someone else's dependency" overnight.

## Would I Do It Again?

Yes. The code quality discipline alone was worth it. When you know someone else is importing your work, you write it differently.
