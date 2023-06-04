import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { DatePipe } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { NgChartsModule } from 'ng2-charts';


const routes : Routes = [
 
  { path: '', component: NavbarComponent }
]

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    SidebarModule,
    BrowserAnimationsModule,
    DropdownModule,
    CommonModule,
    NgChartsModule,
    HttpClientModule,
    ButtonModule,
    BrowserModule,
    RouterModule.forChild(routes)
   
  ],
  exports:[NavbarComponent],
  schemas: [],
  providers: [DatePipe]
  
})
export class SharedModule { }
