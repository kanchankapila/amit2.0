import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  // Market Data
  getMarketOverview(): Observable<any> {
    return this.http.get(`${this.baseUrl}/market/overview`)
      .pipe(catchError(error => this.errorHandler.handleError(error)));
  }

  getTopGainers(timeframe: string = '1d'): Observable<any> {
    return this.http.get(`${this.baseUrl}/market/gainers`, { params: { timeframe } })
      .pipe(catchError(error => this.errorHandler.handleError(error)));
  }

  getTopLosers(timeframe: string = '1d'): Observable<any> {
    return this.http.get(`${this.baseUrl}/market/losers`, { params: { timeframe } })
      .pipe(catchError(error => this.errorHandler.handleError(error)));
  }

  // Stock Data
  getStockDetails(symbol: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/stocks/${symbol}`)
      .pipe(catchError(error => this.errorHandler.handleError(error)));
  }

  getStockPrice(symbol: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/stocks/${symbol}/price`)
      .pipe(catchError(error => this.errorHandler.handleError(error)));
  }

  // Screener Data
  getScreenerResults(criteria: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/screener/results`, criteria)
      .pipe(catchError(error => this.errorHandler.handleError(error)));
  }

  // Market News
  getMarketNews(page: number = 1, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get(`${this.baseUrl}/news/market`, { params })
      .pipe(catchError(error => this.errorHandler.handleError(error)));
  }

  // Portfolio Data
  getUserPortfolio(): Observable<any> {
    return this.http.get(`${this.baseUrl}/portfolio`)
      .pipe(catchError(error => this.errorHandler.handleError(error)));
  }

  // Sector Performance
  getSectorPerformance(): Observable<any> {
    return this.http.get(`${this.baseUrl}/market/sectors`)
      .pipe(catchError(error => this.errorHandler.handleError(error)));
  }

  // Market Indices
  getIndicesData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/market/indices`)
      .pipe(catchError(error => this.errorHandler.handleError(error)));
  }

  // Technical Indicators
  getTechnicalIndicators(symbol: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/technical/${symbol}`)
      .pipe(catchError(error => this.errorHandler.handleError(error)));
  }

  getEtScreenersData(type: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/screeners/${type}`);
  }

  getntglobal(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/global-markets`);
  }
} 