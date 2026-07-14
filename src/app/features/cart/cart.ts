import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe, NgStyle],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  readonly cart = inject(CartService);
}
