import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { Property } from '../../interfaces/property';
import { NgFor } from '@angular/common';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';

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
  ],
  templateUrl: './all-properties.page.html',
  styleUrl: './all-properties.page.css',
})
export class AllPropertiesPage {
  constructor() {}

  private router: Router = inject(Router);

  properties: Property[] = [
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
      price: 250000,
      location: 'Tepoztlán',
      area: 150,
      number_of_rooms: 4,
      number_of_bathrooms: 2,
      contact_details: 'contacto3@example.com',
      img_url: 'https://cdn.create.vista.com/api/media/small/664926284/stock-photo-modern-brick-house-large-windows-green-lawn-cottage-town' // Imagen de stock
    }
  ];

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }
  goToCompare() {
    this.router.navigate(['/property-compare']);
  }
}
