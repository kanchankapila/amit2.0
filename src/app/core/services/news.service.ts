import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  imageUrl?: string;
  category: 'market' | 'company' | 'economy' | 'commodity';
  impact: 'high' | 'medium' | 'low';
  symbols?: string[];
  timestamp: Date;
}

export interface NewsFilter {
  category?: string;
  symbol?: string;
  impact?: string;
  fromDate?: Date;
  toDate?: Date;
  source?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private newsSubject = new BehaviorSubject<NewsItem[]>([]);
  private newsStreamSubject = new BehaviorSubject<NewsItem[]>([]);

  news$ = this.newsSubject.asObservable();
  newsStream$ = this.newsStreamSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeNewsStream();
  }

  private initializeNewsStream(): void {
    // Initialize WebSocket connection for real-time news
    const ws = new WebSocket(environment.wsUrl + '/news');

    ws.onmessage = (event) => {
      const newsItem: NewsItem = JSON.parse(event.data);
      const currentNews = this.newsStreamSubject.value;
      this.newsStreamSubject.next([newsItem, ...currentNews].slice(0, 50)); // Keep last 50 news items
    };

    ws.onclose = () => {
      console.log('News WebSocket connection closed');
      // Implement reconnection logic
      setTimeout(() => this.initializeNewsStream(), 5000);
    };
  }

  getNews(filters?: NewsFilter): Observable<NewsItem[]> {
    const params: any = {};

    if (filters) {
      if (filters.category) params.category = filters.category;
      if (filters.symbol) params.symbol = filters.symbol;
      if (filters.impact) params.impact = filters.impact;
      if (filters.source) params.source = filters.source;
      if (filters.fromDate) params.from = filters.fromDate.toISOString();
      if (filters.toDate) params.to = filters.toDate.toISOString();
    }

    return this.http.get<NewsItem[]>(`${environment.apiUrl}/news`, { params }).pipe(
      map(news => news.map(item => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }))),
      tap(news => this.newsSubject.next(news)),
      catchError(error => {
        console.error('Error fetching news:', error);
        throw error;
      })
    );
  }

  getNewsById(id: string): Observable<NewsItem> {
    return this.http.get<NewsItem>(`${environment.apiUrl}/news/${id}`).pipe(
      map(news => ({
        ...news,
        timestamp: new Date(news.timestamp)
      })),
      catchError(error => {
        console.error('Error fetching news item:', error);
        throw error;
      })
    );
  }

  getNewsBySymbol(symbol: string): Observable<NewsItem[]> {
    return this.getNews({ symbol });
  }

  getMarketNews(): Observable<NewsItem[]> {
    return this.getNews({ category: 'market' });
  }

  getEconomyNews(): Observable<NewsItem[]> {
    return this.getNews({ category: 'economy' });
  }

  getHighImpactNews(): Observable<NewsItem[]> {
    return this.getNews({ impact: 'high' });
  }

  searchNews(query: string): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(`${environment.apiUrl}/news/search`, {
      params: { q: query }
    }).pipe(
      map(news => news.map(item => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }))),
      catchError(error => {
        console.error('Error searching news:', error);
        throw error;
      })
    );
  }

  getNewsSources(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/news/sources`).pipe(
      catchError(error => {
        console.error('Error fetching news sources:', error);
        throw error;
      })
    );
  }

  getNewsCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/news/categories`).pipe(
      catchError(error => {
        console.error('Error fetching news categories:', error);
        throw error;
      })
    );
  }
} 