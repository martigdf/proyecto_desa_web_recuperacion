import { Injectable, inject, signal } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { googleAuthConfig } from './auth-google-config';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  private oAuthService = inject(OAuthService);
  email = signal<string>('');
  private userLoggedIn = this.loadUserLoggedInState();

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
        if (!this.userLoggedIn) {
          this.userLoggedIn = true;
          this.saveUserLoggedInState(this.userLoggedIn); 
          this.postLogin(); // Solo se llama aquí si el usuario no había iniciado sesión antes
        }
      }
    });
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  async postLogin() {
    console.log(this.email());
    await this.googleLogin(this.Email);
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
  }

  private saveUserLoggedInState(state: boolean) {
    localStorage.setItem('userLoggedIn', JSON.stringify(state));
  }

  private loadUserLoggedInState(): boolean {
    const storedState = localStorage.getItem('userLoggedIn');
    return storedState ? JSON.parse(storedState) : false;
  }
}
