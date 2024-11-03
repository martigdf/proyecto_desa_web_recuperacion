import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthGoogleService } from '../../services/auth-google.service';
import { NavigationEnd, Router } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.page.html',
  styleUrl: './navbar.page.css'
})
export class NavbarPage implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  currentRoute: string = '';
  isAdmin: boolean = false;
  isValidUser: boolean = false;
  isHomeRoute: boolean = false;

  ngOnInit(): void {
    // Asigna la ruta actual al cargar el componente
    this.currentRoute = this.router.url;
    console.log('Ruta inicial:', this.currentRoute);

    // Verifica si el usuario es admin
    this.isAdmin = this.authService.isAdmin();
    console.log('Es admin:', this.isAdmin);

    // Verifica si el usuario está logueado
    this.isValidUser = this.authService.isValidUser();
    console.log('Usuario válido:', this.isValidUser);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Actualiza la ruta en cada cambio de navegación
        this.currentRoute = event.url;
        console.log('Ruta actualizada:', this.currentRoute);
      }
    });

    // Actualiza isHomeRoute
    this.isHomeRoute = this.currentRoute === '/home';
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  isActive(routes: string[]): boolean {
    const filteredRoutes = routes.filter(route => route !== this.currentRoute);
    const isMatch = filteredRoutes.some(route => this.currentRoute === route);
    console.log('Verificando rutas:', filteredRoutes, 'Ruta actual:', this.currentRoute, 'Coincide:', isMatch);
    return isMatch;
  }

  private _googleAuthService = inject(AuthGoogleService);

  logout() {
    this._googleAuthService.logout();
    this.authService.logout();
  }

  // Si hay un usuario logueado, mostramos su nombre en la barra de navegación
  get user() {
    return this.authService.getUser();
  }
}
