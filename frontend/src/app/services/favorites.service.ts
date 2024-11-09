import { Injectable } from '@angular/core';
import { Property } from '../interfaces/property';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  //  almacena las listas de favoritos por el id del usuario
  private favoriteLists: { [user_id: number]: Property[] } = {};

  constructor(private authService: AuthService) {
    this.loadFavoritesFromStorage(); 
  }

  private loadFavoritesFromStorage() {
    const data = localStorage.getItem('favoriteLists');
    if (data) {
      this.favoriteLists = JSON.parse(data);
    }
  }

  private saveFavoritesToStorage() {
    localStorage.setItem('favoriteLists', JSON.stringify(this.favoriteLists));
  }

  // lista de favoritos del usuario
  getFavoriteList(): Property[] {
    const userId = this.authService.getUserId();
    return this.favoriteLists[userId] || (this.favoriteLists[userId] = []);
  }

  // añade o remueve una propiedad de la lista de favoritos del usuario
  addOrRemoveFavorite(property: Property) {
    const userId = this.authService.getUserId();
    this.favoriteLists[userId] = this.favoriteLists[userId] || [];

    const userFavorites = this.favoriteLists[userId];
    const existingFavorite = userFavorites.findIndex
    ((fav) => fav.id === property.id);

    existingFavorite === -1 ? userFavorites.push(property) : 
    userFavorites.splice(existingFavorite, 1);

    this.saveFavoritesToStorage();
  }

  // si una propiedad está en favoritos
  isFavorite(propertyId: number): boolean {
    const userFavorites = this.favoriteLists[this.authService.getUserId()] || [];
    return userFavorites.some(fav => fav.id === propertyId);
  }
}
