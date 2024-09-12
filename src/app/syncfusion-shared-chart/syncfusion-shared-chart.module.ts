import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodSelectorService,RangeTooltipService,DateTimeCategoryService, DateTimeService,MultiColoredLineSeriesService,ChartModule, LineSeriesService, CategoryService } from '@syncfusion/ej2-angular-charts';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChartModule // Syncfusion ChartModule for creating charts
  ],
  exports: [
    ChartModule // Re-exporting so other modules can use it
  ],
  providers: [
    LineSeriesService,  // Registering necessary services for charts
    CategoryService,
   DateTimeService,PeriodSelectorService,RangeTooltipService,MultiColoredLineSeriesService,DateTimeCategoryService
  ]
})
export class SyncfusionSharedChartModule {}
