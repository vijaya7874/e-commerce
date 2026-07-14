import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe, NgStyle } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Jar } from '../../shared/components/jar/jar';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Product } from '../../core/models/product.model';

type Cut = 'all' | 'single' | 'combo';

@Component({
  selector: 'app-shop',
  imports: [RouterLink, DecimalPipe, NgStyle, Jar, RevealDirective],
  templateUrl: './shop.html',
  styleUrl: './shop.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shop {
  private readonly products = inject(ProductService);
  private readonly cart = inject(CartService);

  readonly cut = signal<Cut>('all');

  readonly cuts: { id: Cut; label: string }[] = [
    { id: 'all', label: 'Everything' },
    { id: 'single', label: 'One plant' },
    { id: 'combo', label: 'Boxed' },
  ];

  readonly shown = computed(() => {
    const c = this.cut();
    return c === 'all' ? this.products.all() : this.products.all().filter((p) => p.kind === c);
  });

  add(p: Product): void {
    this.cart.add(p);
  }
}
