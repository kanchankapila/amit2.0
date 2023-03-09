import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenersComponent } from './screeners.component';

const routes: Routes = [{ path: '', component: ScreenersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreenersRoutingModule { }
