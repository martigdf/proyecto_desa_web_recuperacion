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
      description:
        'Una hermosa casa frente al mar con acceso privado a la playa.',
      price: 300000,
      location: 'Playa del Carmen',
      area: 200,
      number_of_rooms: 3,
      number_of_bathrooms: 2,
      contact_details: 'contacto1@example.com',
    },
    {
      id: 2,
      title: 'Apartamento en el centro',
      description:
        'Moderno apartamento en el corazón de la ciudad, cerca de restaurantes y tiendas.',
      price: 150000,
      location: 'Ciudad de México',
      area: 80,
      number_of_rooms: 2,
      number_of_bathrooms: 1,
      contact_details: 'contacto2@example.com',
    },
    {
      id: 3,
      title: 'Casa de campo',
      description:
        'Acogedora casa de campo rodeada de naturaleza y tranquilidad.',
      price: 250000,
      location: 'Tepoztlán',
      area: 150,
      number_of_rooms: 4,
      number_of_bathrooms: 2,
      contact_details: 'contacto3@example.com',
    },
    {
      id: 4,
      title: 'Penthouse con vista al mar',
      description:
        'Exclusivo penthouse con vista panorámica al mar y piscina privada.',
      price: 600000,
      location: 'Cancún',
      area: 300,
      number_of_rooms: 3,
      number_of_bathrooms: 3,
      contact_details: 'contacto4@example.com',
    },
    {
      id: 5,
      title: 'Estudio en zona universitaria',
      description:
        'Estudio ideal para estudiantes, cerca de universidades y transporte público.',
      price: 80000,
      location: 'Guadalajara',
      area: 40,
      number_of_rooms: 1,
      number_of_bathrooms: 1,
      contact_details: 'contacto5@example.com',
    },
  ];

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }
  goToCompare() {
    this.router.navigate(['/property-compare']);
  }
}
