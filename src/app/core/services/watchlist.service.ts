import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MarketDataService } from './market-data.service';

export interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  isAlertSet: boolean;
  alerts?: PriceAlert[];
}

export interface Watchlist {
  id: string;
  name: string;
  items: WatchlistItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PriceAlert {
  id: string;
  symbol: string;
  type: 'above' | 'below';
  price: number;
  isActive: boolean;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlistsSubject = new BehaviorSubject<Watchlist[]>([]);
  private selectedWatchlistSubject = new BehaviorSubject<Watchlist | null>(null);

  watchlists$ = this.watchlistsSubject.asObservable();
  selectedWatchlist$ = this.selectedWatchlistSubject.asObservable();

  constructor(
    private http: HttpClient,
    private marketDataService: MarketDataService
  ) {
    this.initializeWatchlists();
  }

  private initializeWatchlists(): void {
    this.fetchWatchlists().pipe(
      switchMap(watchlists => {
        return combineLatest([
          this.marketDataService.getLiveMarketData(),
          this.watchlistsSubject
        ]).pipe(
          map(([marketData, watchlists]) => {
            return watchlists.map(watchlist => ({
              ...watchlist,
              items: watchlist.items.map(item => {
                const marketInfo = marketData.find(m => m.symbol === item.symbol);
                return marketInfo ? {
                  ...item,
                  price: marketInfo.price,
                  change: marketInfo.change,
                  volume: marketInfo.volume
                } : item;
              })
            }));
          })
        );
      })
    ).subscribe(updatedWatchlists => {
      this.watchlistsSubject.next(updatedWatchlists);
      if (!this.selectedWatchlistSubject.value && updatedWatchlists.length > 0) {
        this.selectedWatchlistSubject.next(updatedWatchlists[0]);
      }
    });
  }

  private fetchWatchlists(): Observable<Watchlist[]> {
    return this.http.get<Watchlist[]>(`${environment.apiUrl}/watchlists`).pipe(
      map(watchlists => watchlists.map(w => ({
        ...w,
        createdAt: new Date(w.createdAt),
        updatedAt: new Date(w.updatedAt)
      }))),
      tap(watchlists => this.watchlistsSubject.next(watchlists)),
      catchError(error => {
        console.error('Error fetching watchlists:', error);
        throw error;
      })
    );
  }

  createWatchlist(name: string): Observable<Watchlist> {
    return this.http.post<Watchlist>(`${environment.apiUrl}/watchlists`, { name }).pipe(
      tap(watchlist => {
        const currentWatchlists = this.watchlistsSubject.value;
        this.watchlistsSubject.next([...currentWatchlists, watchlist]);
      }),
      catchError(error => {
        console.error('Error creating watchlist:', error);
        throw error;
      })
    );
  }

  deleteWatchlist(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/watchlists/${id}`).pipe(
      tap(() => {
        const currentWatchlists = this.watchlistsSubject.value;
        this.watchlistsSubject.next(currentWatchlists.filter(w => w.id !== id));
        if (this.selectedWatchlistSubject.value?.id === id) {
          this.selectedWatchlistSubject.next(currentWatchlists[0] || null);
        }
      }),
      catchError(error => {
        console.error('Error deleting watchlist:', error);
        throw error;
      })
    );
  }

  addToWatchlist(watchlistId: string, symbol: string, name: string): Observable<WatchlistItem> {
    return this.http.post<WatchlistItem>(`${environment.apiUrl}/watchlists/${watchlistId}/items`, {
      symbol,
      name
    }).pipe(
      tap(() => this.fetchWatchlists().subscribe()),
      catchError(error => {
        console.error('Error adding to watchlist:', error);
        throw error;
      })
    );
  }

  removeFromWatchlist(watchlistId: string, symbol: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/watchlists/${watchlistId}/items/${symbol}`).pipe(
      tap(() => this.fetchWatchlists().subscribe()),
      catchError(error => {
        console.error('Error removing from watchlist:', error);
        throw error;
      })
    );
  }

  setPriceAlert(watchlistId: string, alert: Omit<PriceAlert, 'id' | 'createdAt'>): Observable<PriceAlert> {
    return this.http.post<PriceAlert>(`${environment.apiUrl}/watchlists/${watchlistId}/alerts`, alert).pipe(
      tap(() => this.fetchWatchlists().subscribe()),
      catchError(error => {
        console.error('Error setting price alert:', error);
        throw error;
      })
    );
  }

  deletePriceAlert(watchlistId: string, alertId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/watchlists/${watchlistId}/alerts/${alertId}`).pipe(
      tap(() => this.fetchWatchlists().subscribe()),
      catchError(error => {
        console.error('Error deleting price alert:', error);
        throw error;
      })
    );
  }

  selectWatchlist(watchlist: Watchlist): void {
    this.selectedWatchlistSubject.next(watchlist);
  }
} 