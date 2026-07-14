import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

/**
 * Catalogue and pricing taken from the MR Organics shop.
 * Prices are in INR. `mrp` equals `price` where nothing is discounted.
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly _all = signal<Product[]>([
    {
      id: 'moringa',
      slug: 'moringa-powder',
      name: 'Moringa',
      title: 'Moringa Powder 100g / 200g — Pure & Natural Miracle Tree Superfood',
      line: 'The leaf that grows where little else will.',
      price: 199,
      mrp: 199,
      weight: '100g / 200g',
      hue: '#6E8C6A',
      deep: '#3F5540',
      kind: 'single',
      latin: 'Moringa oleifera',
      facts: [
        { k: 'Part used', v: 'Leaf' },
        { k: 'Dried at', v: 'Below 45°C' },
        { k: 'Ingredients', v: 'One' },
      ],
      use: 'A teaspoon into water, buttermilk, or a smoothie. Morning suits it best.',
      origin:
        'Moringa asks for almost nothing — poor soil, little water — and gives back a leaf dense with iron. Dried low so the green survives the process.',
    },
    {
      id: 'amla',
      slug: 'amla-powder',
      name: 'Amla',
      title: 'Amla Powder — 200g — Pure & Natural Indian Gooseberry',
      line: 'Sour on purpose. That is the whole point of it.',
      price: 275.54,
      mrp: 599,
      weight: '200g',
      hue: '#B8975A',
      deep: '#7A6134',
      kind: 'single',
      latin: 'Phyllanthus emblica',
      facts: [
        { k: 'Part used', v: 'Whole fruit' },
        { k: 'Dried by', v: 'Sun' },
        { k: 'Sweetened', v: 'Never' },
      ],
      use: 'Half a teaspoon in warm water, before food. It will pucker your mouth.',
      origin:
        'Picked at peak tartness, dried whole with the stone removed, then milled. Nothing is added to soften what it does to your tongue.',
    },
    {
      id: 'abc',
      slug: 'abc-powder',
      name: 'ABC',
      title: 'ABC Powder (Apple, Beetroot & Carrot) — 200g — Pure & Natural Superfood Mix',
      line: 'Apple, beetroot, carrot. The juice bar, dehydrated.',
      price: 499,
      mrp: 599,
      weight: '200g',
      hue: '#C08056',
      deep: '#84502F',
      kind: 'single',
      latin: 'Malus · Beta · Daucus',
      facts: [
        { k: 'Plants', v: 'Three' },
        { k: 'Added sugar', v: 'None' },
        { k: 'Tastes like', v: 'Juice' },
      ],
      use: 'Two teaspoons blended into water or milk. Sweet enough that nobody argues.',
      origin:
        'The three that every juice stall in the country puts through the same machine. We dry them instead, so you can drink it in January.',
    },
    {
      id: 'beetroot',
      slug: 'beetroot-powder',
      name: 'Beetroot',
      title: 'Beetroot Powder 200g — 100% Natural Dehydrated Beetroot Powder',
      line: 'It stains the spoon, the cup, and your fingers.',
      price: 249,
      mrp: 299,
      weight: '200g',
      hue: '#96628A',
      deep: '#5E3A57',
      kind: 'single',
      latin: 'Beta vulgaris',
      facts: [
        { k: 'Part used', v: 'Whole root' },
        { k: 'Skin', v: 'Left on' },
        { k: 'Colour added', v: 'None' },
      ],
      use: 'A teaspoon before you move. Or into dough, if you want pink rotis.',
      origin:
        'Whole beets, skin on, dried until they snap when you break them. The colour you see is the beet. There is nothing else in the jar.',
    },
    {
      id: 'ashwagandha',
      slug: 'ashwagandha-powder',
      name: 'Ashwagandha',
      title: 'Ashwagandha Powder 170g — Pure Ashwagandha Root Powder — No Additive',
      line: 'Root only. No leaf, no stalk, no filler.',
      price: 259,
      mrp: 349,
      weight: '170g',
      hue: '#8D7256',
      deep: '#57452F',
      kind: 'single',
      latin: 'Withania somnifera',
      facts: [
        { k: 'Part used', v: 'Root' },
        { k: 'Leaf content', v: 'Zero' },
        { k: 'Give it', v: 'Three weeks' },
      ],
      use: 'Half a teaspoon in warm milk, at night. It works slowly or not at all.',
      origin:
        'Roots pulled once the plant has finished its work. Washed, dried, milled. Cheaper powders bulk this out with leaf. This one does not.',
    },
    {
      id: 'chilli',
      slug: 'guntur-chilli-powder',
      name: 'Guntur Chilli',
      title: 'Guntur Chilli Powder 400g',
      line: 'The heat this district built an economy on.',
      price: 239,
      mrp: 269,
      weight: '400g',
      hue: '#A85C58',
      deep: '#6D3230',
      kind: 'single',
      latin: 'Capsicum annuum',
      facts: [
        { k: 'Grown in', v: 'Guntur' },
        { k: 'Dried by', v: 'Sun' },
        { k: 'Colour added', v: 'None' },
      ],
      use: 'Wherever chilli powder already goes. Start with less than you think.',
      origin:
        'From the fields around Guntur, where chilli is not an ingredient but a livelihood. The red is the chilli. Nobody dyed it.',
    },

    // ---- Combos ----
    {
      id: 'combo-beet-abc',
      slug: 'beetroot-abc-combo',
      name: 'Beetroot + ABC',
      title: 'Beetroot + ABC Powder Combo — 200g Each',
      line: 'The two people always order together.',
      price: 673.5,
      mrp: 898,
      weight: '200g each',
      hue: '#9A6B72',
      deep: '#61414A',
      kind: 'combo',
      latin: 'Two jars',
      facts: [
        { k: 'Jars', v: 'Two' },
        { k: 'You save', v: '₹224.50' },
        { k: 'Shipping', v: 'Free' },
      ],
      use: 'Beetroot before you move. ABC when you skip a meal.',
      origin: 'We kept getting asked for both, so we stopped separating them.',
    },
    {
      id: 'combo-trio',
      slug: 'wellness-trio',
      name: 'Wellness Trio',
      title: 'Complete Wellness Trio — Moringa + Amla + Ashwagandha (200g Each)',
      line: 'Morning, midday, night. A whole day covered.',
      price: 939,
      mrp: 1118,
      weight: '200g each',
      hue: '#7F8A6E',
      deep: '#4C5442',
      kind: 'combo',
      latin: 'Three jars',
      facts: [
        { k: 'Jars', v: 'Three' },
        { k: 'You save', v: '₹179' },
        { k: 'Shipping', v: 'Free' },
      ],
      use: 'Moringa at sunrise. Amla mid-morning. Ashwagandha before bed.',
      origin: 'The three that cover the most ground. If you buy one thing, buy this.',
    },
    {
      id: 'combo-abc-moringa',
      slug: 'abc-moringa-duo',
      name: 'ABC + Moringa',
      title: 'ABC + Moringa Power Duo',
      line: 'For anyone who wants moringa but has met moringa.',
      price: 878,
      mrp: 1198,
      weight: '200g each',
      hue: '#88866B',
      deep: '#525140',
      kind: 'combo',
      latin: 'Two jars',
      facts: [
        { k: 'Jars', v: 'Two' },
        { k: 'You save', v: '₹320' },
        { k: 'Shipping', v: 'Free' },
      ],
      use: 'Half a spoon of each, one glass. The ABC carries the moringa.',
      origin: 'Moringa is good for you and tastes like it. This is the fix.',
    },
  ]);

  readonly all = this._all.asReadonly();
  readonly singles = computed(() => this._all().filter((p) => p.kind === 'single'));
  readonly combos = computed(() => this._all().filter((p) => p.kind === 'combo'));

  bySlug(slug: string): Product | undefined {
    return this._all().find((p) => p.slug === slug);
  }
}
