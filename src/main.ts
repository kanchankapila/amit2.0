
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from './environments/environment';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(AppRoutingModule.routes),
    provideAnimations(),
    CustomPreloadingStrategy,
    provideHttpClient(),
    DataapiService,
    provideServiceWorker('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
}).catch(err => console.error(err));
  
 