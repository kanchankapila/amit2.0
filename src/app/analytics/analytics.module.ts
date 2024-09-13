import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Ng2SharedChartModule } from '../ng2-shared-chart/ng2-shared-chart.module';
import { MatCardModule } from '@angular/material/card';
import { DialogModule } from 'primeng/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { TabViewModule } from "primeng/tabview";
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    FlexLayoutModule,
    ButtonModule,
    // NgbModule,
    MatCardModule,
    MatButtonModule,
    Ng2SharedChartModule,
    TabViewModule,
    DialogModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule

  ]
})
export class AnalyticsModule { }
