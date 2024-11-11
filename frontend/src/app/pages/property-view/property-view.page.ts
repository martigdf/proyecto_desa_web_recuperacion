import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonModal,
} from '@ionic/angular/standalone';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../interfaces/property';
import { addIcons } from 'ionicons';
import {
  bedOutline,
  resizeOutline,
  star,
  starOutline,
  waterOutline,
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { FavoritesService } from '../../services/favorites.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-property-view',
  standalone: true,
  imports: [
    IonIcon,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    LayoutComponent,
  ],
  templateUrl: './property-view.page.html',
  styleUrl: './property-view.page.css',
})
export class PropertyViewPage implements OnInit {
  private router: Router = inject(Router);
  private propertyService = inject(PropertyService);
  private authService = inject(AuthService);
  private favoritesService = inject(FavoritesService);
  private alertService = inject(AlertService);
  id = input<string>();
  property: Property | undefined;
  

  constructor() {
    addIcons({ bedOutline, waterOutline, resizeOutline, starOutline, star });
  }

  ngOnInit() {
    const propertyId = this.id();
    if (propertyId) {
      const selectedProperty = this.propertyService.getPropertyById(
        parseInt(propertyId)
      );
      if (selectedProperty) {
        this.property = selectedProperty();
      }
    }
  }

  toggleFavorite() {
    if (this.authService.isValidUser() && this.property) {
      this.favoritesService.addOrRemoveFavorite(this.property);
    } else {
      this.alertService.showError(
        'No puedes añadir a favoritos. Debe iniciar sesión'
      );
    }
  }

  isFavorite(): boolean {
    if (!this.property) {
      return false;
    }
    return this.favoritesService.isFavorite(this.property.id);
  }

  goToAllProperties() {
    this.router.navigate(['/all-properties']);
  }
}
