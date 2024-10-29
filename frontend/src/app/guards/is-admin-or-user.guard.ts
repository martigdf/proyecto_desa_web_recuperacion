import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isAdminOrUserGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isValidUser()) {
    return true;
  }
  if(authService.isAdmin()){
    router.navigate(['admin-panel']);
    return false;
  }
  router.navigate(['all-properties']);
  return false;
};
