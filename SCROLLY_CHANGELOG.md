# ScrollySection.jsx — Full Changelog & Architecture Notes

> **Purpose**: Feed this into an LLM to get further optimization suggestions for `src/ScrollySection.jsx` in the DVS (Diagnostic Vaccination System) project.

---

## Project Context

- **Framework**: React 18 + Vite
- **Animation**: GSAP 3 + ScrollTrigger plugin
- **Styling**: All inline styles (no CSS files for this component)
- **Fonts**: Syne (headings), DM Sans (body), JetBrains Mono (code/numbers) — loaded via Google Fonts `@import` in `HeroSection.jsx`
- **Color system**: `#080808` background, `#00F5FF` (cyan), `#FF2D9B` (magenta), `#F0F0F0` (text)

---

## Errors Encountered & Fixes

### Error 1: `useRef is not defined`
- **Cause**: A previous browser subagent injected `ScrollTrigger.defaults({ scroller: window })` at module level, which corrupted the React import scope. The bundler silently dropped the `useRef` import.
- **Fix**: Rewrote the file from scratch with clean imports: `import { useEffect, useRef } from 'react'`. Moved all ScrollTrigger config inside `useEffect`.

### Error 2: Spine dot stuck on panel 1
- **Cause**: `ScrollTrigger.refresh()` was called with a 150ms delay, but the DOM layout hadn't settled yet (Spline 3D in the hero above takes ~500ms to load, shifting layout calculations).
- **Fix**: Increased delay to `setTimeout(() => ScrollTrigger.refresh(), 800)`. Added `ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true })` to prevent spurious recalculations.

### Error 3: Section header invisible (`opacity: 0`)
- **Cause**: GSAP context was scoped to `sectionRef` which only wrapped the grid `<section>`, but the `.s-header` div was rendered as a sibling outside that ref. GSAP's `fromTo` set `opacity: 0` in the `from` state but couldn't find the elements to animate them back.
- **Fix**: Wrapped both the header and the grid inside a single `<div ref={sectionRef}>` container. Changed header animation triggers to use element selectors directly (`trigger: '.s-header-label'`) with `start: 'top 90%'` for earlier firing.

### Error 4: Spine column too narrow / off-screen
- **Cause**: Grid was `gridTemplateColumns: '80px 1fr'` — too narrow for the spine + glow elements. The sticky wrapper also lacked `width: '100%'`.
- **Fix**: Changed to `gridTemplateColumns: '140px 1fr'` with `gap: '0 48px'`. Added `width: '100%'` to the sticky wrapper so the spine centers within its column.

### Error 5: Vite boilerplate in `index.css` and `App.jsx`
- **Cause**: Default Vite CSS had margin/padding rules that created unwanted spacing. `App.jsx` had leftover template code.
- **Fix**: Replaced `index.css` with a clean reset (`margin: 0; padding: 0; box-sizing: border-box; background: #080808`). Replaced `App.jsx` with a minimal render of `<HeroSection />` + `<ScrollySection />`.

---

## Changes Applied (Cumulative)

### Bug Fix 1 — Spine Dot Tracking
```diff
+ ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true })
- setTimeout(() => ScrollTrigger.refresh(), 300)
+ setTimeout(() => ScrollTrigger.refresh(), 800)
```

### Bug Fix 2 — Spine Positioning
```diff
- gridTemplateColumns: '80px 1fr'
- gap: '0 80px'
+ gridTemplateColumns: '140px 1fr'
+ gap: '0 48px'

// sticky wrapper:
+ width: '100%'
```

### Visual Enhancement 1 — Ambient Layer (Right Side)
- Added `.s-ambient` div (absolutely positioned, `width: 45%`, right-aligned, z-index 0)
- Contains: `.s-ambient-glow` (500px radial gradient, `blur(60px)`, shifts cyan↔magenta via `activateNode`)
- 3 floating geometric lines (CSS `linear-gradient` on 1px-wide divs)
- `.s-watermark` number (180px JetBrains Mono, `rgba(255,255,255,0.025)`, updates text via `activateNode`)
- `sectionRef` div given `position: 'relative'` to contain the absolute ambient layer

