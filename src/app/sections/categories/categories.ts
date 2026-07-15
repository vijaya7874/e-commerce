import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-categories',
  imports: [RevealDirective],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Categories {
  readonly categories = inject(DataService).categories;
}
