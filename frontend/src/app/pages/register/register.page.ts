import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf, JsonPipe } from '@angular/common';
import { RegisterService } from '../../services/register.service';
import {FormGroup, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { RegisterValidationsDirective } from '../../directives/register-validations.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    NgIf,
    NgClass,
    JsonPipe,
    RegisterValidationsDirective],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css'
})
export class RegisterPage {


  private RegisterService: RegisterService = inject(RegisterService);
  private router = inject(Router);
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

  async onSubmitRegister() {
    if (this.validateRegister.valid) {
      const { name, lastname, email, password } = this.validateRegister.value;
      await this.RegisterService.register(name, lastname, email, password);
      console.log('Registro exitoso');
      await this.router.navigate(['/all-properties']);
    } else {
      console.log('Formulario inválido');
    }
  }

  onCancel() {
    this.router.navigate(['/home']);
  }
}
