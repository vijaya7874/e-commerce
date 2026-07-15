import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-why-us',
  imports: [RevealDirective],
  templateUrl: './why-us.html',
  styleUrl: './why-us.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyUs {
  readonly perks = inject(DataService).perks;

  /** Inline SVG path picker so we do not depend on an icon font. */
  path(icon: string): string {
    const p: Record<string, string> = {
      leaf: 'M4 20c0-8 6-14 16-14 0 10-6 16-16 14Zm3-3c4-6 8-8 10-9',
      sun: 'M12 4v2m0 12v2M4 12h2m12 0h2M6 6l1.5 1.5M16.5 16.5 18 18M18 6l-1.5 1.5M7.5 16.5 6 18M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z',
      globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 0c-3 3-3 15 0 18m0-18c3 3 3 15 0 18M3.5 9h17M3.5 15h17',
      drop: 'M12 3c4 5 6 8 6 11a6 6 0 1 1-12 0c0-3 2-6 6-11Z',
      truck: 'M3 7h11v8H3V7Zm11 3h4l3 3v2h-7v-5ZM7 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
    };
    return p[icon] ?? p['leaf'];
  }
}
