export interface Product {
  id: string;
  slug: string;
  /** Short name used in the scroll chapters. */
  name: string;
  /** Full listing title, as it appears on the shelf. */
  title: string;
  /** One line, spoken plainly. */
  line: string;
  price: number;
  /** Regular price. Equal to `price` when the item is not discounted. */
  mrp: number;
  weight: string;
  /** Desaturated plant tone. Drives the chapter background. */
  hue: string;
  /** Deeper tone of the same plant, for the powder body. */
  deep: string;
  kind: 'single' | 'combo';
  /** Botanical or common name, set in the caption face. */
  latin: string;
  facts: { k: string; v: string }[];
  use: string;
  origin: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}
