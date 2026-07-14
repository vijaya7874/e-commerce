import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';

/**
 * A glass jar, drawn. The powder inside rises with `fill` and takes the
 * colour of whatever plant is currently on screen.
 *
 * This is the one object that persists across the whole scroll. Everything
 * else assembles around it and leaves.
 */
@Component({
  selector: 'app-jar',
  templateUrl: './jar.html',
  styleUrl: './jar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Jar {
  /** Powder colour. */
  readonly hue = input.required<string>();

  /** Shadow tone inside the powder. */
  readonly deep = input.required<string>();

  /** 0 → 1. How full the jar is. */
  readonly fill = input(0.62);

  /** Unique suffix so multiple jars don't share SVG defs ids. */
  readonly key = input('a');

  /** Interior of the glass, in SVG units. */
  private readonly TOP = 96;
  private readonly BOTTOM = 300;

  /** Y coordinate of the powder surface. */
  readonly surfaceY = computed(() => {
    const f = Math.min(1, Math.max(0, this.fill()));
    return this.BOTTOM - (this.BOTTOM - this.TOP) * f;
  });

  readonly powderHeight = computed(() => this.BOTTOM - this.surfaceY());

  /** Spoken description, since the jar carries meaning. */
  readonly label = computed(() => {
    const pct = Math.round(Math.min(1, Math.max(0, this.fill())) * 100);
    return `A jar, about ${pct} percent full`;
  });

  readonly clipId = computed(() => `jar-clip-${this.key()}`);
  readonly glassId = computed(() => `jar-glass-${this.key()}`);
  readonly grainId = computed(() => `jar-grain-${this.key()}`);
}
