
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';  // Import your custom strategy

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { 
    path: 'homepage', 
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule),
    data: { preload: false }  // Preload important routes
  },
  { 
    path: 'shared', 
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
    data: { preload: false }  // Preload important routes
  },
  { 
    path: 'nifty', 
    loadChildren: () => import('./nifty/nifty.module').then(m => m.NiftyModule),
    data: { preload: false }  // Preload important routes
  },
  { 
    path: 'banknifty', 
    loadChildren: () => import('./banknifty/banknifty.module').then(m => m.BankniftyModule),
    data: { preload: false }  // Defer preloading
  },
  { path: 'pharmanifty', loadChildren: () => import('./pharmanifty/pharmanifty.module').then(m => m.PharmaniftyModule) },
  { path: 'Share', loadChildren: () => import('./share/share.module').then(m => m.ShareModule) },
  { path: 'homepage', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule) },
  { path: 'screeners', loadChildren: () => import('./screeners/screeners.module').then(m => m.ScreenersModule) },
  { path: 'analytics', loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule) },
  { path: 'insights', loadChildren: () => import('./Insights/Insights.module').then(m => m.InsightsModule) },
  { path: 'charts', loadChildren: () => import('./syncfusion-shared-chart/syncfusion-shared-chart.module').then(m => m.SyncfusionSharedChartModule) },
  { path: 'ng2charts', loadChildren: () => import('./ng2-shared-chart/ng2-shared-chart.module').then(m => m.Ng2SharedChartModule) },
  { path: 'ngapex', loadChildren: () => import('./apexcharts-shared-module/apexcharts-shared-module.module').then(m => m.ApexchartsSharedModuleModule) },
  { path: 'ngxecharts', loadChildren: () => import('./ngxechartsshared/ngxechartsshared.module').then(m => m.NgxechartssharedModule) },
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })  // Use custom preloading strategy
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }



// const routes: Routes = [
//   { path: '', redirectTo: '/homepage', pathMatch: 'full' },
//   { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
//   { path: 'nifty', loadChildren: () => import('./nifty/nifty.module').then(m => m.NiftyModule) },
//   { path: 'banknifty', loadChildren: () => import('./banknifty/banknifty.module').then(m => m.BankniftyModule) },
//   { path: 'pharmanifty', loadChildren: () => import('./pharmanifty/pharmanifty.module').then(m => m.PharmaniftyModule) },
//   { path: 'Share', loadChildren: () => import('./share/share.module').then(m => m.ShareModule) },
//    { path: 'homepage', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule) },
//   { path: 'screeners', loadChildren: () => import('./screeners/screeners.module').then(m => m.ScreenersModule) },
//   { path: 'analytics', loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule) },
//   { path: 'Insights', loadChildren: () => import('./Insights/Insights.module').then(m => m.InsightsModule) },
//   { path: 'charts', loadChildren: () => import('./syncfusion-shared-chart/syncfusion-shared-chart.module').then(m => m.SyncfusionSharedChartModule) },
//   { path: 'ng2charts', loadChildren: () => import('./ng2-shared-chart/ng2-shared-chart.module').then(m => m.Ng2SharedChartModule)},
//   { path: 'ngapex', loadChildren: () => import('./apexcharts-shared-module/apexcharts-shared-module.module').then(m => m.ApexchartsSharedModuleModule)},
//   { path: 'ngxecharts', loadChildren: () => import('./ngxechartsshared/ngxechartsshared.module').then(m => m.NgxechartssharedModule)},
  

// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes, {preloadingStrategy:PreloadAllModules })],
//   exports: [RouterModule],
  
// })
// export class AppRoutingModule { }
