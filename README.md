# Herbal

An Angular 20 storefront for MR Organics — six single-ingredient plant powders
and three combos, priced exactly as they are on the live shop.

```bash
npm install
npm start        # http://localhost:4200
```

## The idea

The home page is one vertical descent. A jar sits pinned at the centre of the
viewport and never moves. The six plants pass through it: as you scroll into a
chapter, the powder inside takes that plant's colour, the level rises and falls,
and the plant's name, facts, and price assemble on either side, then leave.

The jar is the only object that persists. Everything else is passing through.

Colour is drawn from the plants but held well back — moss, ochre, clay, plum,
tobacco, brick, all sitting on bone rather than white. The plant tint bleeds
into the page background at about 13% and crossfades as you move between
chapters. Nothing is saturated.

## Structure

```
src/app/
├── core/
│   ├── models/product.model.ts
│   └── services/
│       ├── product.service.ts    catalogue + exact prices
│       ├── cart.service.ts       signal store, localStorage, drawer state
│       └── scroll.service.ts     which chapter is live, how far through it
├── shared/
│   ├── directives/reveal.directive.ts   IntersectionObserver
│   └── components/
│       ├── jar/            the SVG vessel — the signature element
│       ├── nav/
│       └── cart-drawer/    the bag slides in; it never takes you off the page
└── features/
    ├── home/               the descent
    ├── shop/               a shelf of rows, not a grid of cards
    └── product-detail/
```

## Catalogue

| Product | Price | Was |
|---|---|---|
| Moringa Powder | ₹199 | — |
| Amla Powder | ₹275.54 | ₹599 |
| ABC Powder | ₹499 | ₹599 |
| Beetroot Powder | ₹249 | ₹299 |
| Ashwagandha Powder | ₹259 | ₹349 |
| Guntur Chilli Powder | ₹239 | ₹269 |
| Beetroot + ABC Combo | ₹673.50 | ₹898 |
| Complete Wellness Trio | ₹939 | ₹1,118 |
| ABC + Moringa Duo | ₹878 | ₹1,198 |

Free shipping over ₹499. Buy any two, 15% off.

## Stack

Angular 20, standalone components, signals throughout, zoneless change
detection, `@if` / `@for`, lazy routes. Separate `.ts` / `.html` / `.scss` per
component. No UI library — every style is written here.

The scroll work is a `requestAnimationFrame` loop running outside Angular,
writing to signals. Nothing reads `scrollY` directly.

## Notes

- The jar is drawn, not photographed. Real product photography would change the
  feel of this considerably and is the obvious next step.
- Checkout is a stub. No payment gateway is wired up.
- `prefers-reduced-motion` is respected — the reveals resolve instantly and the
  jar stops animating.
- Below 900px the jar stops being a centrepiece and becomes a sticky header, and
  the chapters stack into a single column.
