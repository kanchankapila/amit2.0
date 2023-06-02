import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NiftyRoutingModule } from './nifty-routing.module';
import { NiftyComponent } from './nifty.component';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { TabViewModule } from "primeng/tabview";
import { ChartModule } from 'primeng/chart';
import { ChartModule as SyncfusionChartModule, AccumulationChartModule,DateTimeService,MultiColoredLineSeriesService} from '@syncfusion/ej2-angular-charts';
import {FormsModule} from '@angular/forms';
import {RadioButtonModule} from 'primeng/radiobutton';


@NgModule({
  declarations: [
    NiftyComponent
    
  ],
  imports: [
    CommonModule,
    SyncfusionChartModule, 
    AccumulationChartModule, 
    
    NiftyRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    NgChartsModule,
    TabViewModule,
    ChartModule,
    RadioButtonModule,
    FormsModule
   

  ],
  providers:[MultiColoredLineSeriesService,DateTimeService]
})
export class NiftyModule { }
