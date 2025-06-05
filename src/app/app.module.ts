<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    ContentAnimateDirective
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
=======
=======
>>>>>>> Stashed changes
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { DataApiService } from './core/services/data-api.service';
import { LoadingService } from './core/services/loading.service';
import { CacheService } from './core/services/cache.service';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { CacheInterceptor } from './core/interceptors/cache.interceptor';

import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  ],
  providers: [
    { provide: Window, useValue: window },CustomPreloadingStrategy
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
=======
=======
>>>>>>> Stashed changes
    NgxEchartsModule.forRoot({
      echarts
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    },
    DataApiService,
    LoadingService,
    CacheService
  ],
  bootstrap: []
})
<<<<<<< Updated upstream
export class AppModule { } 
>>>>>>> Stashed changes
=======
export class AppModule { } 
>>>>>>> Stashed changes
