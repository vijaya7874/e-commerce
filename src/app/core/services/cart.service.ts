import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../models/product.model';

interface Line {
  product: Product;
  qty: number;
}

const KEY = 'organic_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _lines = signal<Line[]>(this.load());

  readonly lines = this._lines.asReadonly();
  readonly count = computed(() => this._lines().reduce((n, l) => n + l.qty, 0));
  readonly total = computed(() =>
    this._lines().reduce((n, l) => n + l.product.price * l.qty, 0)
  );

  /** Fires a pulse on the nav bag when something is added. */
  readonly justAdded = signal(0);

  /** Whether the mini-cart drawer is open. */
  readonly open = signal(false);

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(KEY, JSON.stringify(this._lines()));
      } catch {
        // Storage blocked; cart lives for this session only.
      }
    });
  }

  add(product: Product): void {
    this._lines.update((lines) => {
      const hit = lines.find((l) => l.product.id === product.id);
      return hit
        ? lines.map((l) => (l.product.id === product.id ? { ...l, qty: l.qty + 1 } : l))
        : [...lines, { product, qty: 1 }];
    });
    this.justAdded.update((n) => n + 1);
  }

  remove(id: string): void {
    this._lines.update((lines) => lines.filter((l) => l.product.id !== id));
  }

  setQty(id: string, qty: number): void {
    if (qty < 1) {
      this.remove(id);
      return;
    }
    this._lines.update((lines) =>
      lines.map((l) => (l.product.id === id ? { ...l, qty } : l))
    );
  }

  private load(): Line[] {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as Line[]) : [];
    } catch {
      return [];
    }
  }
}
