import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {enableProdMode();}
import 'zone.js'; //Added for lazy module error in firefox,safari in server.
import 'hammerjs';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('ORg4AjUWIQA/Gnt2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0dhW39acnRRR2NeU0Q=');
platformBrowserDynamic().bootstrapModule(AppModule)
  // .then(() => {
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('ngsw-worker.js');
  // }
  // }
  .catch(err => console.error(err));
  
 