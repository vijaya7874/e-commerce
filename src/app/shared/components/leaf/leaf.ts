import { Component, input, ChangeDetectionStrategy } from '@angular/core';

/** A single decorative leaf. Colour and size set by the caller. */
@Component({
  selector: 'app-leaf',
  template: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M32 4 C50 12 58 30 52 52 C50 58 44 60 40 58 C22 50 10 32 16 12 C18 6 26 2 32 4 Z"
        [attr.fill]="tone()" />
      <path
        d="M34 12 C30 26 28 42 30 56"
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        stroke-width="1.5" />
    </svg>
  `,
  styles: `
    :host { display: block; }
    svg { width: 100%; height: 100%; display: block; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Leaf {
  readonly tone = input('#A5D6A7');
}
