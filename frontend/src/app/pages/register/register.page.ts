import { Component, inject, OnInit} from '@angular/core';
import { FormControl, FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf, JsonPipe, NgFor} from '@angular/common';
import { RegisterService } from '../../services/register.service';
import {FormGroup, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { RegisterValidationsDirective } from '../../directives/register-validations.directive';
import { NgClass } from '@angular/common';
import { AuthGoogleService } from '../../services/auth-google.service';
import { IonicModule } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, 
    FormsModule, 
    ReactiveFormsModule,
    NgIf,
    NgFor,
    NgClass],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css'
})
export class RegisterPage implements OnInit {
  private RegisterService: RegisterService = inject(RegisterService);
  private router = inject(Router);
  private googleAuthService = inject(AuthGoogleService);
  private alertService = inject(AlertService);
  validateRegister: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializa el FormGroup con FormBuilder
    this.validateRegister = this.fb.group({
      name: new FormControl('', [RegisterValidationsDirective.validateName]),
      lastname: new FormControl('', [RegisterValidationsDirective.validateLastname]),
      email: new FormControl('', [RegisterValidationsDirective.validateEmail]),
      password: new FormControl('', [RegisterValidationsDirective.validatePassword]),
      confirmPassword: new FormControl('', [RegisterValidationsDirective.validateRepeatPassword]),
    });
  }
  ngOnInit(): void {
    this.validateRegister.patchValue({
      email: this.googleAuthService.getEmail(),
      name: this.googleAuthService.getFirstName() || '',  // Asigna un valor vacío si no existe
      lastname: this.googleAuthService.getLastName() || ''
    });
  }

  async onSubmitRegister() {
    if (this.validateRegister.valid) {
      const { name, lastname, email, password } = this.validateRegister.value;
      await this.RegisterService.register(name, lastname, email, password);
      this.alertService.showSuccess('Registrado exitosamente');
      console.log('Registro exitoso');
      await this.router.navigate(['/login']);
    } else {
      this.alertService.showError('Debe completar todos los campos');
      console.log('Formulario inválido');
    }
  }

  onCancel() {
    this.router.navigate(['/home']);
  }

  getPasswordErrors(): string[] {
    const control = this.validateRegister.get('password');
    if (control && control.errors) {
      return Object.keys(control.errors).map(key => control.errors![key]);
    } else {
      return [];
    }
  }
}
