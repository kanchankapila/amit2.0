import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RadioButtonModule} from 'primeng/radiobutton';
import {HttpClientModule} from '@angular/common/http';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgApexchartsModule } from "ng-apexcharts";
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
  
    NgApexchartsModule,
    MatCardModule,
    RadioButtonModule,
    FormsModule,
    ButtonModule
   
   

  ],
  providers: [ ],
})
export class DashboardModule { }
