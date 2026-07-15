import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-testimonials',
  imports: [RevealDirective],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Testimonials {
  readonly items = inject(DataService).testimonials;
  readonly active = signal(0);

  go(i: number): void {
    const n = this.items().length;
    this.active.set((i + n) % n);
  }

  next(): void {
    this.go(this.active() + 1);
  }

  prev(): void {
    this.go(this.active() - 1);
  }

  star(n: number): string {
    return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
  }
}
