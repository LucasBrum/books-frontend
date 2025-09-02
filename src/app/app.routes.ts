import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'books',
    canActivate: [authGuard],
    loadChildren: () => import('./features/books/books.routes').then(m => m.booksRoutes)
  },
  {
    path: 'authors',
    canActivate: [authGuard],
    loadChildren: () => import('./features/authors/authors.routes').then(m => m.authorsRoutes)
  },
  {
    path: 'genres',
    canActivate: [authGuard],
    loadChildren: () => import('./features/genres/genres.routes').then(m => m.genresRoutes)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
