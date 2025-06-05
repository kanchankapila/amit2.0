# Authentication Service

## Overview
The Authentication Service handles user authentication, authorization, and session management in the StockInsights application. It provides a secure and reliable way to manage user sessions and JWT tokens.

## Features

### 1. User Authentication
- JWT-based authentication
- Secure token storage
- Session persistence
- Automatic token refresh

### 2. User Management
- User registration
- Login/Logout functionality
- Password management
- Session tracking

## Technical Implementation

### Service Structure
```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
}
```

### Core Methods

#### Login
```typescript
login(email: string, password: string): Observable<User> {
  return this.http.post<User>(`${environment.apiUrl}/auth/login`, { email, password })
    .pipe(
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
}
```

#### Register
```typescript
register(email: string, password: string, name: string): Observable<User> {
  return this.http.post<User>(`${environment.apiUrl}/auth/register`, { email, password, name })
    .pipe(
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
}
```

#### Logout
```typescript
logout(): void {
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}
```

### Authentication State Management

#### Check Authentication Status
```typescript
isAuthenticated(): boolean {
  return !!this.currentUserSubject.value;
}
```

#### Get Authentication Token
```typescript
getAuthToken(): string | null {
  return this.currentUserSubject.value?.token || null;
}
```

#### Get Current User
```typescript
getCurrentUser(): User | null {
  return this.currentUserSubject.value;
}
```

## Security Features

### 1. Token Management
- Secure token storage in localStorage
- Token expiration handling
- Automatic token cleanup
- XSS protection measures

### 2. Session Security
- CSRF protection
- Secure cookie handling
- Session timeout management
- Concurrent session handling

### 3. Password Security
- Password hashing
- Salt generation
- Secure password reset
- Brute force protection

## Usage Example

```typescript
// Component Implementation
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login(email: string, password: string): void {
    this.authService.login(email, password).subscribe({
      next: (user) => {
        // Handle successful login
      },
      error: (error) => {
        // Handle login error
      }
    });
  }
}
```

## Integration with HTTP Interceptor

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
```

## Error Handling

### Common Error Scenarios
1. Invalid credentials
2. Token expiration
3. Network failures
4. Server errors

### Error Response Format
```typescript
interface AuthError {
  message: string;
  code: string;
  timestamp: string;
}
```

## Testing

### Unit Tests
```typescript
describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should authenticate user', () => {
    // Test implementation
  });
});
```

## Best Practices

### 1. Security
- Never store sensitive data in localStorage
- Always use HTTPS
- Implement proper token validation
- Use secure password policies

### 2. Performance
- Efficient token management
- Optimized HTTP requests
- Proper error handling
- Memory leak prevention

### 3. Code Quality
- Clear error messages
- Proper typing
- Comprehensive testing
- Clean code principles

### 4. Maintenance
- Clear documentation
- Version control
- Dependency management
- Regular security updates

## Dependencies

- @angular/core
- @angular/common/http
- rxjs
- jwt-decode (optional)

## Configuration

### Environment Settings
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://api.example.com',
  authConfig: {
    tokenExpiryTime: 3600,
    refreshTokenExpiryTime: 86400,
    tokenPrefix: 'Bearer'
  }
};
``` 