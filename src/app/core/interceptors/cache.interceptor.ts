import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from '../services/cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private readonly cacheMethods = ['GET'];
  private readonly cacheableUrls = [
    '/api/stocks',
    '/api/market-data',
    '/api/sectors'
  ];

  constructor(private cache: CacheService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Only cache configured HTTP methods
    if (!this.cacheMethods.includes(request.method)) {
      return next.handle(request);
    }

    // Only cache configured URLs
    if (!this.cacheableUrls.some(url => request.url.includes(url))) {
      return next.handle(request);
    }

    const cachedResponse = this.cache.get<HttpEvent<unknown>>(request.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(request.url, event);
        }
      })
    );
  }
} 