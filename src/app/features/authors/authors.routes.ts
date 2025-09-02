import { Routes } from '@angular/router';

export const authorsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./authors-list/authors-list.component').then(m => m.AuthorsListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./author-form/author-form.component').then(m => m.AuthorFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./author-form/author-form.component').then(m => m.AuthorFormComponent)
  }
];
