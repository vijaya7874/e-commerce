# Mr Organics

A premium, animated single-page site for MR Organics — organic plant powders
from Guntur. Built to a cinematic, nature-inspired brief: bright forest green
and gold, floating produce, scroll-triggered reveals, and GSAP throughout.

```bash
npm install
npm start          # http://localhost:4200
```

## What's on the page

A full single-page experience, in order:

1. **Navbar** — transparent over the hero, turns to frosted glass on scroll. Bag icon pulses when you add an item.
2. **Hero** — full-screen, floating fruit and veg drifting at different parallax depths, animated sunlight rays, a curved base, and a magnetic "Shop now" button.
3. **Featured products** — the six powders as rounded cards with badges, ratings, prices, and add-to-cart. Cards stagger in on scroll.
4. **Categories** — image tiles that lift and zoom on hover.
5. **Why organic** — five icon cards (hand-drawn SVG icons, no icon-font dependency).
6. **Farm story** — an illustrated farm scene with parallax, plus an "Our journey / farmers / promise" timeline.
7. **Testimonials** — a glass-card carousel with arrows and dots.
8. **Statistics** — counters that count up when they enter view.
9. **Newsletter** — a curved green panel with floating leaves and an email capture.
10. **Footer** — deep forest green, links, social, contact.

## Products and prices

Matched to the live MR Organics catalogue:

| Product | Price | Was |
|---|---|---|
| Moringa Powder | ₹199 | — |
| Amla Powder | ₹275.54 | ₹599 |
| ABC Powder | ₹499 | ₹599 |
| Beetroot Powder | ₹249 | ₹299 |
| Ashwagandha Powder | ₹259 | ₹349 |
| Guntur Chilli Powder | ₹239 | ₹269 |

## Stack

- **Angular 20** — standalone components, signals, zoneless change detection
- **GSAP 3 + ScrollTrigger** — all scroll animation, count-ups, parallax, and the magnetic buttons
- **SCSS** — separate `.ts` / `.html` / `.scss` per component, no CSS framework
- New control flow (`@if`, `@for`) throughout

## Animation architecture

All GSAP lives behind one `MotionService`, which registers ScrollTrigger once
and checks `prefers-reduced-motion` in a single place. Components ask for
effects (`revealOnScroll`, `revealGroup`, `parallax`, `countUp`); the service
decides whether to run them. Two directives wrap the common cases:
`appReveal` (fade + rise on scroll) and `appMagnetic` (lean toward cursor).

Reveal is **fail-safe**: elements are hidden by a JS-added class, not by CSS.
If GSAP fails to load or JS is disabled, nothing is hidden and the whole page
renders normally — no blank sections.

## Structure

```
src/app/
├── core/
│   ├── models/product.model.ts
│   └── services/
│       ├── data.service.ts       products, categories, reviews, stats, story
│       ├── cart.service.ts       signal store + localStorage + bag pulse
│       └── motion.service.ts     the one place GSAP is touched
├── shared/
│   ├── directives/
│   │   ├── reveal.directive.ts
│   │   └── magnetic.directive.ts
│   └── components/leaf/
└── sections/
    ├── navbar/  hero/  featured/  categories/  why-us/
    ├── farm-story/  testimonials/  stats/  newsletter/  footer/
```

## Notes

- Produce and the farm scene are emoji and CSS art. Real photography is the
  obvious upgrade — the card, hero, and farm-scene markup all have a clear slot
  for an `<img>`.
- Cart is add-only (count + total in the nav). No checkout or drawer in this
  build — the brief was a marketing landing page, not a store flow.
- Everything respects `prefers-reduced-motion`: reveals resolve instantly,
  parallax and bobbing stop, counters jump straight to their value.
