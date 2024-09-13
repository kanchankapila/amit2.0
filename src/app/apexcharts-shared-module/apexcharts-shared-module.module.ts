import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from "ng-apexcharts";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgApexchartsModule
  ],exports:[NgApexchartsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApexchartsSharedModuleModule { }
