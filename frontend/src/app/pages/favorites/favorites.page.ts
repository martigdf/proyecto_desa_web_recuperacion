import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from "../../layout/layout.component";
import { PropertyService } from '../../services/property.service';
import { PropertyCardComponent } from "../../components/property-card/property-card.component";
import { NgFor, NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import { starOutline } from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [LayoutComponent, PropertyCardComponent, NgFor, NgIf, IonicModule],
  templateUrl: './favorites.page.html',
  styleUrl: './favorites.page.css'
})
export class FavoritesPage {

  private router: Router = inject(Router);
  private propertyService = inject(PropertyService);

  constructor() {
    addIcons({
      'star-Outline': starOutline
    });
  }

  // lista de favoritos
  favoriteList = this.propertyService.getFavoriteList();

  goToAllProperties() {
    this.router.navigate(['/all-properties']);
  }
}
