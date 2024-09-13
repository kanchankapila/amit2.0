import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BankniftyRoutingModule } from './banknifty-routing.module';
import { BankniftyComponent } from './banknifty.component';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatCardModule } from '@angular/material/card';
import { Ng2SharedChartModule } from '../ng2-shared-chart/ng2-shared-chart.module'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { TabViewModule } from "primeng/tabview";
import { ChartModule } from 'primeng/chart';
import {RadioButtonModule} from 'primeng/radiobutton';

@NgModule({
  declarations: [
    BankniftyComponent
  ],
  imports: [
    CommonModule,
    BankniftyRoutingModule,
    FlexLayoutModule,
    // NgbModule,
    MatCardModule,
    MatButtonModule,
    Ng2SharedChartModule,
    TabViewModule,
    ChartModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule 
   
  ]
})
export class BankniftyModule { }
