import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MarketDataService } from './market-data.service';

export interface PortfolioHolding {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  change: number;
  value: number;
  pl: number;
  plPercentage: number;
}

export interface PortfolioSummary {
  totalValue: number;
  totalInvestment: number;
  totalPL: number;
  plPercentage: number;
  dayPL: number;
  dayPLPercentage: number;
}

export interface Transaction {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  timestamp: Date;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private holdingsSubject = new BehaviorSubject<PortfolioHolding[]>([]);
  private summarySubject = new BehaviorSubject<PortfolioSummary | null>(null);

  holdings$ = this.holdingsSubject.asObservable();
  summary$ = this.summarySubject.asObservable();

  constructor(
    private http: HttpClient,
    private marketDataService: MarketDataService
  ) {
    this.initializePortfolio();
  }

  private initializePortfolio(): void {
    this.fetchPortfolio().pipe(
      switchMap(holdings => {
        return combineLatest([
          this.marketDataService.getLiveMarketData(),
          this.holdingsSubject
        ]).pipe(
          map(([marketData, holdings]) => {
            return holdings.map(holding => {
              const marketInfo = marketData.find(m => m.symbol === holding.symbol);
              if (marketInfo) {
                const currentPrice = marketInfo.price;
                const value = currentPrice * holding.quantity;
                const pl = value - (holding.avgPrice * holding.quantity);
                const plPercentage = (pl / (holding.avgPrice * holding.quantity)) * 100;

                return {
                  ...holding,
                  currentPrice,
                  change: marketInfo.change,
                  value,
                  pl,
                  plPercentage
                };
              }
              return holding;
            });
          })
        );
      })
    ).subscribe(updatedHoldings => {
      this.holdingsSubject.next(updatedHoldings);
      this.updateSummary(updatedHoldings);
    });
  }

  private fetchPortfolio(): Observable<PortfolioHolding[]> {
    return this.http.get<PortfolioHolding[]>(`${environment.apiUrl}/portfolio/holdings`).pipe(
      tap(holdings => this.holdingsSubject.next(holdings)),
      catchError(error => {
        console.error('Error fetching portfolio:', error);
        throw error;
      })
    );
  }

  private updateSummary(holdings: PortfolioHolding[]): void {
    const summary: PortfolioSummary = {
      totalValue: holdings.reduce((sum, h) => sum + h.value, 0),
      totalInvestment: holdings.reduce((sum, h) => sum + (h.avgPrice * h.quantity), 0),
      totalPL: holdings.reduce((sum, h) => sum + h.pl, 0),
      plPercentage: 0,
      dayPL: holdings.reduce((sum, h) => sum + (h.change * h.quantity), 0),
      dayPLPercentage: 0
    };

    summary.plPercentage = (summary.totalPL / summary.totalInvestment) * 100;
    summary.dayPLPercentage = (summary.dayPL / summary.totalValue) * 100;

    this.summarySubject.next(summary);
  }

  addTransaction(transaction: Omit<Transaction, 'id'>): Observable<Transaction> {
    return this.http.post<Transaction>(`${environment.apiUrl}/portfolio/transactions`, transaction).pipe(
      tap(() => this.fetchPortfolio().subscribe()),
      catchError(error => {
        console.error('Error adding transaction:', error);
        throw error;
      })
    );
  }

  getTransactions(filters?: {
    symbol?: string;
    type?: 'BUY' | 'SELL';
    fromDate?: Date;
    toDate?: Date;
  }): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.apiUrl}/portfolio/transactions`, {
      params: {
        ...(filters?.symbol && { symbol: filters.symbol }),
        ...(filters?.type && { type: filters.type }),
        ...(filters?.fromDate && { from: filters.fromDate.toISOString() }),
        ...(filters?.toDate && { to: filters.toDate.toISOString() })
      }
    }).pipe(
      map(transactions => transactions.map(t => ({
        ...t,
        timestamp: new Date(t.timestamp)
      }))),
      catchError(error => {
        console.error('Error fetching transactions:', error);
        throw error;
      })
    );
  }

  getPortfolioPerformance(interval: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/portfolio/performance`, {
      params: { interval }
    }).pipe(
      catchError(error => {
        console.error('Error fetching portfolio performance:', error);
        throw error;
      })
    );
  }
} 