import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {enableProdMode();}
import 'zone.js'; //Added for lazy module error in firefox,safari in server.
import 'hammerjs';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Mgo+DSMBaFt+QHJqXU1hXk5Hd0BLVGpAblJ3T2ZQdVt5ZDU7a15RRnVfR15jSH1SdERiX39acg==;Mgo+DSMBPh8sVXJ1S0R+VFpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jTH1Td0ZiW35fdnVcRA==;ORg4AjUWIQA/Gnt2VFhiQllPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXtQdkRgWH1fcXJWQWI=;MjI1MjA4OEAzMjMxMmUzMDJlMzBTb1ZBc2FobHNUUldlUFlEbnZyMVJZdlNFQU9WVzJlUnJ0QW9PZzJNSVFJPQ==;MjI1MjA4OUAzMjMxMmUzMDJlMzBpS2lMbnU2RWJxUDkzY0lFY3BDelJqZm5SOEhwWGphb09GeGpyOW5yUHRzPQ==;NRAiBiAaIQQuGjN/V0d+Xk9MfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5WdUViWn5ccXVSRWBe;MjI1MjA5MUAzMjMxMmUzMDJlMzBEd09SUWZOdmcxdEcvdWt5UDFCeDA2NzI3SmRzRSt6RVo2a0lpbUU2dnRRPQ==;MjI1MjA5MkAzMjMxMmUzMDJlMzBJV3dZNTRXME9EczFDcFVCUWM1emRINTdrUEhPRUVEZlpHMkc2cFdCcjZNPQ==;Mgo+DSMBMAY9C3t2VFhiQllPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXtQdkRgWH1fcXxUT2I=;MjI1MjA5NEAzMjMxMmUzMDJlMzBhbXN4a0p4aU96c053dGhqYnFvN3dEK1dCVmEyZzFBM0V2Y2NkcUNxNElZPQ==;MjI1MjA5NUAzMjMxMmUzMDJlMzBTZGFEdDBDdU96aHlGQVMrUmF3Y0lUK1RpNWFod3JPZjlYc3d5STJ0T3FjPQ==;MjI1MjA5NkAzMjMxMmUzMDJlMzBEd09SUWZOdmcxdEcvdWt5UDFCeDA2NzI3SmRzRSt6RVo2a0lpbUU2dnRRPQ==');
platformBrowserDynamic().bootstrapModule(AppModule)
  // .then(() => {
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('ngsw-worker.js');
  // }
  // }
  .catch(err => console.error(err));
  
 