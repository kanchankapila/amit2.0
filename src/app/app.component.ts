
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  template: `
    <mat-sidenav-container class="app-container">
      <mat-sidenav #sidenav mode="side" opened class="app-sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="/nifty" routerLinkActive="active">
            <mat-icon matListItemIcon>trending_up</mat-icon>
            <span matListItemTitle>NIFTY 50</span>
          </a>
          <a mat-list-item routerLink="/banknifty" routerLinkActive="active">
            <mat-icon matListItemIcon>account_balance</mat-icon>
            <span matListItemTitle>BANK NIFTY</span>
          </a>
          <a mat-list-item routerLink="/pharmanifty" routerLinkActive="active">
            <mat-icon matListItemIcon>local_hospital</mat-icon>
            <span matListItemTitle>PHARMA NIFTY</span>
          </a>
          <a mat-list-item routerLink="/screener" routerLinkActive="active">
            <mat-icon matListItemIcon>filter_list</mat-icon>
            <span matListItemTitle>Screener</span>
          </a>
          <a mat-list-item routerLink="/analytics" routerLinkActive="active">
            <mat-icon matListItemIcon>analytics</mat-icon>
            <span matListItemTitle>Analytics</span>
          </a>
          <a mat-list-item routerLink="/sectors" routerLinkActive="active">
            <mat-icon matListItemIcon>pie_chart</mat-icon>
            <span matListItemTitle>Sectors</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>Stock Insights</span>
          <span class="toolbar-spacer"></span>
          <button mat-icon-button>
            <mat-icon>settings</mat-icon>
          </button>
        </mat-toolbar>

        <mat-progress-bar *ngIf="isLoading$ | async" mode="indeterminate" class="loading-bar">
        </mat-progress-bar>

        <main class="app-content">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .app-container {
      height: 100vh;
    }

    .app-sidenav {
      width: 250px;
      border-right: 1px solid rgba(0, 0, 0, 0.12);
    }

    .toolbar-spacer {
      flex: 1 1 auto;
    }

    .loading-bar {
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .app-content {
      padding: 16px;
      height: calc(100vh - 64px);
      overflow: auto;
    }

    .active {
      background: rgba(0, 0, 0, 0.04);
    }

    :host-context(.dark-theme) {
      .app-sidenav {
        border-right-color: rgba(255, 255, 255, 0.12);
      }

      .active {
        background: rgba(255, 255, 255, 0.04);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly loadingService = inject(LoadingService);
  readonly isLoading$ = this.loadingService.isLoading$;
}
