import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loadingMap = new Map<string, boolean>();

  isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  show(): void {
    this.start('global');
  }

  hide(): void {
    this.stop('global');
  }

  start(key: string): void {
    this.loadingMap.set(key, true);
    this.updateLoadingState();
  }

  stop(key: string): void {
    this.loadingMap.delete(key);
    this.updateLoadingState();
  }

  private updateLoadingState(): void {
    this.loadingSubject.next(this.loadingMap.size > 0);
  }
} 