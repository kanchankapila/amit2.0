# Data API Service

## Overview
The Data API Service is responsible for handling all market data-related API calls in the StockInsights application. It provides a centralized interface for fetching real-time market data, stock information, and sector performance metrics.

## Features

### 1. Market Data
- Real-time market overview
- Top gainers and losers
- Sector performance
- Market indices

### 2. Stock Data
- Individual stock details
- Price history
- Technical indicators
- Company information

### 3. Portfolio Data
- User portfolio management
- Portfolio performance
- Holdings information
- Transaction history

## Technical Implementation

### Service Structure
```typescript
@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}
}
```

### Core Methods

#### Market Overview
```typescript
getMarketOverview(): Observable<any> {
  return this.http.get(`${this.baseUrl}/market/overview`)
    .pipe(catchError(error => this.errorHandler.handleError(error)));
}
```

#### Top Gainers/Losers
```typescript
getTopGainers(timeframe: string = '1d'): Observable<any> {
  return this.http.get(`${this.baseUrl}/market/gainers`, { params: { timeframe } })
    .pipe(catchError(error => this.errorHandler.handleError(error)));
}

getTopLosers(timeframe: string = '1d'): Observable<any> {
  return this.http.get(`${this.baseUrl}/market/losers`, { params: { timeframe } })
    .pipe(catchError(error => this.errorHandler.handleError(error)));
}
```

#### Stock Details
```typescript
getStockDetails(symbol: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/stocks/${symbol}`)
    .pipe(catchError(error => this.errorHandler.handleError(error)));
}

getStockPrice(symbol: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/stocks/${symbol}/price`)
    .pipe(catchError(error => this.errorHandler.handleError(error)));
}
```

## API Response Types

### Market Overview Response
```typescript
interface MarketOverview {
  currentValue: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: string;
  historicalData: HistoricalDataPoint[];
}

interface HistoricalDataPoint {
  date: string;
  value: number;
  volume: number;
}
```

### Stock Data Response
```typescript
interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  dividend: number;
}
```

## Error Handling

### Error Types
```typescript
interface ApiError {
  status: number;
  message: string;
  code: string;
  timestamp: string;
}
```

### Error Handling Implementation
```typescript
private handleApiError(error: HttpErrorResponse): Observable<never> {
  let errorMessage: string;

  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = error.error.message;
  } else {
    // Server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }

  return throwError(() => new Error(errorMessage));
}
```

## Usage Example

```typescript
// Component Implementation
export class MarketComponent implements OnInit {
  constructor(private dataApi: DataApiService) {}

  ngOnInit() {
    this.dataApi.getMarketOverview().subscribe({
      next: (data) => {
        // Handle market data
      },
      error: (error) => {
        // Handle error
      }
    });
  }
}
```

## Performance Optimization

### 1. Caching Strategy
- In-memory caching
- Cache invalidation
- Cache refresh policies
- Optimistic updates

### 2. Request Optimization
- Request debouncing
- Request throttling
- Batch requests
- Data pagination

### 3. Error Recovery
- Automatic retry
- Fallback mechanisms
- Graceful degradation
- Error boundaries

## Testing

### Unit Tests
```typescript
describe('DataApiService', () => {
  let service: DataApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataApiService, ErrorHandlerService]
    });
    service = TestBed.inject(DataApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch market overview', () => {
    // Test implementation
  });
});
```

## Best Practices

### 1. API Design
- RESTful principles
- Consistent error handling
- Proper status codes
- Clear documentation

### 2. Performance
- Efficient data fetching
- Response caching
- Request optimization
- Error recovery

### 3. Security
- Data encryption
- Input validation
- Output sanitization
- Rate limiting

### 4. Code Quality
- Type safety
- Error handling
- Unit testing
- Documentation

## Dependencies

- @angular/core
- @angular/common/http
- rxjs
- environment configuration

## Configuration

### Environment Settings
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://api.example.com',
  apiConfig: {
    timeout: 30000,
    retryAttempts: 3,
    cacheTime: 300000
  }
};
```

## API Endpoints

### Market Data
- GET `/market/overview`
- GET `/market/gainers`
- GET `/market/losers`
- GET `/market/sectors`
- GET `/market/indices`

### Stock Data
- GET `/stocks/:symbol`
- GET `/stocks/:symbol/price`
- GET `/stocks/:symbol/history`
- GET `/stocks/:symbol/indicators`

### Portfolio Data
- GET `/portfolio`
- POST `/portfolio/transaction`
- GET `/portfolio/performance`
- GET `/portfolio/holdings` 