import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthGoogleService } from '../../services/auth-google.service';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  chevronDownOutline,
  logOutOutline,
  homeOutline,
  closeOutline,
  starOutline,
  star,
  menuOutline,
} from 'ionicons/icons';
import { IonIcon } from '@ionic/angular/standalone';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IonIcon, CommonModule],
  templateUrl: './navbar.page.html',
  styleUrl: './navbar.page.css',
})
export class NavbarPage implements OnInit {
  isMobileMenuOpen = false;
  isDropdownOpen: boolean = false;
  isCompareDropdownOpen: boolean = false;
  currentRoute: string = '';
  isAdmin: boolean = false;
  isValidUser: boolean = false;
  isHomeRoute: boolean = false;
  private propertyService = inject(PropertyService);
  private _googleAuthService = inject(AuthGoogleService);

  compareCount = this.propertyService.getCompareList();

  constructor(private authService: AuthService, private router: Router) {
    addIcons({
      chevronDownOutline,
      logOutOutline,
      homeOutline,
      closeOutline,
      starOutline,
      star,
      menuOutline
    });
  }

  ngOnInit(): void {
    this.initializeRoute();
    this.checkUserStatus();
    this.subscribeToRouterEvents();
    this.updateHomeRouteStatus();
  }

  private initializeRoute(): void {
    this.currentRoute = this.router.url;
    console.log('Ruta inicial:', this.currentRoute);
  }

  private checkUserStatus(): void {
    this.isAdmin = this.authService.isAdmin();
    console.log('Es admin:', this.isAdmin);

    this.isValidUser = this.authService.isValidUser();
    console.log('Usuario válido:', this.isValidUser);
  }

  private subscribeToRouterEvents(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        console.log('Ruta actualizada:', this.currentRoute);
      }
    });
  }

  private updateHomeRouteStatus(): void {
    this.isHomeRoute = this.currentRoute === '/home';
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.isCompareDropdownOpen = false;
  }

  toggleCompareDropdown(): void {
    this.isCompareDropdownOpen = !this.isCompareDropdownOpen;
    this.isDropdownOpen = false;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  goToCompare(): void {
    this.router.navigate(['/property-compare']);
  }

  removeFromCompare(propertyId: number): void {
    this.propertyService.removeFromCompare(propertyId);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isMobileMenuOpen = false;
    this.isDropdownOpen = false;
    this.isCompareDropdownOpen = false;
  }

  isActive(routes: string[]): boolean {
    const filteredRoutes = routes.filter(
      (route) => route !== this.currentRoute
    );
    const isMatch = filteredRoutes.some((route) => this.currentRoute === route);
    console.log(
      'Verificando rutas:',
      filteredRoutes,
      'Ruta actual:',
      this.currentRoute,
      'Coincide:',
      isMatch
    );
    return isMatch;
  }

  logout(): void {
    this._googleAuthService.logout();
    this.authService.logout();
  }

  get showAdminPanel(): boolean {
    return ['/admin-panel/users', '/all-properties'].includes(
      this.currentRoute
    );
  }

  get showAdminPanelLink(): boolean {
    return this.currentRoute !== '/admin-panel' && this.isAdmin;
  }

  get showHomeLink(): boolean {
    return this.currentRoute !== '/home';
  }

  get routeIsNotLoginOrRegister(): boolean {
    return !['/login', '/register'].includes(this.currentRoute);
  }

  get user() {
    return this.authService.getUser();
  }
}
