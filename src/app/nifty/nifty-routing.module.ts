import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NiftyComponent } from './nifty.component';

const routes: Routes = [{ path: '', component: NiftyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NiftyRoutingModule { }
