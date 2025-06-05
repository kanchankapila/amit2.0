import { NgModule } from '@angular/core';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';  // Custom preloading strategy
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
const routes: Routes = [
  { path: '', component: SplashScreenComponent }, 
  // { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { 
    path: 'homepage', 
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule),
    data: { preload: true }  // Preload this route for faster access
  },
  { 
    path: 'shared', 
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
    data: { preload: false }  // Defer loading until requested
  },
  { 
    path: 'nifty', 
    loadChildren: () => import('./nifty/nifty.module').then(m => m.NiftyModule),
    data: { preload: false }  // Defer preloading
  },
  { 
    path: 'banknifty', 
    loadChildren: () => import('./banknifty/banknifty.module').then(m => m.BankniftyModule),
    data: { preload: false }  // Load only when needed
  },
  { path: 'pharmanifty', loadChildren: () => import('./pharmanifty/pharmanifty.module').then(m => m.PharmaniftyModule) },
  { path: 'Share', loadChildren: () => import('./share/share.module').then(m => m.ShareModule) },
  { path: 'screeners', loadChildren: () => import('./screeners/screeners.module').then(m => m.ScreenersModule) },
  { path: 'analytics', loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule) },
  // { path: 'insights', loadChildren: () => import('./insights/insights.module').then(m => m.InsightsModule) },
  { path: 'charts', loadChildren: () => import('./syncfusion-shared-chart/syncfusion-shared-chart.module').then(m => m.SyncfusionSharedChartModule) },
  { path: 'ng2charts', loadChildren: () => import('./ng2-shared-chart/ng2-shared-chart.module').then(m => m.Ng2SharedChartModule) },
  { path: 'ngapex', loadChildren: () => import('./apexcharts-shared-module/apexcharts-shared-module.module').then(m => m.ApexchartsSharedModuleModule) },
  { path: 'ngxecharts', loadChildren: () => import('./ngxechartsshared/ngxechartsshared.module').then(m => m.NgxechartssharedModule) },
];

@NgModule({
  declarations: [SplashScreenComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })  // Custom preloading strategy
  ],
  exports: [RouterModule],
=======
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
=======
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
>>>>>>> Stashed changes
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
>>>>>>> Stashed changes
})
export class AppRoutingModule {
  static routes = routes;
}
