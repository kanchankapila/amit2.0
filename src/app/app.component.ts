<<<<<<< Updated upstream
import { Component, OnInit, isDevMode, HostListener } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import {
  SwPush,
  SwUpdate,
  UnrecoverableStateEvent,
  VersionEvent,
  VersionReadyEvent,
} from '@angular/service-worker';
import { PUBLIC_VAPID_KEY_OF_SERVER } from './app.constants';
import { NotificationService } from './notifications.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
 
})
export class AppComponent implements OnInit {
  notificationData = '{}';
  title = 'demo1';
  public getScreenWidth:number;
  public getScreenHeight: number;
  showSidebar = true;
  showNavbar = true;
  isLoading: boolean;
  constructor(private router: Router, private updateService: SwUpdate,
    private pushService: SwPush, private notificationService: NotificationService) {
    // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if ((event['url'] == '/user-pages/login') || (event['url'] == '/user-pages/register') || (event['url'] == '/error-pages/404') || (event['url'] == '/error-pages/500')) {
          this.showSidebar = false;
          this.showNavbar = false;
          document.querySelector('.main-panel').classList.add('w-100');
          document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
          document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg',);
          document.querySelector('.content-wrapper').classList.remove('auth', 'lock-full-bg');
          if ((event['url'] == '/error-pages/404') || (event['url'] == '/error-pages/500')) {
            document.querySelector('.content-wrapper').classList.add('p-0');
          }
        } else {
          this.showSidebar = true;
          this.showNavbar = true;
          document.querySelector('.main-panel').classList.remove('w-100');
          document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
          document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg');
          document.querySelector('.content-wrapper').classList.remove('p-0');
        }
      }
    });
    // Spinner for lazyload modules
    router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });
  }
  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
    // Scroll to top after route change
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    console.log('AppComponent.ngOnInit');
    if (!this.updateService.isEnabled) {
      console.log('AppComponent.ngOnInit: Service Worker is not enabled');
      return;
    }
    console.log('AppComponent.ngOnInit: Service Worker is enabled');
    this.handleUpdates();
    this.handleNotifications();
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }
  unsubscribe() {
    this.pushService.unsubscribe().then(() => {
      console.log('Unsubscribed');
    });
  }
  sendNotification() {
    this.notificationService.notifications(this.notificationData);
  }
  handleUpdates() {
    this.updateService.versionUpdates.subscribe((event: VersionEvent) => {
      console.log(event);
      alert(event.type);
      if (
        event.type === 'VERSION_READY' &&
        confirm(
          `New version ${(event as VersionReadyEvent).latestVersion.hash
          } available. Load New Version?`
        )
      ) {
        window.location.reload();
      }
    });
    // const interval = setInterval(async () => {
    //   const shouldUpdate = await this.updateService.checkForUpdate();
    //   alert('Checked for update with result: ' + shouldUpdate);
    //   if (shouldUpdate) {
    //     const result = await this.updateService.activateUpdate();
    //     alert('Activate Update completed with result: ' + result);
    //     clearInterval(interval);
    //   }
    // }, 1000);
    this.updateService.unrecoverable.subscribe(
      (event: UnrecoverableStateEvent) => {
        alert('Error reason : ' + event.reason);
      }
    );
  }
  async handleNotifications() {
    try {
      const sub = await this.pushService.requestSubscription({
        serverPublicKey: PUBLIC_VAPID_KEY_OF_SERVER,
      });
      this.notificationService.addSubscription(sub);
      console.log('Subscribed');
    } catch (err) {
      console.error('Could not subscribe due to:', err);
    }
    this.pushService.messages.subscribe((message) => {
      console.log(message);
    });
    this.pushService.notificationClicks.subscribe((message) => {
      console.log(message);
    });
    this.pushService.subscription.subscribe((subscription) => {
      console.log(subscription);
    });
  }
=======
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
>>>>>>> Stashed changes
}
