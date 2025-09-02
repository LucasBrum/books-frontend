import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from './core/services';
import { loadUserFromStorage } from './store/auth';
import { LayoutComponent } from './shared/components/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'books-frontend';

  constructor(
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Load user from localStorage if exists
    const user = this.authService.getCurrentUser();
    if (user) {
      this.store.dispatch(loadUserFromStorage({ user }));
    }
  }
}
