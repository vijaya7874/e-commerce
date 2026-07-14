import { Injectable, signal, computed, NgZone, inject, DestroyRef } from '@angular/core';

export interface Chapter {
  /** Index in the sequence. */
  i: number;
  /** Element that defines this chapter's scroll range. */
  el: HTMLElement;
}

/**
 * Drives the scroll-linked composition on the home page.
 *
 * Chapters register their host element. On every frame the service works out
 * which chapter is centred in the viewport and how far through it we are, and
 * exposes both as signals. Components read those signals; nobody reads
 * `scrollY` directly.
 */
@Injectable()
export class ScrollService {
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  private chapters: Chapter[] = [];
  private frame = 0;
  private listening = false;

  /** Index of the chapter currently holding the viewport. */
  readonly active = signal(0);

  /** 0 → 1 through the active chapter. */
  readonly progress = signal(0);

  /** Distance scrolled from the very top, in px. */
  readonly scrolled = signal(0);

  /** True once the reader has moved at all. Used to retire the scroll hint. */
  readonly moved = computed(() => this.scrolled() > 40);

  constructor() {
    this.destroyRef.onDestroy(() => this.stop());
  }

  register(el: HTMLElement, i: number): void {
    this.chapters = [...this.chapters.filter((c) => c.i !== i), { i, el }].sort(
      (a, b) => a.i - b.i
    );
    this.start();
  }

  unregister(i: number): void {
    this.chapters = this.chapters.filter((c) => c.i !== i);
    if (!this.chapters.length) {
      this.stop();
    }
  }

  private start(): void {
    if (this.listening) return;
    this.listening = true;

    // Scroll fires constantly. Keep it outside Angular and only write to
    // signals, which schedule their own change detection.
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
      this.measure();
    });
  }

  private stop(): void {
    if (!this.listening) return;
    this.listening = false;
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    cancelAnimationFrame(this.frame);
  }

  private readonly onScroll = (): void => {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.measure());
  };

  private measure(): void {
    this.scrolled.set(window.scrollY);

    if (!this.chapters.length) return;

    const mid = window.innerHeight / 2;
    let best = this.chapters[0];
    let bestDist = Infinity;

    for (const c of this.chapters) {
      const r = c.el.getBoundingClientRect();
      const centre = r.top + r.height / 2;
      const dist = Math.abs(centre - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = c;
      }
    }

    const r = best.el.getBoundingClientRect();
    const travelled = -r.top;
    const range = Math.max(1, r.height - window.innerHeight);
    const p = Math.min(1, Math.max(0, travelled / range));

    this.active.set(best.i);
    this.progress.set(p);
  }
}
