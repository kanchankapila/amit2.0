import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< Updated upstream
import { RouterModule, Routes } from '@angular/router';

import { DatePipe } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { Ng2SharedChartModule } from '../ng2-shared-chart/ng2-shared-chart.module';


const routes : Routes = [
 
  { path: '', component: NavbarComponent }
]

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    SidebarModule,
    // BrowserAnimationsModule,
    DropdownModule,
    FormsModule,
    CommonModule,
    Ng2SharedChartModule,
    HttpClientModule,
    ButtonModule,
   
    RouterModule.forChild(routes)
   
  ],
  exports:[NavbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe]
  
})
export class SharedModule { }
=======
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
];

const standaloneComponents = [
  LoadingSpinnerComponent,
  NavbarComponent,
  FooterComponent
];

const components = [
  ErrorMessageComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    ...standaloneComponents
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    ...components,
    ...standaloneComponents
  ]
})
export class SharedModule { } 
>>>>>>> Stashed changes
