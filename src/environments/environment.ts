// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
<<<<<<< Updated upstream
<<<<<<< Updated upstream

=======
=======
>>>>>>> Stashed changes
  apiUrl: '/.netlify/functions',
  wsUrl: 'ws://localhost:8888',
  vapidPublicKey: 'YOUR_VAPID_PUBLIC_KEY', // Replace with your VAPID public key
  appName: 'Stock Website',
  version: '1.0.0',
  apiTimeout: 30000, // 30 seconds
  cacheTTL: 300000, // 5 minutes
  logLevel: 'debug',
  features: {
    enablePWA: true,
    enableAnalytics: true,
    enableNotifications: true,
    darkMode: true
  }
>>>>>>> Stashed changes
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
