# HeroSection — Final Refinements + Scrollytelling

## Hero Fixes Applied

| Fix | Change |
|-----|--------|
| 1 | Heading split to THREE lines: "One Platform." / "Every Vaccine." / "Every Life." (cyan gradient on last) |
| 2 | Text block → `left: 72px`, `bottom: 22%` |
| 3 | Helix → `left: 20%`, `width: 95%` (bleeds further right) |
| 4 | Side nav → Intro, Features, How It Works, Centers, Consult |
| 5 | LOGIN hover → cyan glow `box-shadow` |
| 6 | Cyan + magenta glow blobs behind helix |

## Scrollytelling Section (NEW)

- **Layout**: CSS Grid, 2 columns — pinned helix silhouette (left), scrolling panels (right)
- **ScrollTrigger**: Panels scrub-animate in with `opacity` + `x` translation, number tags scale in with `back.out`
- **6 Feature Cards**: Glass border (`rgba(255,255,255,0.08)`), JetBrains Mono cyan numbers, Syne headings, DM Sans descriptions
- **Stitch MCP**: Generated feature panel card design for aesthetic reference

## Screenshots

````carousel
![Hero with 3-line heading and glow blobs](C:\Users\KRISH\.gemini\antigravity\brain\a5a90579-758d-4ab3-a52e-e1a4e9ce71ca\hero_section_verification_1773515362166.png)
<!-- slide -->
![Scrollytelling section with pinned helix and feature cards](C:\Users\KRISH\.gemini\antigravity\brain\a5a90579-758d-4ab3-a52e-e1a4e9ce71ca\scrolly_verification_full_1773515461385.png)
````

## Dev Server
`npm run dev` → `http://localhost:5173/`
