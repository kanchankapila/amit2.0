import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  close: number;
  timestamp: Date;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {
  private wsSubject: WebSocketSubject<any> | null = null;
  private marketDataSubject = new BehaviorSubject<MarketData[]>([]);
  private marketIndicesSubject = new BehaviorSubject<MarketIndex[]>([]);

  constructor(private http: HttpClient) {
    this.initializeWebSocket();
  }

  private initializeWebSocket(): void {
    if (!this.wsSubject) {
      this.wsSubject = webSocket({
        url: environment.wsUrl + '/market-data',
        openObserver: {
          next: () => {
            console.log('WebSocket connection established');
            this.subscribeToMarketData();
          }
        },
        closeObserver: {
          next: () => {
            console.log('WebSocket connection closed');
            this.reconnectWebSocket();
          }
        }
      });

      this.wsSubject.pipe(
        tap(data => this.handleWebSocketMessage(data)),
        catchError(error => {
          console.error('WebSocket error:', error);
          this.reconnectWebSocket();
          throw error;
        })
      ).subscribe();
    }
  }

  private reconnectWebSocket(): void {
    timer(5000).subscribe(() => {
      console.log('Attempting to reconnect WebSocket...');
      this.initializeWebSocket();
    });
  }

  private handleWebSocketMessage(message: any): void {
    switch (message.type) {
      case 'marketData':
        this.marketDataSubject.next(message.data);
        break;
      case 'marketIndices':
        this.marketIndicesSubject.next(message.data);
        break;
      default:
        console.warn('Unknown message type:', message.type);
    }
  }

  private subscribeToMarketData(): void {
    if (this.wsSubject) {
      this.wsSubject.next({ type: 'subscribe', symbols: ['NIFTY50', 'SENSEX'] });
    }
  }

  getMarketData(symbol: string): Observable<MarketData> {
    return this.http.get<MarketData>(`${environment.apiUrl}/market-data/${symbol}`).pipe(
      catchError(error => {
        console.error('Error fetching market data:', error);
        throw error;
      })
    );
  }

  getMarketIndices(): Observable<MarketIndex[]> {
    return this.marketIndicesSubject.asObservable();
  }

  getLiveMarketData(): Observable<MarketData[]> {
    return this.marketDataSubject.asObservable();
  }

  getHistoricalData(symbol: string, interval: string, from: Date, to: Date): Observable<MarketData[]> {
    return this.http.get<MarketData[]>(`${environment.apiUrl}/market-data/historical`, {
      params: {
        symbol,
        interval,
        from: from.toISOString(),
        to: to.toISOString()
      }
    }).pipe(
      map(data => data.map(item => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }))),
      catchError(error => {
        console.error('Error fetching historical data:', error);
        throw error;
      })
    );
  }

  searchSymbols(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/market-data/search`, {
      params: { q: query }
    }).pipe(
      catchError(error => {
        console.error('Error searching symbols:', error);
        throw error;
      })
    );
  }

  ngOnDestroy(): void {
    if (this.wsSubject) {
      this.wsSubject.complete();
    }
  }
} 