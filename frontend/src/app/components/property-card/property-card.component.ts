import { Component, inject, Input, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { Property } from '../../interfaces/property';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [IonIcon, IonCardContent, IonCardTitle, IonCardHeader, IonCard],
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent {
  @Input() property!: Property;
  private router = inject(Router);
  private propertyService = inject(PropertyService);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private favoritesService = inject(FavoritesService);
  constructor() {}


  addToCompareList(property: Property) {
    this.propertyService.addToCompare(property);
  }

  isHome(): boolean {
    return this.propertyService.isPropertyInCompareList(this.property.id)
  }

  toggleFavorite() {
    if (this.authService.isValidUser()) {
      this.favoritesService.addOrRemoveFavorite(this.property);
    } else {
      this.alertService.showError('Para añadir a favoritos primero debes iniciar sesión');
    }
  }

  isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.property.id);
  }

  goToTask() {
    this.router.navigate([`/property-view/${this.property.id}`]);
  }
}
