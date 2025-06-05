import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { StocksComponent } from './stocks.component';

const routes: Routes = [
  {
    path: '',
    component: StocksComponent
  }
];

@NgModule({
  declarations: [
    StocksComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class StocksModule { } 