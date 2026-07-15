import {
  Component,
  inject,
  signal,
  effect,
  afterNextRender,
  DestroyRef,
  NgZone,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  readonly cart = inject(CartService);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  readonly solid = signal(false);
  readonly menuOpen = signal(false);
  readonly bagPulse = signal(false);

  readonly links = [
    { label: 'Home', href: '#top' },
    { label: 'Products', href: '#products' },
    { label: 'Categories', href: '#categories' },
    { label: 'About Farm', href: '#farm' },
    { label: 'Why Organic', href: '#why' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#footer' },
  ];

  constructor() {
    // Pulse the bag whenever the cart count ticks up.
    effect(() => {
      this.cart.justAdded();
      this.bagPulse.set(true);
      setTimeout(() => this.bagPulse.set(false), 600);
    });

    afterNextRender(() => {
      const onScroll = () => this.solid.set(window.scrollY > 40);
      onScroll();
      this.zone.runOutsideAngular(() => {
        window.addEventListener('scroll', onScroll, { passive: true });
      });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  toggle(): void {
    this.menuOpen.update((v) => !v);
  }

  close(): void {
    this.menuOpen.set(false);
  }
}
