import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BaseChartDirective
  ], exports: [
    BaseChartDirective // Re-exporting so other modules can use it
  ],
})
export class Ng2SharedChartModule { }
