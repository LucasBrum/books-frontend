import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { loadBooks, selectBooksPagination } from '../../store/books';
import { loadAuthors, selectAuthorsPagination } from '../../store/authors';
import { loadGenres, selectGenresPagination } from '../../store/genres';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  booksPagination$: Observable<any>;
  authorsPagination$: Observable<any>;
  genresPagination$: Observable<any>;

  dashboardCards = [
    {
      title: 'Livros',
      icon: 'book',
      route: '/books',
      color: '#3f51b5',
      description: 'Gerencie sua biblioteca'
    },
    {
      title: 'Autores',
      icon: 'person',
      route: '/authors',
      color: '#4caf50',
      description: 'Cadastre e edite autores'
    },
    {
      title: 'Gêneros',
      icon: 'category',
      route: '/genres',
      color: '#ff9800',
      description: 'Organize por categorias'
    }
  ];

  constructor(private store: Store) {
    this.booksPagination$ = this.store.select(selectBooksPagination);
    this.authorsPagination$ = this.store.select(selectAuthorsPagination);
    this.genresPagination$ = this.store.select(selectGenresPagination);
  }

  ngOnInit(): void {
    // Load initial data for statistics
    this.store.dispatch(loadBooks({ page: 0, size: 1 }));
    this.store.dispatch(loadAuthors({ page: 0, size: 1 }));
    this.store.dispatch(loadGenres({ page: 0, size: 1 }));
  }
}
