import {
  Directive,
  ElementRef,
  inject,
  afterNextRender,
  DestroyRef,
  NgZone,
} from '@angular/core';
import { MotionService } from '../../core/services/motion.service';

/**
 * The element leans toward the cursor while hovered, then springs back.
 * A small premium touch on primary actions.
 */
@Directive({ selector: '[appMagnetic]' })
export class MagneticDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (this.motion.reduced()) return;

      const el = this.host.nativeElement;
      const gsap = this.motion.gsap;
      const strength = 0.35;

      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' });
      };

      const reset = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      };

      this.zone.runOutsideAngular(() => {
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseleave', reset);
      });

      this.destroyRef.onDestroy(() => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', reset);
      });
    });
  }
}
