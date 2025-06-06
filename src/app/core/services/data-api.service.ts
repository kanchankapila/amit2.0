import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, timer, combineLatest, of } from 'rxjs';
import { catchError, tap, retry, shareReplay, timeout, finalize, switchMap, retryWhen, delay } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';
import { CacheService } from './cache.service';
import { LoggingService } from './logging.service';
import { LoadingService } from './loading.service';
import { GlobalMarketData, ScreenerData, StockData, IndexData, SectorData, ScreenerCriteria } from '../models/market.interface';

export interface ApiResponse<T> {
  data: T;
  error?: string;
  timestamp: number;
}

export interface ApiOptions {
  cache?: boolean;
  cacheTTL?: number;
  retries?: number;
  timeout?: number;
  loadingKey?: string;
}

export { GlobalMarketData, ScreenerData, StockData, IndexData, SectorData, ScreenerCriteria };

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  private readonly DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  private readonly DEFAULT_TIMEOUT = 30000; // 30 seconds
  private readonly DEFAULT_RETRIES = 3;
  private baseUrl: string;
  private wsSubject: WebSocketSubject<any> | null = null;
  
  private niftySubject = new BehaviorSubject<IndexData | null>(null);
  private bankNiftySubject = new BehaviorSubject<IndexData | null>(null);
  private pharmaNiftySubject = new BehaviorSubject<IndexData | null>(null);
  private sectorsSubject = new BehaviorSubject<SectorData[]>([]);

  constructor(
    private http: HttpClient,
    private cache: CacheService,
    private logger: LoggingService,
    private loading: LoadingService
  ) {
    this.setBaseUrl();
    this.initializeWebSocket();
    this.startPeriodicDataRefresh();
  }

  private setBaseUrl(): void {
    this.baseUrl = window.location.hostname === "localhost" 
      ? "http://localhost:9999"
      : "https://stockinsights.netlify.app";
  }

  private initializeWebSocket(): void {
    if (!this.wsSubject) {
      this.wsSubject = webSocket({
        url: environment.wsUrl + '/market-data',
        openObserver: {
          next: () => console.log('WebSocket connected')
        },
        closeObserver: {
          next: () => {
            console.log('WebSocket disconnected. Retrying...');
            this.reconnectWebSocket();
          }
        }
      });

      this.wsSubject.pipe(
        retryWhen(errors => errors.pipe(delay(5000)))
      ).subscribe(
        message => this.handleWebSocketMessage(message),
        error => console.error('WebSocket error:', error)
      );
    }
  }

  private reconnectWebSocket(): void {
    timer(5000).subscribe(() => this.initializeWebSocket());
  }

  private handleWebSocketMessage(message: any): void {
    switch (message.type) {
      case 'NIFTY':
        this.niftySubject.next(message.data);
        break;
      case 'BANKNIFTY':
        this.bankNiftySubject.next(message.data);
        break;
      case 'PHARMANIFTY':
        this.pharmaNiftySubject.next(message.data);
        break;
      case 'SECTORS':
        this.sectorsSubject.next(message.data);
        break;
    }
  }

  private startPeriodicDataRefresh(): void {
    timer(0, 60000).pipe( // Refresh every minute
      switchMap(() => combineLatest([
        this.fetchNiftyData(),
        this.fetchBankNiftyData(),
        this.fetchPharmaNiftyData(),
        this.fetchSectorsData()
      ]))
    ).subscribe();
  }

  // Generic GET request with caching and error handling
  private get<T>(endpoint: string, options: ApiOptions = {}): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const cacheKey = url;
    const loadingKey = options.loadingKey || endpoint;

    // Check cache if enabled
    if (options.cache) {
      const cached = this.cache.get<T>(cacheKey);
      if (cached) {
        this.logger.debug(`Cache hit for ${endpoint}`);
        return new Observable<T>(observer => {
          observer.next(cached);
          observer.complete();
        });
      }
    }

    this.loading.start(loadingKey);

    return this.http.get<T>(url).pipe(
      timeout(options.timeout || this.DEFAULT_TIMEOUT),
      retry(options.retries || this.DEFAULT_RETRIES),
      tap(response => {
        if (options.cache) {
          this.cache.set(cacheKey, response, options.cacheTTL || this.DEFAULT_CACHE_TTL);
        }
        this.logger.debug(`Successful GET request to ${endpoint}`);
      }),
      shareReplay(1),
      catchError(error => this.handleError(error)),
      finalize(() => this.loading.stop(loadingKey))
    );
  }

  // Generic POST request with error handling
  private post<T>(endpoint: string, body: any, options: ApiOptions = {}): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const loadingKey = options.loadingKey || endpoint;

    this.loading.start(loadingKey);

    return this.http.post<T>(url, body).pipe(
      timeout(options.timeout || this.DEFAULT_TIMEOUT),
      retry(options.retries || this.DEFAULT_RETRIES),
      tap(() => this.logger.debug(`Successful POST request to ${endpoint}`)),
      shareReplay(1),
      catchError(error => this.handleError(error)),
      finalize(() => this.loading.stop(loadingKey))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.logger.error(errorMessage);
    return throwError(() => errorMessage);
  }

  // API Methods
  getNteodScreeners(ntoptions: any): Observable<any> {
    return this.get('/api/nteod/screeners', { cache: true });
  }

  getTtmmi(): Observable<any> {
    return this.get('/api/ttmmi');
  }

  getNtVolume(): Observable<any> {
    return this.get('/api/nt/volume');
  }

  getTlIndexParams(tlid: string): Observable<any> {
    return this.get(`/api/tl/index/${tlid}`);
  }

  getInvestingIndicators(indexid: string, duration: string): Observable<any> {
    return this.get(`/api/investing/indicators/${indexid}/${duration}`);
  }

  getNtNiftyPcrDetails(): Observable<any> {
    return this.get('/api/nt/nifty/pcr');
  }

  getKotakScore(stock: string): Observable<any> {
    return this.get(`/api/kotak/score/${stock}`);
  }

  getKotakSectorView(sector: string): Observable<any> {
    return this.get(`/api/kotak/sector/${sector}`);
  }

  getGNewsApi(bqnames: string, dateday5: string, datetoday: string): Observable<any> {
    return this.get(`/api/gnews/${bqnames}/${dateday5}/${datetoday}`);
  }

  getOpstraStockPcr(eqsymbol: string): Observable<any> {
    return this.get(`/api/opstra/stock/pcr/${eqsymbol}`);
  }

  getOpstraStockPcrIntra(eqsymbol: string): Observable<any> {
    return this.get(`/api/opstra/stock/pcr/intra/${eqsymbol}`);
  }

  getNtStock1Yr(eqsymbol: string): Observable<any> {
    return this.get(`/api/nt/stock/1yr/${eqsymbol}`);
  }

  getMmData(stockid: string): Observable<any> {
    return this.get(`/api/mm/data/${stockid}`);
  }

  getMmValuation(stockid: string): Observable<any> {
    return this.get(`/api/mm/valuation/${stockid}`);
  }

  getNtStockDetails(eqsymbol: string): Observable<any> {
    return this.get(`/api/nt/stock/details/${eqsymbol}`);
  }

  getNtStockPcrDetails(eqsymbol: string): Observable<any> {
    return this.get(`/api/nt/stock/pcr/${eqsymbol}`);
  }

  getTrendlyne3Fetch(tlid: string, tlname: string, eqsymbol: string): Observable<any> {
    return this.get(`/api/tl/3fetch/${tlid}/${tlname}/${eqsymbol}`);
  }

  getTrendlyne2Fetch(tlid: string): Observable<any> {
    return this.get(`/api/tl/2fetch/${tlid}`);
  }

  getOpstraRefresh(): Observable<any> {
    return this.get('/api/opstra/refresh');
  }

  getTlScreeners(filter: string): Observable<ScreenerData[]> {
    return this.get(`/api/tl/screeners/${filter}`);
  }

  getTlDvm(): Observable<any> {
    return this.get('/api/tl/dvm');
  }

  getTtVolume(): Observable<any> {
    return this.get('/api/tt/volume');
  }

  getEtIndicesData(): Observable<any> {
    return this.get('/api/et/indices');
  }

  getEtAllSectorsData(): Observable<any> {
    return this.get('/api/et/sectors');
  }

  getEtPredefinedFilters(selectedValue: string, filter: string, order: string): Observable<any> {
    return this.get(`/api/et/filters/${selectedValue}/${filter}/${order}`);
  }

  getEtStockScoreScreeners(selectedValue: string, filter: string, order: string): Observable<any> {
    return this.get(`/api/et/stockscore/${selectedValue}/${filter}/${order}`);
  }

  getNtGlobal(): Observable<GlobalMarketData[]> {
    return this.get('/api/nt/global');
  }

  getTlBuildup(tlid: string): Observable<any> {
    return this.get(`/api/tl/buildup/${tlid}`);
  }

  getTlBuildup5(): Observable<any> {
    return this.get('/api/tl/buildup5');
  }

  getNtVolumeRead(): Observable<any> {
    return this.get('/api/nt/volume/read');
  }

  getNtBankNiftyPcrDetails(): Observable<any> {
    return this.get('/api/nt/banknifty/pcr');
  }

  getNiftyData(): Observable<IndexData> {
    return this.get('/api/nifty');
  }

  getBankNiftyData(): Observable<IndexData> {
    return this.get('/api/banknifty');
  }

  getPharmaNiftyData(): Observable<IndexData> {
    return this.get('/api/pharmanifty');
  }

  getSectorsData(): Observable<SectorData[]> {
    return this.get('/api/sectors');
  }

  getScreenerResults(criteria: ScreenerCriteria): Observable<StockData[]> {
    return this.post('/api/screener', criteria);
  }

  getStockAnalytics(symbol: string): Observable<any> {
    return this.get(`/api/stock/analytics/${symbol}`);
  }

  private fetchNiftyData(): Observable<IndexData> {
    return this.get('/api/nifty');
  }

  private fetchBankNiftyData(): Observable<IndexData> {
    return this.get('/api/banknifty');
  }

  private fetchPharmaNiftyData(): Observable<IndexData> {
    return this.get('/api/pharmanifty');
  }

  private fetchSectorsData(): Observable<SectorData[]> {
    return this.get('/api/sectors');
  }

  clearCache(): void {
    this.cache.clear();
  }

  ngOnDestroy(): void {
    if (this.wsSubject) {
      this.wsSubject.complete();
    }
  }

  getAnalyticsData(): Observable<any> {
    return this.get('/api/analytics');
  }

  getScreenerData(filters: Record<string, any>): Observable<StockData[]> {
    return this.post('/api/screener', filters);
  }

  getStockData(type: string): Observable<StockData[]> {
    return this.get(`/api/stock/${type}`);
  }

  getIndexData(symbol: string): Observable<IndexData> {
    return of({} as IndexData);
  }

  getGlobalMarketData(): Observable<GlobalMarketData[]> {
    return of([]);
  }

  getSectorData(): Observable<SectorData[]> {
    return of([]);
  }
} 