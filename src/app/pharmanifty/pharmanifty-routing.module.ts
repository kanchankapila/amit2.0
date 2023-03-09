import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmaniftyComponent } from './pharmanifty.component';

const routes: Routes = [{ path: '', component: PharmaniftyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmaniftyRoutingModule { }
