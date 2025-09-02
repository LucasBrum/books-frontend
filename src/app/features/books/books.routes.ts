import { Routes } from '@angular/router';

export const booksRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./books-list/books-list.component').then(m => m.BooksListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./book-form/book-form.component').then(m => m.BookFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./book-form/book-form.component').then(m => m.BookFormComponent)
  }
];
