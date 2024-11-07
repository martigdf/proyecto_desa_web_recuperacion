import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { Property } from '../../interfaces/property';
import { NgFor } from '@angular/common';
import { IonGrid, IonRow, IonCol, IonContent } from '@ionic/angular/standalone';
import { FiltersComponent } from '../../components/filters/filters.component';

@Component({
  selector: 'app-all-properties',
  standalone: true,
  imports: [IonContent, 
    IonCol,
    IonRow,
    IonGrid,
    LayoutComponent,
    PropertyCardComponent,
    NgFor,
    FiltersComponent
  ],
  templateUrl: './all-properties.page.html',
  styleUrl: './all-properties.page.css',
})
export class AllPropertiesPage {
  constructor() {}

  private router: Router = inject(Router);

  allProperties: Property[] = [
    {
      id: 1,
      title: 'Casa en la playa',
      description: 'Una hermosa casa frente al mar con acceso privado a la playa.',
      price: 300000,
      location: 'Playa del Carmen',
      area: 200,
      number_of_rooms: 3,
      number_of_bathrooms: 2,
      contact_details: 'contacto1@example.com',
      img_url: 'https://st.depositphotos.com/1005891/4951/i/450/depositphotos_49516857-stock-photo-beach-house-with-bridge-in.jpg' // Imagen de stock
    },
    {
      id: 2,
      title: 'Apartamento en el centro',
      description: 'Moderno apartamento en el corazón de la ciudad.',
      price: 150000,
      location: 'Ciudad de México',
      area: 80,
      number_of_rooms: 2,
      number_of_bathrooms: 1,
      contact_details: 'contacto2@example.com',
      img_url: 'https://st5.depositphotos.com/81210664/66974/i/450/depositphotos_669741344-stock-photo-living-room-interior-projector-displayed.jpg' // Imagen de stock
    },
    {
      id: 3,
      title: 'Casa de campo',
      description: 'Acogedora casa de campo rodeada de naturaleza y tranquilidad.',
      price: 900,
      location: 'Tepoztlán',
      area: 150,
      number_of_rooms: 4,
      number_of_bathrooms: 2,
      contact_details: 'contacto3@example.com',
      img_url: 'https://cdn.create.vista.com/api/media/small/664926284/stock-photo-modern-brick-house-large-windows-green-lawn-cottage-town' // Imagen de stock
    },
    {
      id: 4,
      title: 'Casa supermoderna',
      description: 'Acogedora casa de campo rodeada de naturaleza y tranquilidad.',
      price: 1000,
      location: 'Montevideo',
      area: 150,
      number_of_rooms: 7,
      number_of_bathrooms: 2,
      contact_details: 'contacto3@example.com',
      img_url: 'https://th.bing.com/th/id/R.0225ac52205a32cc2d0c6772f08da20e?rik=%2f4KiACKj4A0d1g&pid=ImgRaw&r=0' // Imagen de stock
    },
    {
      id: 5,
      title: 'Casa de campo',
      description: 'Acogedora casa de campo rodeada de naturaleza y tranquilidad.',
      price: 7000,
      location: 'Salto',
      area: 150,
      number_of_rooms: 4,
      number_of_bathrooms: 2,
      contact_details: 'contacto3@example.com',
      img_url: 'https://cdn.create.vista.com/api/media/small/664926284/stock-photo-modern-brick-house-large-windows-green-lawn-cottage-town' // Imagen de stock
    }
  ];

  // Lista filtrada de propiedades
  properties: Property[] = [...this.allProperties];

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }
  goToCompare() {
    this.router.navigate(['/property-compare']);
  }

  aplicarFiltros(filtros: any): void {
    // no tiene filtros aplicados, restaura todas las propiedades
    if (!filtros || Object.keys(filtros).every(key => !filtros[key])) {
      this.properties = [...this.allProperties];
      return;
    }
  
    const maxPriceLimit = filtros.maxPrice === 10000 ? Math.max(...this.allProperties.map(p => p.price)) : filtros.maxPrice;
    this.properties = this.allProperties.filter(property => {

      console.log('Valor del filtro de habitaciones:', filtros.habitaciones);
      console.log('Número de habitaciones de la propiedad:', property.number_of_rooms);
      const cumplePrecio = 
      (filtros.minPrice == null || property.price >= filtros.minPrice) &&
      (filtros.maxPrice == null || property.price <= maxPriceLimit);
  
      // Filtro de Habitaciones
      const cumpleHabitaciones = 
      !filtros.habitaciones || 
      (filtros.habitaciones === '5+' && property.number_of_rooms >= 5) ||
      (filtros.habitaciones !== '5+' && property.number_of_rooms === +filtros.habitaciones);
      
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
      return cumplePrecio && cumpleHabitaciones && cumpleDepartamento /*&& cumpleBarrio*/;
    });
  }
}