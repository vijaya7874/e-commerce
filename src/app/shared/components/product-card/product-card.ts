import { Component, input, output, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe, NgStyle],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly hover = output<string | null>();

  private readonly cart = inject(CartService);

  readonly discount = computed(() => {
    const p = this.product();
    return p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
  });

  addToCart(): void {
    this.cart.add(this.product());
  }
}
