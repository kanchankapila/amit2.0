import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxEchartsModule } from 'ngx-echarts';

import { NiftyComponent } from './nifty.component';

const routes: Routes = [
  { path: '', component: NiftyComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    NgxEchartsModule
  ]
})
export class NiftyModule { } 