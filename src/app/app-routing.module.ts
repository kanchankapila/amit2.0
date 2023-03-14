
import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';



const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
  { path: 'nifty', loadChildren: () => import('./nifty/nifty.module').then(m => m.NiftyModule) },
  { path: 'banknifty', loadChildren: () => import('./banknifty/banknifty.module').then(m => m.BankniftyModule) },
  { path: 'pharmanifty', loadChildren: () => import('./pharmanifty/pharmanifty.module').then(m => m.PharmaniftyModule) },
  { path: 'Share', loadChildren: () => import('./share/share.module').then(m => m.ShareModule) },
   { path: 'homepage', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule) },
  { path: 'screeners', loadChildren: () => import('./screeners/screeners.module').then(m => m.ScreenersModule) },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy:PreloadAllModules })],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
