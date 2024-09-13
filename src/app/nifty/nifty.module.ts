import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NiftyRoutingModule } from './nifty-routing.module';
import { NiftyComponent } from './nifty.component';
import { MatCardModule } from '@angular/material/card';
import { Ng2SharedChartModule } from '../ng2-shared-chart/ng2-shared-chart.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { TabViewModule } from "primeng/tabview";
import { ChartModule } from 'primeng/chart';
import { SyncfusionSharedChartModule } from '../syncfusion-shared-chart/syncfusion-shared-chart.module';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';


@NgModule({
  declarations: [
    NiftyComponent
    
  ],
  imports: [
    CommonModule,
    NiftyRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    TabViewModule,
    ChartModule,
    RadioButtonModule,
    FormsModule,
    Ng2SharedChartModule,
    SyncfusionSharedChartModule
   ],
  providers:[
     
  ]
})
export class NiftyModule { }
