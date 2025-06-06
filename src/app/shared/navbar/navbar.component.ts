
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AppStateService } from '../../core/state/app.state';
import { AuthService } from '../../core/services/auth.service';
import { map } from 'rxjs/operators';
import { inject } from '@angular/core';

// PrimeNG Imports
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';


export interface pcrnseniftytile {
  text1: number;
}

export interface ttmmitiles {
  text1: any;
}

export interface mcniftyrttiles {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
}

export interface mcpniftyrttiles {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
}

export interface mcbniftyrttiles {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
}

export interface newscardtile {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
}

@Component({
  selector: 'app-navbar',

  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    DropdownModule,
    ButtonModule,
    SidebarModule,
    CardModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NavbarComponent {
  @Input() isAuthenticated = false;
  @Input() user: any = null;
  @Output() toggleSidenav = new EventEmitter<void>();

  isDarkTheme$ = inject(AppStateService).state$.pipe(map(state => state.theme === 'dark'));
  private appState = inject(AppStateService);
  private authService = inject(AuthService);

  // Dropdown properties
  items: any[] = [];
  item: any;

  // Sidebar visibility states
  visibleSidebar1: boolean = false;
  visibleSidebar2: boolean = false;
  visibleSidebar3: boolean = false;
  visibleSidebar4: boolean = false;
  visibleSidebar5: boolean = false;

  // Market data properties
  mcniftyrt: mcniftyrttiles[] = [];
  mcbniftyrt: mcbniftyrttiles[] = [];

  mcpniftyrt: mcpniftyrttiles[] = [];
  newscard: newscardtile[] = [];
  ttmmi: ttmmitiles[] = [];
  pcrnsenifty1: string = '';
  pcrnsebnifty1: string = '';
  tlniftybuildup: string = '';
  tlniftybuildup5: string = '';
  tlbniftybuildup: string = '';

  toggleTheme(): void {
    const currentTheme = this.appState.currentState.theme;
    this.appState.setTheme(currentTheme === 'light' ? 'dark' : 'light');

  }

  logout(): void {
    this.authService.logout();
  }

  // Navigation methods
  navigateanalytics(): void {
    // TODO: Implement navigation
  }

  navigateinsights(): void {
    // TODO: Implement navigation
  }

  navigatescreeners(): void {
    // TODO: Implement navigation
  }

  navigatenifty(): void {
    // TODO: Implement navigation
  }

  navigatebanknifty(): void {
    // TODO: Implement navigation
  }

  navigatepnifty(): void {
    // TODO: Implement navigation
  }

  // Event handlers
  selectEvent(item: any): void {
    // TODO: Implement selection handling
  }

  // Track by functions for ngFor
  trackByFunctionmcniftyrt(index: number): number {
    return index;
  }

  trackByFunctionmcbniftyrt(index: number): number {
    return index;
  }

  trackByFunctionmcpniftyrt(index: number): number {
    return index;
  }

  trackByFunctionnewscardnav(index: number): number {
    return index;
  }

}
