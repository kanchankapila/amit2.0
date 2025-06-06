
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { AppRoutingModule } from './app/app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { DataApiService } from './app/core/services/data-api.service';
import { CustomPreloadingStrategy } from './app/custom-preloading-strategy';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from './environments/environment';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(AppRoutingModule.routes),
    provideAnimations(),
    { provide: CustomPreloadingStrategy, useClass: CustomPreloadingStrategy },
    provideHttpClient(),
    DataApiService,
    provideServiceWorker('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
}).catch(err => console.error(err));
  
 