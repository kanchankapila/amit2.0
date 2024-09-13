import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncfusionSharedChartModule } from '../syncfusion-shared-chart/syncfusion-shared-chart.module';
import { PharmaniftyRoutingModule } from './pharmanifty-routing.module';
import { PharmaniftyComponent } from './pharmanifty.component';
import { MatCardModule } from '@angular/material/card';
import { Ng2SharedChartModule } from '../ng2-shared-chart/ng2-shared-chart.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { TabViewModule } from "primeng/tabview";
import { ChartModule } from 'primeng/chart';
import {FormsModule} from '@angular/forms';
import {RadioButtonModule} from 'primeng/radiobutton';
@NgModule({
  declarations: [
    PharmaniftyComponent
  ],
  imports: [
    CommonModule,
    PharmaniftyRoutingModule,
    FlexLayoutModule,
    // NgbModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    SyncfusionSharedChartModule,
    TabViewModule,
    ChartModule,
    RadioButtonModule,
    Ng2SharedChartModule
    

  ],
  providers:[]
})
export class PharmaniftyModule { }
