import { Injectable, inject, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  private _authService = inject(AuthService);
  private router = inject(Router);

  private getQueryParam(param: string): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  }

  getEmail() {
    return this.getQueryParam('email');
  }

  getFirstName() {
    return this.getQueryParam('given_name');
  }

  getLastName() {
    return this.getQueryParam('family_name');
  }

  login() {
    window.location.href = 'https://192.168.1.9/backend/auth/login/google';
  }

  async handleAuthCallback() {
    const token = this.getQueryParam('token');
    const email = this.getQueryParam('email');

    if (token) {
      // Guarda el token y los datos del usuario en el almacenamiento local
      localStorage.setItem('token', token);

      if (email) {
        const user = await this.loginWithGoogle(email);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      }

      if (this._authService.isAdmin()) {
        location.href = '/admin-panel';
      } else {
        location.href = '/all-properties';
      }
    }
  }

  private async loginWithGoogle(email: string): Promise<any> {
    const response = await fetch(
      'https://192.168.1.9/backend/auth/login/google/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }

    return response.json();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    location.href = '/home';
  }
}
