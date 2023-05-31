import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ScreenersRoutingModule } from './screeners-routing.module';
import { ScreenersComponent } from './screeners.component';
 import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule} from '@angular/material/checkbox';
import {ReactiveFormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ButtonModule } from 'primeng/button';

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
    ScreenersRoutingModule,
    DialogModule,
    ButtonModule
  ]
})
export class ScreenersModule { }
