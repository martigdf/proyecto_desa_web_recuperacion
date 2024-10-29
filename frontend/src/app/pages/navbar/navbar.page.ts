import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthGoogleService } from '../../services/auth-google.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.page.html',
  styleUrl: './navbar.page.css'
})
export class NavbarPage {
  constructor(private authService: AuthService) {}

  private _googleAuthService = inject(AuthGoogleService);

  logout() {
    this._googleAuthService.logout();
    this.authService.logout();
  }


}
