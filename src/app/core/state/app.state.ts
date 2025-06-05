import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  roles?: string[];
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  sidenavOpen: boolean;
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date;
}

const initialState: AppState = {
  user: null,
  theme: 'light',
  sidenavOpen: true,
  notifications: [],
  isLoading: false,
  error: null,
  lastUpdated: new Date()
};

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private state = new BehaviorSubject<AppState>(initialState);

  // Selectors
  get state$(): Observable<AppState> {
    return this.state.asObservable();
  }

  get currentState(): AppState {
    return this.state.getValue();
  }

  getUser(): User | null {
    return this.currentState.user;
  }

  getTheme(): 'light' | 'dark' {
    return this.currentState.theme;
  }

  getNotifications(): Observable<Notification[]> {
    return this.state.pipe(
      map(state => state.notifications),
      distinctUntilChanged()
    );
  }

  getIsLoading(): Observable<boolean> {
    return this.state.pipe(
      map(state => state.isLoading),
      distinctUntilChanged()
    );
  }

  getError(): Observable<string | null> {
    return this.state.pipe(
      map(state => state.error),
      distinctUntilChanged()
    );
  }

  // User state
  setUser(user: User | null): void {
    this.updateState({ user });
  }

  // Theme state
  setTheme(theme: 'light' | 'dark'): void {
    this.updateState({ theme });
    localStorage.setItem('theme', theme);
  }

  // Sidenav state
  setSidenavOpen(isOpen: boolean): void {
    this.updateState({ sidenavOpen: isOpen });
  }

  getSidenavOpen(): boolean {
    return this.currentState.sidenavOpen;
  }

  // State Updates
  addNotification(notification: Omit<Notification, 'id' | 'timestamp'>): void {
    const newNotification: Notification = {
      ...notification,
      id: this.generateId(),
      timestamp: new Date(),
    };

    this.updateState({
      notifications: [...this.currentState.notifications, newNotification]
    });
  }

  markNotificationAsRead(id: string): void {
    const notifications = this.currentState.notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );

    this.updateState({ notifications });
  }

  removeNotification(id: string): void {
    const notifications = this.currentState.notifications.filter(
      notification => notification.id !== id
    );

    this.updateState({ notifications });
  }

  setLoading(isLoading: boolean): void {
    this.updateState({ isLoading });
  }

  setError(error: string | null): void {
    this.updateState({ error });
  }

  resetState(): void {
    this.state.next(initialState);
  }

  // Helper Methods
  private updateState(newState: Partial<AppState>): void {
    this.state.next({
      ...this.currentState,
      ...newState,
      lastUpdated: new Date()
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Initialize state from storage
  initializeState(): void {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }
} 