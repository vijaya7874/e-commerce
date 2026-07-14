import { Injectable, signal, computed, effect } from '@angular/core';
import { Product, CartItem } from '../models/product.model';

const KEY = 'herbal_cart';
const FREE_SHIP_AT = 499;
const FLAT_SHIPPING = 49;

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>(this.load());

  /** Drawer open/closed. The cart is a panel, not a page. */
  readonly open = signal(false);

  readonly items = this._items.asReadonly();

  readonly count = computed(() => this._items().reduce((n, i) => n + i.qty, 0));

  readonly subtotal = computed(() =>
    this._items().reduce((n, i) => n + i.product.price * i.qty, 0)
  );

  readonly savings = computed(() =>
    this._items().reduce((n, i) => n + (i.product.mrp - i.product.price) * i.qty, 0)
  );

  readonly shipping = computed(() => {
    const s = this.subtotal();
    return s === 0 || s >= FREE_SHIP_AT ? 0 : FLAT_SHIPPING;
  });

  readonly total = computed(() => this.subtotal() + this.shipping());

  readonly toFreeShipping = computed(() => Math.max(0, FREE_SHIP_AT - this.subtotal()));

  readonly shippingProgress = computed(() =>
    Math.min(100, (this.subtotal() / FREE_SHIP_AT) * 100)
  );

  constructor() {
    effect(() => {
      const snapshot = this._items();
      try {
        localStorage.setItem(KEY, JSON.stringify(snapshot));
      } catch {
        // Storage blocked. The cart still works for this session.
      }
    });
  }

  add(product: Product, qty = 1): void {
    this._items.update((items) => {
      const found = items.find((i) => i.product.id === product.id);
      return found
        ? items.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + qty } : i))
        : [...items, { product, qty }];
    });
    this.open.set(true);
  }

  setQty(id: string, qty: number): void {
    if (qty <= 0) {
      this.remove(id);
      return;
    }
    this._items.update((items) => items.map((i) => (i.product.id === id ? { ...i, qty } : i)));
  }

  remove(id: string): void {
    this._items.update((items) => items.filter((i) => i.product.id !== id));
  }

  clear(): void {
    this._items.set([]);
  }

  private load(): CartItem[] {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }
}
