import { Directive, ElementRef, inject, input, afterNextRender } from '@angular/core';
import { MotionService } from '../../core/services/motion.service';

/**
 * Drop-in scroll reveal. Wraps MotionService so templates stay declarative:
 *
 *   <div appReveal [revealDelay]="0.2">…</div>
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);

  readonly revealDelay = input(0);
  readonly revealY = input(40);

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement;
      // Hide only now that we know JS runs. If GSAP is unavailable, the
      // element was never hidden and simply stays visible.
      if (!this.motion.reduced()) {
        el.classList.add('reveal-armed');
      }
      this.motion.revealOnScroll(el, {
        delay: this.revealDelay(),
        y: this.revealY(),
      });
    });
  }
}
