import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InsightsRoutingModule } from './Insights-routing.module';
import { InsightsComponent } from './Insights.component';


@NgModule({
  declarations: [
    InsightsComponent
  ],
  imports: [
    CommonModule,
    InsightsRoutingModule,
    ReactiveFormsModule,
    
  ]
})
export class InsightsModule { }
