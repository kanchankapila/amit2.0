import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartAllModule,StockChartAllModule,AccumulationChartAllModule, LineSeriesService, SplineSeriesService, StepLineSeriesService, CategoryService, SplineAreaSeriesService, ParetoSeriesService, ColumnSeriesService,
  MultiColoredLineSeriesService, TooltipService } from '@syncfusion/ej2-angular-charts';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
    StockChartAllModule,
     AccumulationChartAllModule, 
    // RangeNavigatorAllModule,
     ChartAllModule// Syncfusion ChartModule for creating charts
  ],
  exports: [
    
    StockChartAllModule,
     AccumulationChartAllModule, 
    // RangeNavigatorAllModule,
    ChartAllModule // Re-exporting so other modules can use it
  ],
  providers: [
    LineSeriesService,  // Registering necessary services for charts
    CategoryService,
  //  DateTimeService,
  //  PeriodSelectorService,
  //  RangeTooltipService,
   MultiColoredLineSeriesService,
  //  DateTimeCategoryService,
   SplineSeriesService, 
   StepLineSeriesService, 
   SplineAreaSeriesService,
    ParetoSeriesService, 
    ColumnSeriesService,
    TooltipService
  ]
})
export class SyncfusionSharedChartModule {}
