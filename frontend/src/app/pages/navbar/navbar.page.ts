import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.page.html',
  styleUrl: './navbar.page.css'
})
export class NavbarPage {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }


}
