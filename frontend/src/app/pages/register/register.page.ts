import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css'
})
export class RegisterPage {
  name: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  private RegisterService: RegisterService = inject(RegisterService);
  private router = inject(Router);
  
  async onSubmitRegister() {
    this.errorMessage = '';
    console.log('Register');
    console.log('name', this.name);
    console.log('lastname', this.lastname);
    console.log('email:', this.email);
    
    if (this.password !== this.confirmPassword) {
      console.error('Contraseñas no coinciden');
      return;
    }
    try {
      await this.RegisterService.register(this.name, this.lastname, this.email, this.password);
      console.log('Registro exitoso');
      await this.router.navigate(['/all-properties']);
    } catch (error) {
      this.errorMessage = 'Error en el registro. Intente nuevamente.';
      console.error('Error en el registro:', error);
    }
  }
}
