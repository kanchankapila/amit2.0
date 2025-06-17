import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NiftyRoutingModule } from './nifty-routing.module';
import { NiftyComponent } from './nifty.component';
import { Ng2SharedChartModule } from '../ng2-shared-chart/ng2-shared-chart.module';
import { TabViewModule } from "primeng/tabview";
import { ChartModule } from 'primeng/chart';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SyncfusionSharedChartModule } from '../syncfusion-shared-chart/syncfusion-shared-chart.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    NiftyComponent
    
  ],
  imports: [
    CommonModule,
    NiftyRoutingModule,
   
   
   
    TabViewModule,
    ChartModule,
    FlexLayoutModule,
    FormsModule,
    Ng2SharedChartModule,
    SyncfusionSharedChartModule
   

  ],
  providers:[
     
  ]
})
export class NiftyModule { }
