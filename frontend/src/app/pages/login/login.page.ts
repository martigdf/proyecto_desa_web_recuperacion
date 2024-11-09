import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonItem, IonLabel, IonCheckbox, IonButton, IonContent } from "@ionic/angular/standalone";
import { AuthGoogleService } from '../../services/auth-google.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonContent, IonButton, IonCheckbox, IonLabel, IonItem, IonCardContent, IonCardTitle, IonCard, IonCardHeader, FormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage implements OnInit{
  email: string = '';
  password: string = '';
  private authService: AuthService = inject(AuthService);
  private googleAuthService = inject(AuthGoogleService);
  private router = inject(Router);
  private alertService = inject(AlertService);

  async onSubmitLogin() {
    console.log('email:', this.email);
    console.log('password', this.password);
    try{
      await this.authService.login(this.email, this.password);
      console.log('login success');
      // Redirect to home
      console.log(this.authService.isAdmin())
      if (this.authService.isAdmin()){
        await this.router.navigate(['/admin-panel']);
      } else {
        await this.router.navigate(['/all-properties']);
      }
    } catch (error) {
      this.alertService.showError('Error al iniciar sesión. Email o contraseña incorrectos.');
    }
  }

  async ngOnInit(): Promise<void> {
    await this.googleAuthService.handleAuthCallback();
  }

  signInWithGoogle() {
    this.googleAuthService.login();
  }
}
