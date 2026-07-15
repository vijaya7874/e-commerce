import {
  Component,
  inject,
  ElementRef,
  afterNextRender,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { MotionService } from '../../core/services/motion.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Stats {
  private readonly motion = inject(MotionService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly stats = inject(DataService).stats;

  constructor() {
    afterNextRender(() => {
      const nums = this.host.nativeElement.querySelectorAll<HTMLElement>('.stat__num');
      const data = this.stats();
      nums.forEach((el, i) => this.motion.countUp(el, data[i].value, data[i].suffix));
    });
  }
}
