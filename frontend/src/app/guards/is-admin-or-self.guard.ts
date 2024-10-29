import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

export const isAdminOrSelfGuard: CanActivateFn = (route, state) => {
  const auth = new AuthService();
  const router = new Router();

  if (auth.isAdmin() || route.params['userId'] === JSON.parse(<string>localStorage.getItem('user')).id) {
    return true;
  }
  window.alert('No tienes permisos para acceder a esta página');
  router.navigate(['all-properties']);
  return false;
};