### Visual Enhancement 2 — Panel Hover States
- `onMouseEnter`: border brightens (cyan 0.25 / magenta 0.3), background tints, `y: -4` lift
- `onMouseLeave`: restores default border + background, `y: 0`
- All transitions via `gsap.to()` for consistency with existing animation system

### Visual Enhancement 3 — Hero-to-Section Transition
- 120px gradient div at top: `linear-gradient(180deg, rgba(8,8,8,0) 0%, #080808 100%)`
- `marginTop: '-120px'` — overlaps the bottom of the hero for seamless blending
- `pointerEvents: 'none'`, `zIndex: 2`

### Visual Enhancement 4 — Active Panel Left Border
- `activateNode` now iterates all panels and sets `borderLeftColor` + `borderLeftWidth`
- Active panel: 2px border in accent color (cyan/magenta)
- Inactive panels: 1px border in default glass color

### Visual Enhancement 5 — Pulse Ring
- `.s-pulse-ring` div next to spine dot (10px, `border: 1px solid cyan`, `opacity: 0`)
- On `activateNode`: `gsap.fromTo` scales ring from 1→3.5x with opacity fade, matching accent color
- Creates a sonar-like pulse effect on node activation

---

## Current Architecture

```
ScrollySection (div ref={sectionRef}, position: relative)
├── Hero transition gradient (120px, marginTop: -120px)
├── Section header
│   ├── .s-header-label ("CORE CAPABILITIES")
│   └── .s-header-title ("Built for every stakeholder in healthcare.")
├── .s-grid (CSS Grid: 140px | 1fr)
│   ├── LEFT: Sticky spine wrapper
│   │   ├── .s-spine-line (scrub-animated scaleY)
│   │   ├── spineGlowRef (blur glow behind dot)
│   │   ├── spineDotRef (traveling dot)
│   │   ├── .s-pulse-ring (sonar pulse)
│   │   └── .s-node × 6 (static indicator dots)
│   └── RIGHT: Panel column
│       └── .s-panel × 6 (glass cards with hover)
│           ├── .s-num (monospace number)
│           ├── .s-title (Syne heading)
│           ├── <p> (description)
│           └── .s-tag (pill tag)
└── .s-ambient (absolute, right side)
    ├── .s-ambient-glow (color-shifting radial gradient)
    ├── 3 × geometric lines
    └── .s-watermark (giant number watermark)
```

## Performance Rules (Enforced)
1. Only `.s-spine-line` uses `scrub` — everything else uses `toggleActions`
2. `will-change: transform, opacity` on `.s-panel`
3. `overwrite: 'auto'` on all spine dot/glow/node/border GSAP calls
4. `ctx.revert()` in useEffect cleanup
5. `ScrollTrigger.normalizeScroll(false)` — no scroll hijacking
6. `ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true })`
7. No heavy libraries — pure GSAP + CSS
8. `backdropFilter: 'blur(8px)'` only on panels (GPU-composited)

## Optimization Opportunities (For LLM)
- Panel hover uses inline `gsap.to()` on every mouse event — could batch or debounce
- `.s-watermark` uses `document.querySelector` — could use a ref instead
- Ambient glow `background` animation via GSAP may not GPU-accelerate (radial-gradient) — consider using `opacity` on two overlapping glows instead
- The 120px transition gradient could be a CSS pseudo-element instead of a real div
- Panel left-border animation iterates ALL panels on every `activateNode` — could track `prevIndex` and only update changed panels
- `features` array is reconstructed on every module load — could be frozen with `Object.freeze()`
- Inline styles create new objects on every render — could be extracted to `useMemo` or module-level constants
