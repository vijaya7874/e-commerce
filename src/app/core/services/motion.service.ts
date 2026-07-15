import { Injectable, signal } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Thin wrapper around GSAP so components share one registration and one
 * reduced-motion check. Components ask for animations; this decides whether
 * to actually run them.
 */
@Injectable({ providedIn: 'root' })
export class MotionService {
  readonly reduced = signal(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  readonly gsap = gsap;

  /** Fade + rise as the element scrolls into view. */
  revealOnScroll(el: Element, opts: { delay?: number; y?: number } = {}): void {
    if (this.reduced()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      el,
      { opacity: 0, y: opts.y ?? 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: opts.delay ?? 0,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onComplete: () => (el as HTMLElement).classList.remove('reveal-armed'),
      }
    );
  }

  /** Stagger a group of children as their container enters. */
  revealGroup(container: Element, children: string, stagger = 0.1): void {
    const items = container.querySelectorAll(children);
    if (!items.length) return;
    if (this.reduced()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    items.forEach((el) => (el as HTMLElement).classList.add('reveal-armed'));
    gsap.fromTo(
      items,
      { opacity: 0, y: 44 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger,
        scrollTrigger: { trigger: container, start: 'top 80%', once: true },
        onComplete: () =>
          items.forEach((el) => (el as HTMLElement).classList.remove('reveal-armed')),
      }
    );
  }

  /** Slow parallax drift for background elements. */
  parallax(el: Element, distance: number): void {
    if (this.reduced()) return;
    gsap.to(el, {
      yPercent: distance,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  /** Count a number up when it enters view. */
  countUp(el: HTMLElement, to: number, suffix: string): void {
    const write = (v: number) => {
      el.textContent = Math.round(v).toLocaleString('en-IN') + suffix;
    };
    if (this.reduced()) {
      write(to);
      return;
    }
    const obj = { v: 0 };
    gsap.to(obj, {
      v: to,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => write(obj.v),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  }

  refresh(): void {
    ScrollTrigger.refresh();
  }
}
