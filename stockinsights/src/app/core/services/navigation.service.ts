import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {}

  /**
   * Navigate to homepage
   * @param options Optional navigation extras
   * @returns Promise<boolean>
   */
  goToHomepage(options: { replaceUrl?: boolean } = {}) {
    return this.router.navigate(['/homepage'], {
      replaceUrl: options.replaceUrl
    });
  }

  /**
   * Navigate to splash screen
   * @returns Promise<boolean>
   */
  goToSplashScreen() {
    return this.router.navigate(['/splash-screen']);
  }
} 