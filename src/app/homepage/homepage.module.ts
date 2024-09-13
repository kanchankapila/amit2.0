import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RadioButtonModule} from 'primeng/radiobutton';
import {HttpClientModule} from '@angular/common/http';
import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { Ng2SharedChartModule } from '../ng2-shared-chart/ng2-shared-chart.module';
import { ApexchartsSharedModuleModule } from '../apexcharts-shared-module/apexcharts-shared-module.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    HttpClientModule,
    ApexchartsSharedModuleModule,
    Ng2SharedChartModule,
    MatCardModule,
    RadioButtonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    TableModule
   ],
  providers: [],
})
export class HomepageModule { }
