import { computed, inject, Injectable, signal } from '@angular/core';
import { Property } from '../interfaces/property';
import { CompareItem } from '../interfaces/compare-item';
import {BackendApiService} from './backend-api.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private compareList = signal<CompareItem[]>([]);
  private backendApiService = inject(BackendApiService);

  constructor() {
  }
  private properties = signal<Property[]>([]);

  // Hace una llamada a la API para obtener las propiedades
  async fetchProperties() {
    console.log('Fetching properties');
    const properties = await this.backendApiService.get<Property[]>('properties');
    this.properties.set(properties);
    console.log('Properties fetched:', properties);
    console.log('Properties signal:', this.properties());
  }

  get getAllProperties() {
    // Devolvemos un array con las propiedades
    return computed(() => this.properties());
  }

  getProperties = computed(() => this.properties);

  getPropertyById(id: number) {
    return computed(() =>
      this.properties().find((property) => property.id === id)
    );
  }

  getCompareList = computed(() => this.compareList);

  addToCompare(property: Property) {
    const maxCompareLimit = 4; // Establece el límite de propiedades en la lista de comparación
    this.compareList.update((compareList) => {
      // Si ya hay 4 propiedades en la lista, no agrega más
      if (compareList.length >= maxCompareLimit) {
        return compareList;
      }

      // Verifica si la propiedad ya está en la lista
      const existingProperty = compareList.find(
        (prop) => prop.property.id === property.id
      );

      // Si no está en la lista, agregarla
      if (!existingProperty) {
        return [...compareList, { property }];
      } else {
        return compareList; // Si ya está en la lista, no hacer nada
      }
    });
  }

  removeFromCompare(propertyId: number){
    this.compareList.update(compareList => compareList.filter(prop => prop.property.id!== propertyId));
  }

  removeProperty(propertyId: number) {
    this.properties.update((properties) =>
      properties.filter((property) => property.id !== propertyId)
    );
  }
}
