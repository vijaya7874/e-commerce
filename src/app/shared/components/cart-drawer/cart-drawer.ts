import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe, NgStyle } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { Jar } from '../jar/jar';

/**
 * The bag slides in from the side rather than taking you to a page.
 * Leaving the scroll to check your bag would break the descent.
 */
@Component({
  selector: 'app-cart-drawer',
  imports: [DecimalPipe, NgStyle, Jar],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDrawer {
  readonly cart = inject(CartService);

  close(): void {
    this.cart.open.set(false);
  }
}
