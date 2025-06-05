import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoggingService } from '../../services/logging.service';
import { AppStateService } from '../state/app.state';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  redirectUrl: string | null = null;

  constructor(
    private http: HttpClient,
    private logger: LoggingService,
    private appState: AppStateService,
    private router: Router
  ) {
    this.checkAuthStatus();
  }

  login(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<AuthResponse>(`${environment.apiUrl}/auth-login`, { email, password })
        .pipe(
          tap(response => {
            localStorage.setItem('token', response.token);
            this.currentUserSubject.next(response.user);
            this.isAuthenticatedSubject.next(true);
            this.appState.setUser(response.user);
          }),
          catchError(error => {
            this.logger.error('Login error:', error);
            this.logout();
            reject(error);
            return of(null);
          })
        )
        .subscribe(() => {
          resolve();
        });
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.appState.setUser(null);
    this.logger.info('User logged out successfully');
    this.router.navigate(['/auth/login']);
  }

  register(name: string, email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, {
        email,
        password,
        name
      }).pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);
          this.appState.setUser(response.user);
        }),
        catchError(error => {
          this.logger.error('Registration error:', error);
          this.logout();
          reject(error);
          return of(null);
        })
      ).subscribe(() => {
        resolve();
      });
    });
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get<User>(`${environment.apiUrl}/auth/me`)
        .pipe(
          tap(user => {
            this.currentUserSubject.next(user);
            this.isAuthenticatedSubject.next(true);
            this.appState.setUser(user);
          }),
          catchError(() => {
            this.logout();
            return of(null);
          })
        )
        .subscribe();
    }
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return !!token && !this.isTokenExpired(token);
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh-token`, {})
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);
        }),
        catchError(error => {
          this.logger.error('Token refresh failed:', error);
          this.logout();
          return this.handleAuthError(error);
        })
      );
  }

  private handleAuthError(error: any): Observable<never> {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.appState.setUser(null);
    throw error;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Date.now() / 1000;
    } catch (error) {
      this.logger.error('Token validation failed:', error);
      return true;
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  forgotPassword(email: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
} 