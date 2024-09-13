import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxEchartsModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
  ],exports:[NgxEchartsModule]
})
export class NgxechartssharedModule { }
