import {
  Component,
  inject,
  computed,
  ElementRef,
  viewChildren,
  afterNextRender,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe, NgStyle } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { ScrollService } from '../../core/services/scroll.service';
import { Jar } from '../../shared/components/jar/jar';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DecimalPipe, NgStyle, Jar, RevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  providers: [ScrollService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly products = inject(ProductService);
  private readonly cart = inject(CartService);
  protected readonly scroll = inject(ScrollService);

  /** The six single-plant products, in the order you meet them. */
  readonly chapters = this.products.singles();

  readonly combos = this.products.combos();

  private readonly sections = viewChildren<ElementRef<HTMLElement>>('chapter');

  /** The plant currently holding the screen. */
  readonly current = computed<Product>(() => {
    const i = Math.min(this.scroll.active(), this.chapters.length - 1);
    return this.chapters[i];
  });

  /**
   * The jar fills as you descend through a chapter, empties as you leave it.
   * A slow breath rather than a sawtooth.
   */
  readonly fill = computed(() => {
    const p = this.scroll.progress();
    return 0.24 + Math.sin(p * Math.PI) * 0.58;
  });

  /** Nudges the jar sideways so it drifts rather than sits. */
  readonly drift = computed(() => (this.scroll.progress() - 0.5) * 26);

  readonly counter = computed(() => {
    const n = this.scroll.active() + 1;
    return String(Math.min(n, this.chapters.length)).padStart(2, '0');
  });

  readonly totalChapters = computed(() =>
    String(this.chapters.length).padStart(2, '0')
  );

  constructor() {
    afterNextRender(() => {
      this.sections().forEach((ref, i) => this.scroll.register(ref.nativeElement, i));
    });
  }

  addToCart(p: Product): void {
    this.cart.add(p);
  }
}
