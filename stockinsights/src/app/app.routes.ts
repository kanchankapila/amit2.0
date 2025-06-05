import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash-screen',
    pathMatch: 'full'
  },
  {
    path: 'splash-screen',
    loadComponent: () => import('./splash-screen/splash-screen.component')
      .then(m => m.SplashScreenComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'homepage',
        loadComponent: () => import('./homepage/homepage.component')
          .then(m => m.HomepageComponent)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes')
          .then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'stocks',
        loadChildren: () => import('./features/stocks/stocks.routes')
          .then(m => m.STOCKS_ROUTES)
      },
      {
        path: 'screener',
        loadChildren: () => import('./features/screener/screener.routes')
          .then(m => m.SCREENER_ROUTES)
      },
      {
        path: 'analytics',
        loadChildren: () => import('./features/analytics/analytics.routes')
          .then(m => m.ANALYTICS_ROUTES)
      },
      {
        path: 'settings',
        loadChildren: () => import('./features/settings/settings.routes')
          .then(m => m.SETTINGS_ROUTES)
      }
    ]
  }
]; 