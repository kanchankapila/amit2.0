import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { DatePipe } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
// import { NavbarModule, ButtonsModule } from 'angular-bootstrap-md'
 import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule ,HttpClientJsonpModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
 import { MatCardModule } from '@angular/material/card';
 import { MatIconModule } from '@angular/material/icon';



const routes : Routes = [
  { path: '', component: SidebarComponent },
  { path: '', component: NavbarComponent }
]

@NgModule({
  declarations: [SidebarComponent,NavbarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SidebarModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    DropdownModule,
    CommonModule,
    // NavbarModule,
    FormsModule,
    // ButtonsModule,
    NgbModule,
    MatIconModule,
    HttpClientModule,
    ButtonModule,
     MatCardModule,
    BrowserModule,
    RouterModule.forChild(routes)
   
  ],
  exports:[SidebarComponent,NavbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe]
  
})
export class SharedModule { }
