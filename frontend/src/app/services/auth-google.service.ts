import { Injectable, inject, signal } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { googleAuthConfig } from './auth-google-config';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  private oAuthService = inject(OAuthService);
  private _authService = inject(AuthService);
  private router = inject(Router);
  email = signal<string>('');

  get Email() {
    return this.email();
  }

  constructor() {
    this.initConfiguration();
  }

  async googleLogin(email: string): Promise<void> {
    try {
      const response = await fetch(
        'http://localhost/backend/auth/login/google',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.status === 404) {
        throw new Error('User not found');
      }
      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error en la respuesta:', errorText);
        throw new Error(`Error en el login: ${errorText}`);
      }

      const data = await response.json();

      // Guardar token y setearlo en el local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Error en googleLogin:', error);
      throw error;
    }
  }

  initConfiguration() {
    this.oAuthService.configure(googleAuthConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidIdToken()) {
        const claims = this.oAuthService.getIdentityClaims();
        this.email.set(claims['email']);
        if (!this._authService.isValidUser()) {
          this.postLogin(); // Solo se llama aquí si el usuario no había iniciado sesión antes
        }
      }
    });
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  async postLogin() {
    try {
      console.log(this.email());
      await this.googleLogin(this.Email);

      if (this._authService.isAdmin()) {
        this.router.navigate(['admin-panel']);
      } else {
        this.router.navigate(['all-properties']);
      }
    } catch (error: any) {
      if (error.message === 'User not found') {
        this.router.navigate(['/register'], {
          queryParams: { email: this.Email },
        });
        console.error('Error durante el inicio de sesión:', error);
      }
    }
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
  }

}
