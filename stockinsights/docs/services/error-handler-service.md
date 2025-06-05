# Error Handler Service

## Overview
The Error Handler Service provides centralized error handling and logging functionality for the StockInsights application. It ensures consistent error handling across the application and provides meaningful error messages to users while logging detailed error information for debugging.

## Features

### 1. Error Handling
- Centralized error handling
- HTTP error handling
- Client-side error handling
- Network error detection

### 2. Error Logging
- Error logging with LoggingService integration
- Error categorization
- Stack trace preservation
- Error context capture

### 3. User Feedback
- User-friendly error messages
- Error recovery suggestions
- Localized error messages
- Error severity levels

## Technical Implementation

### Service Structure
```typescript
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private loggingService: LoggingService) {}
}
```

### Core Methods

#### Handle Error with Observable Return
```typescript
handleError(error: Error | HttpErrorResponse): Observable<never> {
  let errorMessage: string;

  if (error instanceof HttpErrorResponse) {
    // Server or connection error
    if (!navigator.onLine) {
      errorMessage = 'No Internet Connection';
    } else {
      errorMessage = error.error?.message || `${error.status} - ${error.statusText}`;
    }
  } else {
    // Client-side error
    errorMessage = error.message || error.toString();
  }

  // Log the error
  this.loggingService.error('An error occurred:', error);

  // Return an observable with a user-facing error message
  return throwError(() => ({
    message: errorMessage,
    timestamp: new Date(),
    type: error instanceof HttpErrorResponse ? 'HTTP' : 'Client'
  }));
}
```

#### Handle Error Without Rethrowing
```typescript
handleErrorWithoutRethrowing(error: Error | HttpErrorResponse): void {
  this.loggingService.error('An error occurred:', error);
}
```

## Error Types

### HTTP Errors
```typescript
interface HttpError {
  status: number;
  statusText: string;
  message: string;
  url: string;
  timestamp: Date;
}
```

### Client Errors
```typescript
interface ClientError {
  message: string;
  stack?: string;
  timestamp: Date;
  context?: any;
}
```

### User-Facing Error
```typescript
interface UserError {
  message: string;
  timestamp: Date;
  type: 'HTTP' | 'Client';
  recoverySteps?: string[];
}
```

## Usage Example

### In Services
```typescript
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private errorHandler: ErrorHandlerService) {}

  fetchData(): Observable<any> {
    return this.http.get('/api/data').pipe(
      catchError(error => this.errorHandler.handleError(error))
    );
  }
}
```

### In Components
```typescript
@Component({
  selector: 'app-data-display',
  template: `
    <div *ngIf="error">
      <error-message [error]="error"></error-message>
    </div>
  `
})
export class DataDisplayComponent {
  constructor(private errorHandler: ErrorHandlerService) {}

  handleError(error: any): void {
    this.errorHandler.handleErrorWithoutRethrowing(error);
  }
}
```

## Error Recovery Strategies

### 1. Automatic Retry
```typescript
retryWithBackoff(maxRetries: number = 3): MonoTypeOperatorFunction<any> {
  return retryWhen(errors =>
    errors.pipe(
      concatMap((error, index) => {
        const retryAttempt = index + 1;
        if (retryAttempt > maxRetries) {
          return throwError(() => error);
        }
        return timer(Math.pow(2, retryAttempt) * 1000);
      })
    )
  );
}
```

### 2. Fallback Values
```typescript
provideFallback<T>(fallbackValue: T): OperatorFunction<T, T> {
  return catchError(() => of(fallbackValue));
}
```

### 3. Cache Recovery
```typescript
recoverFromCache<T>(cacheKey: string): OperatorFunction<T, T> {
  return catchError(() => {
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      return of(JSON.parse(cachedData));
    }
    throw new Error('No cached data available');
  });
}
```

## Testing

### Unit Tests
```typescript
describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let loggingService: LoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorHandlerService,
        {
          provide: LoggingService,
          useValue: jasmine.createSpyObj('LoggingService', ['error'])
        }
      ]
    });
    service = TestBed.inject(ErrorHandlerService);
    loggingService = TestBed.inject(LoggingService);
  });

  it('should handle HTTP errors', () => {
    const httpError = new HttpErrorResponse({
      error: 'test error',
      status: 404,
      statusText: 'Not Found'
    });

    service.handleError(httpError).subscribe({
      error: (error) => {
        expect(error.type).toBe('HTTP');
        expect(error.message).toContain('404');
      }
    });
  });
});
```

## Best Practices

### 1. Error Handling
- Always provide user-friendly messages
- Log detailed error information
- Implement proper error recovery
- Handle all error types

### 2. Performance
- Avoid excessive error logging
- Implement proper retry strategies
- Use appropriate error recovery
- Cache error responses when appropriate

### 3. Security
- Sanitize error messages
- Hide sensitive information
- Implement rate limiting
- Log security-related errors

### 4. Code Quality
- Consistent error format
- Clear error messages
- Proper error typing
- Comprehensive testing

## Dependencies

- @angular/core
- @angular/common/http
- rxjs
- LoggingService

## Configuration

### Error Configuration
```typescript
interface ErrorConfig {
  maxRetries: number;
  retryDelay: number;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  enableStackTrace: boolean;
}

const defaultErrorConfig: ErrorConfig = {
  maxRetries: 3,
  retryDelay: 1000,
  logLevel: 'error',
  enableStackTrace: true
};
```

## Integration with Other Services

### 1. Logging Service
- Error logging
- Error tracking
- Error analytics
- Error reporting

### 2. Notification Service
- User notifications
- Error alerts
- Toast messages
- Error status updates

### 3. State Management
- Error state management
- Error recovery state
- Error persistence
- Error synchronization 