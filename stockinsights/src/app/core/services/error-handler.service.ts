import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private loggingService: LoggingService) {}

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

  handleErrorWithoutRethrowing(error: Error | HttpErrorResponse): void {
    this.loggingService.error('An error occurred:', error);
  }
} 