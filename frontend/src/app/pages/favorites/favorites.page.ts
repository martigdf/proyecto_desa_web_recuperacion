import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from "../../layout/layout.component";
import { PropertyCardComponent } from "../../components/property-card/property-card.component";
import { NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [LayoutComponent, PropertyCardComponent, NgFor, NgIf, IonicModule],
  templateUrl: './favorites.page.html',
  styleUrl: './favorites.page.css'
})
export class FavoritesPage {

  private router: Router = inject(Router);
  private favoritesService = inject(FavoritesService);

  // lista de favoritos
  favoriteList = this.favoritesService.getFavoriteList();

  goToAllProperties() {
    this.router.navigate(['/all-properties']);
  }
}
