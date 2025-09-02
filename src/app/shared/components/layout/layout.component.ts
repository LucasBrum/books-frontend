import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectCurrentUser, selectIsAuthenticated } from '../../../store/auth';
import { logout } from '../../../store/auth';
import { User } from '../../../core/models';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  currentUser$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;
  
  menuItems = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Livros', route: '/books' },
    { label: 'Autores', route: '/authors' },
    { label: 'Gêneros', route: '/genres' }
  ];

  constructor(private store: Store) {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  ngOnInit(): void {}

  logout(): void {
    this.store.dispatch(logout());
  }
}
