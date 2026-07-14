import {
  Component,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe, NgStyle } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Jar } from '../../shared/components/jar/jar';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, DecimalPipe, NgStyle, Jar, RevealDirective],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly products = inject(ProductService);
  private readonly cart = inject(CartService);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')),
    { initialValue: '' }
  );

  readonly product = computed(() => this.products.bySlug(this.slug()));

  readonly qty = signal(1);

  readonly lineTotal = computed(() => (this.product()?.price ?? 0) * this.qty());

  readonly rest = computed(() => {
    const here = this.product();
    return this.products
      .all()
      .filter((p) => p.id !== here?.id && p.kind === 'single')
      .slice(0, 4);
  });

  more(): void {
    this.qty.update((q) => Math.min(20, q + 1));
  }

  fewer(): void {
    this.qty.update((q) => Math.max(1, q - 1));
  }

  add(p: Product): void {
    this.cart.add(p, this.qty());
    this.qty.set(1);
  }
}
