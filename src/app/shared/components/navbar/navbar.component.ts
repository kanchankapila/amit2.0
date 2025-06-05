import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AppStateService } from '../../../core/state/app.state';
import { AuthService } from '../../../core/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="toggleSidenav.emit()">
        <mat-icon>menu</mat-icon>
      </button>

      <a mat-button routerLink="/" class="brand">
        <img src="assets/stockinsights.png" alt="Stock Insights" class="brand-logo">
        <span class="brand-text">Stock Insights</span>
      </a>

      <span class="spacer"></span>

      <!-- Theme Toggle -->
      <button mat-icon-button (click)="toggleTheme()" class="theme-toggle">
        <mat-icon>{{ (isDarkTheme$ | async) ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </button>

      <!-- User Menu -->
      <ng-container *ngIf="isAuthenticated; else loginButton">
        <button mat-button [matMenuTriggerFor]="userMenu" class="user-menu">
          <mat-icon>account_circle</mat-icon>
          <span>{{ user?.name }}</span>
        </button>
        <mat-menu #userMenu="matMenu">
          <button mat-menu-item routerLink="/profile">
            <mat-icon>person</mat-icon>
            <span>Profile</span>
          </button>
          <button mat-menu-item routerLink="/settings">
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </ng-container>

      <ng-template #loginButton>
        <button mat-button routerLink="/auth/login">
          <mat-icon>login</mat-icon>
          <span>Login</span>
        </button>
      </ng-template>
    </mat-toolbar>
  `,
  styles: [`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .brand {
      text-decoration: none;
      color: inherit;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: 8px;
    }

    .brand-logo {
      height: 32px;
      width: auto;
    }

    .brand-text {
      font-size: 1.2rem;
      font-weight: 500;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .theme-toggle {
      margin-right: 8px;
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    mat-divider {
      margin: 8px 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() isAuthenticated = false;
  @Input() user: any = null;
  @Output() toggleSidenav = new EventEmitter<void>();
  isDarkTheme$: any;

  constructor(
    private appState: AppStateService,
    private authService: AuthService
  ) {
    this.isDarkTheme$ = this.appState.state$.pipe(map(state => state.theme === 'dark'));
  }

  toggleTheme(): void {
    const currentTheme = this.appState.currentState.theme;
    this.appState.setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  logout(): void {
    this.authService.logout();
  }
} 