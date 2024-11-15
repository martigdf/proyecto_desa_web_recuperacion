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
  home,
  personCircleOutline,
  logInOutline,
  personAddOutline,
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
  userInitials!: string;
  private propertyService = inject(PropertyService);
  private _googleAuthService = inject(AuthGoogleService);

  compareCount = this.propertyService.getCompareList();

  constructor(private authService: AuthService, private router: Router) {
    addIcons({
      chevronDownOutline,
      logOutOutline,
      homeOutline,
      home,
      closeOutline,
      starOutline,
      star,
      menuOutline,
      personCircleOutline,
      logInOutline,
      personAddOutline
    });
  }

  ngOnInit(): void {
    this.initializeRoute();
    this.checkUserStatus();
    this.subscribeToRouterEvents();
    this.updateHomeRouteStatus();
    this.setUserInitials();
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

  toggleMenu(menuType: 'dropdown' | 'compareDropdown' | 'mobileMenu'): void {
    this.isDropdownOpen = menuType === 'dropdown' ? !this.isDropdownOpen : false;
    this.isCompareDropdownOpen = menuType === 'compareDropdown' ? !this.isCompareDropdownOpen : false;
    this.isMobileMenuOpen = menuType === 'mobileMenu' ? !this.isMobileMenuOpen : false;
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
    return routes.includes(this.currentRoute);
  }

  logout(): void {
    this._googleAuthService.logout();
    this.authService.logout();
  }

  get showAdminPanelLink(): boolean {
    return this.currentRoute !== '/admin-panel' && this.isAdmin;
  }

  get routeIsNotLoginOrRegister(): boolean {
    return !['/login', '/register'].includes(this.currentRoute);
  }

  get user() {
    return this.authService.getUser();
  }

  setUserInitials(): void {
    const user = this.user;
    if (user && user.name && user.lastname) {
      const username = `${user.name} ${user.lastname}`;
      this.userInitials = username.split(' ').map(n => n[0]).join('').toUpperCase();
    } else {
      this.userInitials = '';
    }
  }
}
