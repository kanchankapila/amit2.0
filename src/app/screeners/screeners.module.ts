import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ScreenersRoutingModule } from './screeners-routing.module';
import { ScreenersComponent } from './screeners.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ReactiveFormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    ScreenersComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    ScreenersRoutingModule
    
  ]
})
export class ScreenersModule { }
