import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankniftyComponent } from './banknifty.component';

const routes: Routes = [{ path: '', component: BankniftyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankniftyRoutingModule { }
