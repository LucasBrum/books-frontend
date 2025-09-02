import { Routes } from '@angular/router';

export const genresRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./genres-list/genres-list.component').then(m => m.GenresListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./genre-form/genre-form.component').then(m => m.GenreFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./genre-form/genre-form.component').then(m => m.GenreFormComponent)
  }
];
