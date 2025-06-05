import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ScreenerComponent } from './screener.component';

const routes: Routes = [
  {
    path: '',
    component: ScreenerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ScreenerComponent
  ]
})
export class ScreenerModule { } 