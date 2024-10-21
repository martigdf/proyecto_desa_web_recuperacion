import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css'
})
export class LoginPage {
  email: string = '';
  password: string = '';
  private authService : AuthService = inject(AuthService);
  private router = inject(Router);

  async onSubmitLogin() {
    console.log("email:", this.email);
    console.log("password", this.password);
    await this.authService.login(this.email, this.password);
    console.log("login success");
    // Redirect to home
    await this.router.navigate(['/']);
  }
}
