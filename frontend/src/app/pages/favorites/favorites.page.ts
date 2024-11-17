import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyCardComponent } from "../../components/property-card/property-card.component";
import { NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FavoritesService } from '../../services/favorites.service';
import { Property } from '../../interfaces/property';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ PropertyCardComponent, NgFor, NgIf, IonicModule],
  templateUrl: './favorites.page.html',
  styleUrl: './favorites.page.css'
})
export class FavoritesPage implements OnInit{
  favoriteList: Property[] = [];

  private router: Router = inject(Router);
  private favoritesService = inject(FavoritesService);

  ngOnInit() {
    this.loadFavorites();
  }

  private async loadFavorites(): Promise<void> {
    await this.favoritesService.getFavoriteList(); 
    this.favoriteList = this.favoritesService['favoriteList'];
  }

  goToAllProperties() {
    this.router.navigate(['/all-properties']);
  }
}
