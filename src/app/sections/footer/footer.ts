import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly year = new Date().getFullYear();

  readonly columns = [
    {
      title: 'Quick links',
      links: ['Shop', 'About farm', 'Why organic', 'Blog'],
    },
    {
      title: 'Support',
      links: ['Shipping policy', 'Returns & refunds', 'Privacy policy', 'Terms'],
    },
  ];
}
