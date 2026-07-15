import {
  Component,
  inject,
  ElementRef,
  afterNextRender,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';

interface Floater {
  emoji: string;
  x: number;
  y: number;
  size: number;
  depth: number;
  delay: number;
}

@Component({
  selector: 'app-hero',
  imports: [MagneticDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  private readonly motion = inject(MotionService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Fresh produce drifting across the hero at different depths. */
  readonly floaters: Floater[] = [
    { emoji: '🍎', x: 8, y: 22, size: 74, depth: 30, delay: 0 },
    { emoji: '🥬', x: 84, y: 18, size: 92, depth: 60, delay: 0.4 },
    { emoji: '🥕', x: 16, y: 72, size: 66, depth: 45, delay: 0.8 },
    { emoji: '🍯', x: 78, y: 68, size: 70, depth: 25, delay: 0.2 },
    { emoji: '🌿', x: 46, y: 12, size: 58, depth: 80, delay: 0.6 },
    { emoji: '🍋', x: 90, y: 44, size: 60, depth: 40, delay: 1 },
    { emoji: '🫐', x: 6, y: 46, size: 52, depth: 55, delay: 0.3 },
  ];

  constructor() {
    afterNextRender(() => this.animate());
  }

  private animate(): void {
    const root = this.host.nativeElement;
    const gsap = this.motion.gsap;

    if (this.motion.reduced()) {
      gsap.set(root.querySelectorAll('.hero__rise'), { opacity: 1, y: 0 });
      return;
    }

    // Headline + copy rise on load.
    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .from(root.querySelectorAll('.hero__rise'), {
        y: 44,
        opacity: 0,
        duration: 1.1,
        stagger: 0.14,
        delay: 0.2,
      });

    // Each floater bobs forever, and drifts on scroll by its depth.
    root.querySelectorAll<HTMLElement>('.floater').forEach((el) => {
      const depth = Number(el.dataset['depth'] ?? 40);
      const delay = Number(el.dataset['delay'] ?? 0);

      gsap.to(el, {
        y: '+=18',
        duration: 3 + Math.random() * 1.5,
        delay,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(el, {
        yPercent: depth,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // Sunlight rays breathe.
    gsap.to(root.querySelector('.hero__rays'), {
      opacity: 0.85,
      scale: 1.08,
      duration: 6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }
}
