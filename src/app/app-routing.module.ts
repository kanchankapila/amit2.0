import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { authGuard, publicGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'nifty',
    loadChildren: () => import('./features/nifty/nifty.module').then(m => m.NiftyModule),
    canActivate: [authGuard]
  },
  {
    path: 'banknifty',
    loadChildren: () => import('./features/banknifty/banknifty.module').then(m => m.BankNiftyModule),
    canActivate: [authGuard]
  },
  {
    path: 'pharmanifty',
    loadChildren: () => import('./features/pharmanifty/pharmanifty.module').then(m => m.PharmaNiftyModule),
    canActivate: [authGuard]
  },
  {
    path: 'analytics',
    loadChildren: () => import('./features/analytics/analytics.module').then(m => m.AnalyticsModule),
    canActivate: [authGuard]
  },
  {
    path: 'screener',
    loadChildren: () => import('./features/screener/screener.module').then(m => m.ScreenerModule),
    canActivate: [authGuard]
  },
  {
    path: 'sectors',
    loadChildren: () => import('./features/sectors/sectors.module').then(m => m.SectorsModule),
    canActivate: [authGuard]
  },
  {
    path: 'watchlist',
    loadChildren: () => import('./features/watchlist/watchlist.module').then(m => m.WatchlistModule),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [authGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [authGuard]
  },
  {
    path: 'auth',
    canActivate: [publicGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
      }
    ]
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'homepage',
    canActivate: [authGuard],
    loadComponent: () => import('./homepage/homepage.component').then(m => m.HomepageComponent)
  },
  { path: '', redirectTo: '/nifty', pathMatch: 'full' },
  { path: '**', redirectTo: '/nifty' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static routes = routes;
}
