import { computed, inject, Injectable, signal } from '@angular/core';
import { Property } from '../interfaces/property';
import { CompareItem } from '../interfaces/compare-item';
import {BackendApiService} from './backend-api.service';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private compareList = signal<CompareItem[]>([]);
  private backendApiService = inject(BackendApiService);
  private alertService = inject(AlertService);

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

  async fetchPropertyById(id: number) {
    console.log('Fetching property by id:', id);
    const property = await this.backendApiService.get<Property>(`properties/${id}`);
    console.log('Property fetched:', property);
    return property;
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
      const existingPropertyIndex = compareList.findIndex(
        (prop) => prop.property.id === property.id
      );

      // Si la propiedad ya está en la lista removerla (para usar el boton en la card)
      if (existingPropertyIndex !== -1) {
        this.alertService.showSuccess('Propiedad removida de la lista de comparación');
        return compareList.filter((_, index) => index !== existingPropertyIndex);
      }

      // Si ya hay 4 propiedades en la lista, no agrega más y mostrará un mensaje de error
      if (compareList.length >= maxCompareLimit) {
        console.log('No se pueden comparar más de 4 propiedades');
        this.alertService.showError(
          'No se pueden comparar más de 4 propiedades'
        );
        return compareList;
      }

      // Verifica si la propiedad ya está en la lista
      const existingProperty = compareList.find(
        (prop) => prop.property.id === property.id
      );

      // Si no está en la lista, agregarla
      if (!existingProperty) {
        this.alertService.showSuccess('Propiedad añadida a la lista de comparación');
        return [...compareList, { property }];
      } else {
        return compareList; // Si ya está en la lista, no hacer nada
      }
    });
  }

  removeFromCompare(propertyId: number){
    this.compareList.update(compareList => compareList.filter(prop => prop.property.id!== propertyId));
  }

  async removeProperty(propertyId: number) {
    this.properties.update((properties) =>
      properties.filter((property) => property.id !== propertyId)
    );
    await this.backendApiService.delete<void>(`properties/${propertyId}`);
  }

  isPropertyInCompareList(propertyId: number): boolean {
    return this.compareList().some(prop => prop.property.id === propertyId);
  }
}
