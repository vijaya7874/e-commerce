import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './shared/components/nav/nav';
import { CartDrawer } from './shared/components/cart-drawer/cart-drawer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, CartDrawer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly year = new Date().getFullYear();
}
