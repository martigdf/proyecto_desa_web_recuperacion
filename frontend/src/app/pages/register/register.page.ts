import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  private authService: AuthService = inject(AuthService);
  private router = inject(Router);

  async onSubmitRegister() {
    console.log('Register');
    console.log('name', this.name);
    console.log('lastname', this.lastname);
    console.log('email:', this.email);
    console.log('password', this.password);
    console.log('confirmpassword', this.confirmPassword);
    /*
    try {
      const result = await this.authService.register({
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      });

      if (result.success) {
        this.router.navigate(['/all-properties']);
      } else {
        console.error('Registration failed', result.message);
      }
    } catch (error) {
      console.error('Error during registration', error);
    }
    */
  }
}
