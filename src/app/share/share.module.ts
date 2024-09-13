import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RadioButtonModule} from 'primeng/radiobutton';
import { DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ShareRoutingModule } from './share-routing.module';
import { ShareComponent } from './share.component';
import { SidebarModule } from 'primeng/sidebar';
import { MatCardModule } from '@angular/material/card';
import { CardModule } from 'primeng/card';
import { Ng2SharedChartModule } from '../ng2-shared-chart/ng2-shared-chart.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { TabViewModule } from "primeng/tabview";
import { ButtonModule } from 'primeng/button';
import { NgxechartssharedModule } from '../ngxechartsshared/ngxechartsshared.module';
import { ApexchartsSharedModuleModule } from '../apexcharts-shared-module/apexcharts-shared-module.module'
import { SyncfusionSharedChartModule } from '../syncfusion-shared-chart/syncfusion-shared-chart.module';
// import { StockChartAllModule,AccumulationChartAllModule, RangeNavigatorAllModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';
// import { CategoryService, LineSeriesService, DateTimeService,PeriodSelectorService,RangeTooltipService,DateTimeCategoryService,MultiColoredLineSeriesService} from '@syncfusion/ej2-angular-charts';





@NgModule({
  declarations: [
    ShareComponent
  ],
  imports: [
    CommonModule,
    ShareRoutingModule,
    NgxechartssharedModule,
    RadioButtonModule, 
    MatCardModule,
    DialogModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule, 
    FlexLayoutModule,
    MatButtonModule,
    Ng2SharedChartModule,
    ButtonModule,
    SidebarModule,
    Ng2SharedChartModule,
    TabViewModule,
    ApexchartsSharedModuleModule,
    SyncfusionSharedChartModule
   ],
  schemas: [],
  providers: [DatePipe]
 
})
export class ShareModule { }
