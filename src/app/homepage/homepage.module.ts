import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RadioButtonModule} from 'primeng/radiobutton';
import {HttpClientModule} from '@angular/common/http';
import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    NgChartsModule,
    NgApexchartsModule,
    MatCardModule,
    RadioButtonModule,
    FormsModule,
    ButtonModule,
    TableModule
   
   

  ],
  providers: [],
})
export class HomepageModule { }
