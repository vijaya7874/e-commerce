import {
  Component,
  inject,
  ElementRef,
  afterNextRender,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { CartService } from '../../core/services/cart.service';
import { MotionService } from '../../core/services/motion.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-featured',
  imports: [DecimalPipe, RevealDirective],
  templateUrl: './featured.html',
  styleUrl: './featured.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Featured {
  private readonly data = inject(DataService);
  private readonly cart = inject(CartService);
  private readonly motion = inject(MotionService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly products = this.data.products;

  constructor() {
    afterNextRender(() => {
      this.motion.revealGroup(this.host.nativeElement.querySelector('.cards')!, '.card', 0.12);
    });
  }

  add(p: Product): void {
    this.cart.add(p);
  }

  off(p: Product): number {
    return p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
  }
}
