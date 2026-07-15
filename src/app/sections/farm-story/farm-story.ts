import {
  Component,
  inject,
  ElementRef,
  afterNextRender,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { MotionService } from '../../core/services/motion.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-farm-story',
  imports: [RevealDirective],
  templateUrl: './farm-story.html',
  styleUrl: './farm-story.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FarmStory {
  private readonly motion = inject(MotionService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly milestones = inject(DataService).milestones;

  constructor() {
    afterNextRender(() => {
      const img = this.host.nativeElement.querySelector('.story__scene');
      if (img) this.motion.parallax(img, 12);
    });
  }
}
