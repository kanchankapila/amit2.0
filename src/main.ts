<<<<<<< Updated upstream
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
=======
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
>>>>>>> Stashed changes
import { environment } from './environments/environment';

<<<<<<< Updated upstream
if (environment.production) {enableProdMode();}
import 'zone.js'; //Added for lazy module error in firefox,safari in server.
import 'hammerjs';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('ORg4AjUWIQA/Gnt2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5Ud0xiWX9ddH1VQGJd');
platformBrowserDynamic().bootstrapModule(AppModule)
  // .then(() => {
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('ngsw-worker.js');
  // }
  // }
  .catch(err => console.error(err));
=======
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
>>>>>>> Stashed changes
  
 