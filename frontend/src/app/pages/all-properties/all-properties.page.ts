import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { Property } from '../../interfaces/property';
import { NgFor, NgIf } from '@angular/common';
import {
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { FiltersComponent } from '../../components/filters/filters.component';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-all-properties',
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    LayoutComponent,
    PropertyCardComponent,
    NgFor,
    FiltersComponent,
  ],
  templateUrl: './all-properties.page.html',
  styleUrl: './all-properties.page.css',
})
export class AllPropertiesPage {
  constructor() {
  }

  private propertyService = inject(PropertyService);

  private router: Router = inject(Router);

  allProperties = this.propertyService.getProperties();

  // Lista filtrada de propiedades
  properties: Property[] = [...this.allProperties()];

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }

  aplicarFiltros(filtros: any): void {
    // no tiene filtros aplicados, restaura todas las propiedades
    if (!filtros || Object.keys(filtros).every((key) => !filtros[key])) {
      this.properties = [...this.allProperties()];
      return;
    }

    const maxPriceLimit =
      filtros.maxPrice === 10000
        ? Math.max(...this.allProperties().map((p) => p.price))
        : filtros.maxPrice;
    this.properties = this.allProperties().filter((property) => {
      console.log('Valor del filtro de habitaciones:', filtros.habitaciones);
      console.log(
        'Número de habitaciones de la propiedad:',
        property.number_of_rooms
      );
      const cumplePrecio =
        (filtros.minPrice == null || property.price >= filtros.minPrice) &&
        (filtros.maxPrice == null || property.price <= maxPriceLimit);

      // Filtro de Habitaciones
      const cumpleHabitaciones =
        !filtros.habitaciones ||
        (filtros.habitaciones === '5+' && property.number_of_rooms >= 5) ||
        (filtros.habitaciones !== '5+' &&
          property.number_of_rooms === +filtros.habitaciones);

      // Filtro de Departamento
      const cumpleDepartamento =
        !filtros.departamento || property.location === filtros.departamento;
      /*
      // Filtro de Barrio
      const cumpleBarrio = 
      !filtros.barrio || 
      (property.barrio && property.barrio.toLowerCase().includes(filtros.barrio.toLowerCase()));
*/
      // incluye la propiedad si cumple con todas las condiciones de filtro
      return (
        cumplePrecio &&
        cumpleHabitaciones &&
        cumpleDepartamento /*&& cumpleBarrio*/
      );
    });
  }
}
