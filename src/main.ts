import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {enableProdMode();}
import 'zone.js'; //Added for lazy module error in firefox,safari in server.
import 'hammerjs';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCeUx3QXxbf1x0ZFZMYlpbQHFPMyBoS35RckVkWXhec3ZTQmdaWU13');
platformBrowserDynamic().bootstrapModule(AppModule)
  // .then(() => {
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('ngsw-worker.js');
  // }
  // }
  .catch(err => console.error(err));
  
 