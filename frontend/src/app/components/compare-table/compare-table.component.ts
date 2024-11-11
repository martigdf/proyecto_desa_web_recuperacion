import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { CompareItem } from '../../interfaces/compare-item';
import { NgFor } from '@angular/common';
import { PropertyService } from '../../services/property.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { eye, star, starOutline, trash } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { FavoritesService } from '../../services/favorites.service';
import { Property } from '../../interfaces/property';

@Component({
  selector: 'app-compare-table',
  standalone: true,
  imports: [
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonIcon,
    IonButton,
    IonImg,
    IonCol,
    IonRow,
    IonGrid,
    NgFor,
  ],
  templateUrl: './compare-table.component.html',
  styleUrls: ['./compare-table.component.scss'],
})
export class CompareTableComponent {
  @Input() itemList!: CompareItem[];
  private propertyService = inject(PropertyService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private favoritesService = inject(FavoritesService);

  constructor() {
    addIcons({ trash, eye, starOutline, star });
  }

  removeProperty(item: CompareItem) {
    this.propertyService.removeFromCompare(item.property.id);
  }

  viewDetails(item: CompareItem) {
    this.router.navigate([`/property-view/${item.property.id}`]);
  }

  toggleFavorite(property: Property) {
    if (this.authService.isValidUser()) {
      this.favoritesService.addOrRemoveFavorite(property);
    } else {
      this.alertService.showError(
        'Para añadir a favoritos primero debes iniciar sesión'
      );
    }
  }

  isFavorite(property: Property): boolean {
    return this.favoritesService.isFavorite(property.id);
  }
}
