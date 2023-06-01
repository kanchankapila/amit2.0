import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule as SyncfusionChartModule , AccumulationChartModule, DateTimeService,DateTimeCategoryService,RangeNavigatorModule,MultiColoredLineSeriesService } from '@syncfusion/ej2-angular-charts';
import { PharmaniftyRoutingModule } from './pharmanifty-routing.module';
import { PharmaniftyComponent } from './pharmanifty.component';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
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
    NgChartsModule,
    TabViewModule,
    ChartModule,
    RadioButtonModule,
    SyncfusionChartModule,
    ChartModule, AccumulationChartModule, RangeNavigatorModule

  ],
  providers:[MultiColoredLineSeriesService,DateTimeCategoryService,DateTimeService]
})
export class PharmaniftyModule { }
