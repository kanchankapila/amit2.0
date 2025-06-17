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
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    { provide: Window, useValue: window },CustomPreloadingStrategy
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
