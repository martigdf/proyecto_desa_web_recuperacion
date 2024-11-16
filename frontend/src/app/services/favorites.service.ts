import { Injectable } from '@angular/core';
import { Property } from '../interfaces/property';
import { AuthService } from './auth.service';
import { BackendApiService } from './backend-api.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoriteList: Property[] = [];

  constructor(
    private authService: AuthService,
    private backendApi: BackendApiService) {
  }

  // obtiene los favoritos del usuario desde el backend
  async getFavoriteList(): Promise<void> {
    const userId = this.authService.getUserId();
    this.favoriteList = await this.backendApi.get<Property[]>(`${userId}/favorites`);
  }

  // añade un favorito
  async addFavorite(propertyId: number): Promise<Property> {
    const userId = this.authService.getUserId();
    const body = JSON.stringify({ userId, propertyId });
    return this.backendApi.post<Property>(`${userId}/favorites/`, body);
  }

  // elimina un favorito
  async removeFavorite(favoriteId: number): Promise<void> {
    const userId = this.authService.getUserId();
    await this.backendApi.delete<void>(`${userId}/favorites/${favoriteId}`);
  }

  // añade o remueve una propiedad de la lista de favoritos del usuario
  async addOrRemoveFavorite(property: Property) {
    const existingFavorite = this.favoriteList.findIndex(fav => fav.id === property.id);

    if (existingFavorite === -1) {
      // Añade si no está en favoritos
      await this.addFavorite(property.id);
      this.favoriteList.push(property);
      console.log("Favorito agregado");
    } else {
      // Elimina si ya está en favoritos
      const favoriteId = this.favoriteList[existingFavorite].id;
      await this.removeFavorite(favoriteId);
      this.favoriteList.splice(existingFavorite, 1);
      console.log("Favorito eliminado");
    }
  }

  // si una propiedad está en favoritos
  isFavorite(propertyId: number): boolean {
    return this.favoriteList.some(fav => fav.id === propertyId);
  }
}
