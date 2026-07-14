import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'Herbal — Six plants, ground down to powder',
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop').then((m) => m.Shop),
    title: 'The shelf — Herbal',
  },
  {
    path: 'product/:slug',
    loadComponent: () =>
      import('./features/product-detail/product-detail').then((m) => m.ProductDetail),
  },
  { path: '**', redirectTo: '' },
];
