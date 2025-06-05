import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { NgxEchartsModule } from 'ngx-echarts';

import { SectorsComponent } from './sectors.component';

const routes: Routes = [
  { path: '', component: SectorsComponent }
];

@NgModule({
  declarations: [SectorsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    NgxEchartsModule
  ]
})
export class SectorsModule { } 