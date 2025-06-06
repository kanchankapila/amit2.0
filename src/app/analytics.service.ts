import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../environments/environment';

/**
 * Simple Google Analytics integration service.
 * Loads gtag script and tracks page views on route changes.
 */
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private initialized = false;

  constructor(private router: Router) {}

  initialize(): void {
    if (this.initialized || !environment.analyticsTrackingId) {
      return;
    }
    this.initialized = true;

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${environment.analyticsTrackingId}`;
    document.head.appendChild(gaScript);

    const script = document.createElement('script');
    script.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${environment.analyticsTrackingId}');
    `;
    document.head.appendChild(script);

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => this.trackPage(e.urlAfterRedirects));
  }

  trackPage(url: string): void {
    if ((window as any).gtag) {
      (window as any).gtag('config', environment.analyticsTrackingId, {
        page_path: url
      });
    }
  }
}
