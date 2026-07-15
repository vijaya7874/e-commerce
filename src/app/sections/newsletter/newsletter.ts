import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';

@Component({
  selector: 'app-newsletter',
  imports: [RevealDirective, MagneticDirective],
  templateUrl: './newsletter.html',
  styleUrl: './newsletter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Newsletter {
  readonly email = signal('');
  readonly done = signal(false);

  submit(): void {
    if (this.email().includes('@')) {
      this.done.set(true);
    }
  }
}
