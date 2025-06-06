import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CacheService } from './cache.service';
import { LoadingService } from './loading.service';
import { LoggingService } from './logging.service';

export interface ApiOptions {
  headers?: HttpHeaders;
  params?: HttpParams | { [param: string]: string | string[] };
  cache?: boolean;
  cacheTTL?: number;
  loadingKey?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = environment.apiUrl;
  private readonly DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  constructor(
    private http: HttpClient,
    private cache: CacheService,
    private loading: LoadingService,
    private logger: LoggingService
  ) {}

  get<T>(endpoint: string, options: ApiOptions = {}): Observable<T> {
    const url = this.buildUrl(endpoint);
    const loadingKey = options.loadingKey || endpoint;

    if (options.cache) {
      const cached = this.cache.get<T>(url);
      if (cached) {
        return new Observable<T>(observer => {
          observer.next(cached);
          observer.complete();
        });
      }
    }

    this.loading.start(loadingKey);

    return this.http.get<T>(url, {
      headers: options.headers,
      params: options.params
    }).pipe(
      tap(response => {
        if (options.cache) {
          this.cache.set(url, response, options.cacheTTL || this.DEFAULT_CACHE_TTL);
        }
      }),
      catchError(error => this.handleError(error)),
      tap({
        complete: () => this.loading.stop(loadingKey),
        error: () => this.loading.stop(loadingKey)
      })
    );
  }

  post<T>(endpoint: string, body: any, options: ApiOptions = {}): Observable<T> {
    const url = this.buildUrl(endpoint);
    const loadingKey = options.loadingKey || endpoint;

    this.loading.start(loadingKey);

    return this.http.post<T>(url, body, {
      headers: options.headers,
      params: options.params
    }).pipe(
      catchError(error => this.handleError(error)),
      tap({
        complete: () => this.loading.stop(loadingKey),
        error: () => this.loading.stop(loadingKey)
      })
    );
  }

  put<T>(endpoint: string, body: any, options: ApiOptions = {}): Observable<T> {
    const url = this.buildUrl(endpoint);
    const loadingKey = options.loadingKey || endpoint;

    this.loading.start(loadingKey);

    return this.http.put<T>(url, body, {
      headers: options.headers,
      params: options.params
    }).pipe(
      catchError(error => this.handleError(error)),
      tap({
        complete: () => this.loading.stop(loadingKey),
        error: () => this.loading.stop(loadingKey)
      })
    );
  }

  delete<T>(endpoint: string, options: ApiOptions = {}): Observable<T> {
    const url = this.buildUrl(endpoint);
    const loadingKey = options.loadingKey || endpoint;

    this.loading.start(loadingKey);

    return this.http.delete<T>(url, {
      headers: options.headers,
      params: options.params
    }).pipe(
      catchError(error => this.handleError(error)),
      tap({
        complete: () => this.loading.stop(loadingKey),
        error: () => this.loading.stop(loadingKey)
      })
    );
  }

  private buildUrl(endpoint: string): string {
    return `${this.API_URL}/${endpoint.replace(/^\//, '')}`;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.logger.error(errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
} 