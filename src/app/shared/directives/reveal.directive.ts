import {
  Directive,
  ElementRef,
  inject,
  input,
  signal,
  afterNextRender,
  DestroyRef,
} from '@angular/core';

/**
 * Adds `is-revealed` to the host the first time it enters the viewport.
 * Styling lives in CSS; this only flips the class.
 *
 *   <p appReveal [revealDelay]="120">…</p>
 */
@Directive({
  selector: '[appReveal]',
  host: {
    '[class.reveal]': 'true',
    '[class.is-revealed]': 'shown()',
    '[style.transition-delay.ms]': 'revealDelay()',
  },
})
export class RevealDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  /** Stagger, in milliseconds. */
  readonly revealDelay = input(0);

  /** How much of the element must show before it counts. */
  readonly revealAt = input(0.2);

  protected readonly shown = signal(false);

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement as HTMLElement;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        this.shown.set(true);
        return;
      }

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.shown.set(true);
            io.disconnect();
          }
        },
        { threshold: this.revealAt() }
      );

      io.observe(el);
      this.destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
