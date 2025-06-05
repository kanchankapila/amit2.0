import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Store the attempted URL for redirecting
  authService.redirectUrl = state.url;

  // Navigate to the login page
  return router.createUrlTree(['/auth/login']);
};

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    return true;
  }

  // If user is already authenticated, redirect to dashboard
  return router.createUrlTree(['/dashboard']);
}; 