import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isAdmin()){
    return true;
  }
  window.alert('No tienes permisos para acceder a esta página');
  router.navigate(['all-properties']);
  return false;
};
